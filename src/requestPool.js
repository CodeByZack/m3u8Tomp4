/**
 * promise并发限制调用
 * @param {object[]} data - 调用的数据列表
 * @param {number} maxLimit - 并发调用限制个数
 * @param {function} iteratee - 处理单个节点的方法
 * @returns {promise}
 */
export function requestPool({
  data = [],
  maxLimit = 3,
  iteratee = () => {},
} = {}) {
  const executing = [];
  const enqueue = (index = 0) => {
    // 边界处理
    if (index === data.length) {
      return Promise.all(executing);
    }
    // 每次调用enqueue, 初始化一个promise
    const item = data[index];

    function itemPromise(index) {
      const promise = new Promise(async (resolve) => {
        // 处理单个节点
        await iteratee({ index, item, data });
        resolve(index);
      }).then(() => {
        // 执行结束，从executing删除自身
        const delIndex = executing.indexOf(promise);
        delIndex > -1 && executing.splice(delIndex, 1);
      });
      return promise;
    }
    // 插入executing数字，表示正在执行的promise
    executing.push(itemPromise(index));

    // 使用Promise.rece，每当executing数组中promise数量低于maxLimit，就实例化新的promise并执行
    let race = Promise.resolve();

    if (executing.length >= maxLimit) {
      race = Promise.race(executing);
    }

    // 递归，直到遍历完
    return race.then(() => enqueue(index + 1));
  };

  return enqueue();
}

// 示例
// promiseLimitPool({
//   data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
//   maxLimit: 2,
//   iteratee: async ({ item }) => {
//     console.log('onClick -> item', item);
//     await Axios({
//       method: 'get',
//       url: `API接口地址`,
//       params: { page: 0, size: 9 },
//     });
//   },
// });

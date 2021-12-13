async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = [];
  let executing = [];
  for (const item of source) {
    console.log("item", item);
    const p = Promise.resolve().then(() => {
      const r = iteratorFn(item, source);
      return r;
    });
    // iteratorFn 返回的promise1，在经过一个解析，放回一个promsie2，再放入一个ret[ promise2 ]
    ret.push(p);
    // 基本都是执行的，暂时注释
    if (maxConcurrency <= source.length) {
      const e = p.then(() => {
        // 这一步是移动的逻辑也是一个异步的
        // console.log("r-index", executing.indexOf(e));
        console.log("executing", executing);
        const r = executing.splice(executing.indexOf(e), 1);
        console.log("减少了一个任务 r----------", r);
        // console.log('此时executing的长度是',executing.length);
      });
      // promsie2 执行后返回一个promsie3，再放入executing [ promsie3 ]
      executing.push(e);
      console.log("executing push 操作");

      // 当executing 大于最大并发时候
      if (executing.length >= maxConcurrency) {
        console.log("开始等待任务完成");
        await Promise.race(executing);
        console.log("任务完成");
      }
    }
  }
  console.log("end ->", ret);
  return Promise.all(ret);
}

// 并发
const maxConcurrency = 5;
const source = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
// const source = ["1", "2", "3", "4",'5',6];
// 异步返回一个primose
function iteratorFn(item, source) {
  return new Promise((resolve, reject) => {
    console.log("iteratorFn item ->", item);
    console.log("iteratorFn source ->", source);
    setTimeout(() => {
      resolve("1111");
    }, 0);
  });
}

runParallel(maxConcurrency, source, iteratorFn).then((re) => {
  console.log("Promise.all 全部执行完毕");
});

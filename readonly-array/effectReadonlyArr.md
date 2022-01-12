### 版本号

3.0.2

### 问题描述

- 有一个 readonly 的数组
- 通过索引读取元素不收集依赖，正确
- 通过 api 读取的元素收集依赖，不正确

### 代码描述

```typescript
describe("reactivity/effect", () => {
  it("should observe basic properties", () => {
    const readonlyState = readonly(["a", "b", "c"]);

    let eff = effect(() => {
      // 不收集deps
      readonlyState[0];
      // readonlyState.includes("a"); //收集deps
    });
    expect(eff.deps.length).toBe(0);
  });
});
```

### 源码 debug 分析

#### 1 readonlyState[0] 流程

1. getter

```typescript
const targetIsArray = isArray(target); // true
if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
  // false 不进语句
  // arrayInstrumentations 数组方法
  // key -> '0'
  return Reflect.get(arrayInstrumentations, key, receiver);
}

const res = Reflect.get(target, key, receiver); // a

if (!isReadonly) {
  // false 不进if语句，所以没有收集依赖 流程是正确的
  track(target, TrackOpTypes.GET, key);
}
return res;
```

#### 2 readonlyState.includes("a") 流程

1. getter

```typescript
const targetIsArray = isArray(target); // true
if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
  // true 进if语句
  // arrayInstrumentations 数组方法
  // key -> 'includes'
  return Reflect.get(arrayInstrumentations, key, receiver);
}

// 数组方法 拦截 同 vue2

(["includes", "indexOf", "lastIndexOf"] as const).forEach((key) => {
  const method = Array.prototype[key] as any;
  // key 是 includes
  arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
    const arr = toRaw(this);
    for (let i = 0, l = this.length; i < l; i++) {
      // 收集数组 到这里流程除了问题
      track(arr, TrackOpTypes.GET, i + "");
    }
    // we run the method using the original args first (which may be reactive)
    const res = method.apply(arr, args);
    if (res === -1 || res === false) {
      // if that didn't work, run it again using raw values.
      return method.apply(arr, args.map(toRaw));
    } else {
      return res;
    }
  };
});
```

### 解决方法

- 加一个 readonly 的判断即可

```typescript
if (!readonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
  // ...
}
```

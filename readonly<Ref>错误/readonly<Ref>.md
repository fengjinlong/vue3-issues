### readonly(Ref)导致的TS错误
版本：3.2.19

地址：[Generating declarations for readonly/shallowReadonly ref causes TS4058 error #4701](https://github.com/vuejs/vue-next/issues/4701)

### 问题复现 

[代码](https://codesandbox.io/s/quiet-https-5g1jj?file=/src/index.js)

```TypeScript
import { ref, readonly } from "vue";

export function useCounter() {
  const count = ref(0);

  function increment() {
    count.value++;
    //6
  }

  return {
    count1: readonly(count),
    increment
  };
}
// 编译器提示的 count1的类型长这样
//count1: {
//  readonly value: number;
//  readonly [RefSymbil]: true;
//}

// count1 怎么还有个 readonly [RefSymbil]: true ？这就是问题
```

### 问题分析

#### 查看readonly 的源码

```TypeScript
// 代码 readonly(count) -> readonly<Ref<number>>


// 1 readonly
export function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>> {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  )
} // 返回类型 DeepReadonly<UnwrapNestedRefs<T>>

// 2 DeepReadonly<UnwrapNestedRefs<Ref<number>>>
export type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRefSimple<T> // 返回 T
// DeepReadonly<T> 也就是 DeepReadonly<Ref<number>>

// 3 DeepReadonly，肯定是找对应的参数
export type DeepReadonly<T> = T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepReadonly<U>>
  : T extends Promise<infer U>
  ? Promise<DeepReadonly<U>>
  : T extends {}
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : Readonly<T>
  
  // 看了这一大段代码，T并没有 相应的 Ref 类型，肯定是不对的。经过分析走的是下面的代码
  DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }
  
  // 继续分析,结合 Ref
  [K in keyof T]: DeepReadonly<T[K]> => {value: number, [RefSymbol]: true}
  
  // 问题复现
  DeepReadonly<T> = {
    readonly value: number;
    readonly [RefSymbol]: true;
  }

```

### 问题解决

```TypeScript
// 添加处理Ref的类型
  // ...
  // : T extends Ref<infer U>
  // ? Ref<DeepReadonly<U>>
  // : T extends {}
  // ...
  
  // 编译器正确的类型判断
  // count1: Ref<number>

```


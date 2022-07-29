const get = createGetter();
const set = createSetter();

function createGetter(shallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    // track 函数是完成依赖收集
    track(target, "get", key);
    if (typeof res === "object") {
      // 值也是对象的话，需要嵌套调用reactive
      // res就是target[key]
      // 浅层代理，不需要嵌套
      return shallow ? res : reactive(res);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    // 在触发 set 的时候进行触发依赖
    trigger(target, "set", key);
    return result;
  };
}

const mutableHandlers = {
  get,
  set,
};

/*
 * 在 track 函数中，我们可以使用一个巨大的 tragetMap 去存储依赖关系。
 * map 的 key 是我们要代理的 target 对象，值还是一个 depsMap，存储这每一个 key 依赖的函数，
 * 每一个 key 都可以依赖多个 effect。
 * 
        targetMap = {
            target： {
                key1: [回调函数1，回调函数2],
                key2: [回调函数3，回调函数4],
                }  ,
                target1： {
                key3: [回调函数5]
            }  
        }
 */

const targetMap = new WeakMap();

let activeEffect;
export function track(target, type, key) {
  // console.log(`触发 track -> target: ${target} type:${type} key:${key}`)

  // 1. 先基于 target 找到对应的 dep
  // 如果是第一次的话，那么就需要初始化
  // {
  //   target1: {//depsmap
  //     key:[effect1,effect2]
  //   }
  // }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 初始化 depsMap 的逻辑
    // depsMap = new Map()
    // targetMap.set(target, depsMap)
    // 上面两行可以简写成下面的
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
  }
  if (!deps.has(activeEffect) && activeEffect) {
    // 防止重复注册
    deps.add(activeEffect);
  }
  depsMap.set(key, deps);
}

// trigger 函数实现的思路就是从 targetMap 中，根据 target 和 key 找到对应的依赖函数集合 deps，然后遍历 deps 执行依赖函数
function trigger(target, type, key) {
  // console.log(`触发 trigger -> target:  type:${type} key:${key}`)
  // 从targetMap中找到触发的函数，执行他
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    // 没找到依赖
    return;
  }
  const deps = depsMap.get(key);
  if (!deps) {
    return;
  }

  deps.forEach((effectFn) => {
    if (effectFn.scheduler) {
      effectFn.scheduler();
    } else {
      effectFn();
    }
  });
}

export function reactive(target) {
  // 为简化，这里我们只处理 js 中对象的代理设置, Vue3中还有别的实现
  if (typeof target !== "object") {
    console.warn(`reactive  ${target} 必须是一个对象`);
    return target;
  }
  return new Proxy(target, mutableHandlers);
}

// 执行 fn() 的时候，就会触发响应式对象的 get 函数(对象访问时触发counter.num1)，get 函数内部就会把 activeEffect 存储到依赖地图中，完成依赖的收集
export function effect(fn, options = {}) {
  // effect嵌套，通过队列管理
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      // fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
      return fn();
    } finally {
      activeEffect = null;
    }
  };

  if (!options.lazy) {
    // 没有配置lazy 直接执行
    effectFn();
  }
  effectFn.scheduler = options.scheduler; // 调度时机 watchEffect 会用到
  return effectFn;
}

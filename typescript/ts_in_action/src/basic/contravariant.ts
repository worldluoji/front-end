/** 
 * 协变保留分配兼容性，逆变则与之相反
 * 协变（covariant）, 该序关系是：子类型≦基类型。即List<DogC>可以分配给List<AnimalC>, 即父类可以兼容子类
 * 逆变（contravariant），如果它逆转了子类型序关系。 List<AnimalC> 可以分配给 List<DogC>，即子类可以兼容父类
 * 双向协变 (Bivariant) List<AnimalC> 与List<DogC>可以相互兼容
 * 不变 (Invariant) List<AnimalC> 和 List<DogC>不存在分配关系，或者说无法兼容
 * 
 * 为了保证类型安全我们应当:
    更多使用readonly保住类型不可变
    更多使用函数属性而不是方法来定义类型
    尝试让类型中的协变或者逆变分开，或者让类型不可变
    尽量避免双向协变

    reference: https://juejin.cn/post/7039315081150087181
 */
 class AnimalC {
  public weight: number = 0;
}

class DogC extends AnimalC {
  constructor() {
    super();
    this.wang();
  }

  public wang() {
      console.log("wang")
  }
}

class CatC extends AnimalC {
  constructor() {
    super();
    this.miao();
  }
  public miao() {
      console.log("miao")
  }
}

interface ComparerC<T> {
  // just method
  compare(a: T, b: T): number;
}

interface ComparerC2<T> {
  // compare attribute is a method
  compare: (a: T, b: T) => number;
}

let catc: CatC = new CatC();

// covariant
const animalc: AnimalC = catc // work

let animalComparer: ComparerC<AnimalC> = {
    compare: (a: AnimalC, b: AnimalC) => {
        return a.weight - b.weight;
    }
};
let dogComparer: ComparerC<DogC> = {
    compare: (a: DogC, b: DogC) => {
        return b.weight - a.weight;
    }
};

// bivariance, ts支持strictFunctionTypes的PR有这么一句话: Methods are excluded specifically to ensure generic classes and interfaces (such as Array<T> ) continue to mostly relate covariantly.

animalComparer = dogComparer;  // Ok because of bivariance
dogComparer = animalComparer;  // Ok


let animalComparer2: ComparerC2<AnimalC> = {
    compare: (a: AnimalC, b: AnimalC) => {
        return a.weight - b.weight;
    }
};
let dogComparer2: ComparerC2<DogC> = {
    compare: (a: DogC, b: DogC) => {
        return b.weight - a.weight;
    }
};

// contravariant
// animalComparer2 = dogComparer2;  // Error
dogComparer2 = animalComparer2;  // Ok

/**
 * 该规则声称开启是一个能享受函数类型检查的不错的实践（需要配合 typescript的strictFunctionTypes模式）
 * 优于写法：
 * interface T3 {
 *   func(arg: number): void;
 *   func(arg: string): void;
 *   func(arg: boolean): void;
 * }

 * 原因
 * A method and a function property of the same type behave differently. 
 * Methods are always bivariant in their argument, while function properties are contravariant in their argument under strictFunctionTypes.
 * 
 * this is equivalent to the overload
 */
interface T3C {
  func: ((arg: number) => void) &
    ((arg: string) => void) &
    ((arg: boolean) => void);
}

let t3c: T3C = {
  func: (arg: any) => {
    if (Number.isInteger(arg)) {
      console.log('this is number');
    } else if (typeof arg === 'string') {
      console.log('this is string');
    } else {
      console.log('this is boolean');
    }
  }
}

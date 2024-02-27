/**
 * 协变保留分配兼容性，逆变则与之相反
 * 协变（covariant）, 该序关系是：子类型≦基类型。即List<DogC>可以分配给List<AnimalC>
 * 逆变（contravariant），如果它逆转了子类型序关系。 List<AnimalC> 可以分配给 List<DogC>
 * 双向协变 (Bivariant) List<AnimalC> 与List<DogC>可以互相分配
 * 不变 (Invariant) List<AnimalC> 和 List<DogC>不存在分配关系，或者说无法互相分配
 */


class AnimalC {
  public weight: number = 0;
}

class DogC extends AnimalC {
  public wang() {
      console.log("wang")
  }
}

class CatC extends AnimalC {
  public miao() {
      console.log("miao")
  }
}

declare const catc: CatC

const animalc: AnimalC = catc // work



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

/*
* 条件类型
*/
// T extends U ? X : Y

type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
type T1 = TypeName<string>
type T2 = TypeName<string[]>

// (A | B) extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y)
type T3 = TypeName<string | string[]>

type Diff<T, U> = T extends U ? never : T
type T4 = Diff<"a" | "b" | "c", "a" | "e">
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e">
// never | "b" | "c"
// "b" | "c"

type NotNull<T> = Diff<T, null | undefined>
type T5 = NotNull<string | number | undefined | null>

// Exclude<T, U>   已经内置，其实就是上面的Diff
// NonNullable<T>. 等价上面的NotNull

// Extract<T, U> 提取 包含"a"或"e"的
type T6 = Extract<"a" | "b" | "c", "a" | "e">

// ReturnType<任何函数> 可以返回该函数的返回值类型，尤其是别人写的函数，R 就是推断出来的返回值类型，这是TS自动推断的。
type T8 = ReturnType<() => string>

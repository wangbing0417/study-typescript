interface A {
  name: string
  age: number
}

type B = Partial<A> //属性转为可选

type C = Required<B> //属性转为必选

type D = Readonly<C> //属性转为只读

type E = Omit<A, 'name'> //从A中剔除name属性

type F = Pick<A, 'name' | 'age'> //从A中拿到name与age属性

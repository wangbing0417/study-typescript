import 'reflect-metadata'

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  let set = descriptor.set

  descriptor.set = (value: T) => {
    let type = Reflect.getMetadata('design:type', target, propertyKey)

    if (!(value instanceof type)) {
      throw new TypeError('Invalid type.')
    }
    // 注意这里调用原set的方式
    set.call(target, value)
  }
}

interface Point {
  x: number
  y: number
}

class Line {
  private _p0: Point

  @validate
  public set p0(value: Point) {
    this._p0 = value
  }
  public get p0() {
    return this._p0
  }
}

let tl = new Line()
tl.p0 = { x: 1, y: 100 }

console.log(tl.p0)

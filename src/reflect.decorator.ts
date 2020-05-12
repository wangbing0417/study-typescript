import 'reflect-metadata'

// -------------------------类装饰器------------------------------
const classDecorator: ClassDecorator = (target) => {
  target.prototype.sayName = () => console.log('override')
}

export class TestClassDecorator {
  constructor(public name = '') {}

  sayName() {
    console.log(this.name)
  }
}

Reflect.decorate([classDecorator], TestClassDecorator)

const t = new TestClassDecorator('nihao')

t.sayName()

// -------------------------属性装饰器------------------------------
const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
  const origin = target[propertyKey]

  target[propertyKey] = () => {
    origin.call(target)
    console.log('added override')
  }
}

class PropertyAndMethodExample {
  static staticProperty() {
    console.log('im static property')
  }

  method() {
    console.log('im one instance method')
  }
}

Reflect.decorate(
  [propertyDecorator],
  PropertyAndMethodExample,
  'staticProperty'
)
PropertyAndMethodExample.staticProperty()

// -------------------------方法装饰器------------------------------
const methodDecorator: MethodDecorator = (target, propertyKey, descriptor) => {
  descriptor.configurable = false
  descriptor.writable = false

  return descriptor
}

// 获取原来的descriptor
let descriptor = Object.getOwnPropertyDescriptor(
  PropertyAndMethodExample.prototype,
  'method'
)

// console.log('descriptor', descriptor)

// 获取修改后的descriptor
descriptor = Reflect.decorate(
  [methodDecorator],
  PropertyAndMethodExample,
  'method',
  descriptor
)

// console.log('new descriptor', descriptor)

// 将修改后的descriptor添加到对应的方法上
Object.defineProperty(PropertyAndMethodExample.prototype, 'method', descriptor)

new PropertyAndMethodExample().method = () => console.log('override')

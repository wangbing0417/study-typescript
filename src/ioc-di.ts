import 'reflect-metadata'

type Constructor<T = any> = new (...args: any[]) => T

// const Injectable = (): ClassDecorator => target => {}
const Injectable = () => target => {}

class OtherService {
  a = 1
}

class NameService {
  name = 'muxia'

  public sayName() {
    return this.name
  }
}

@Injectable()
class TestService {
  constructor(public readonly nameService: NameService, public readonly otherService: OtherService) {}

  testMethod() {
    console.log(this.otherService.a, this.nameService.sayName())
  }
}

const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  /**
   * design:type: 属性类型
   * design:paramtypes: 参数类型
   * design:returntype: 返回值类型
   *
   * 类装饰器：design:paramtypes
   * 属性装饰器: design:type
   * 参数装饰器、方法装饰器: design:type、design:paramtypes、design:returntype
   * 访问器装饰器: design:type、design:paramtypes
   */
  const providers = Reflect.getMetadata('design:paramtypes', target) || []

  console.log('provides', providers)
  const args = providers.map((provider: Constructor) => new provider())
  console.log(...args)

  return new target(...args)
}

Factory(TestService).testMethod()

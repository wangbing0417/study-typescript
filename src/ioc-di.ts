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

  // 获取targrt类的构造函数所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target) || []

  // console.log('provides', providers)
  // 将参数依次实例化
  const args = providers.map((provider: Constructor) => new provider())
  // console.log(...args)

  // 将实例化的数组作为target类的参数，并返回target的实例
  return new target(...args)
}

Factory(TestService).testMethod()

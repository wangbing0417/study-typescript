import 'reflect-metadata'
import { isFunction, isConstructor } from './utils'

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

const creatMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value)
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value)
  }
}

const Get = creatMappingDecorator('GET')
const Post = creatMappingDecorator('POST')

// 映射route
function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance)

  // console.log('prototype', prototype, Object.getOwnPropertyNames(prototype))

  //筛选出类的 methodName
  const methodNames = Object.getOwnPropertyNames(prototype).filter(
    (item: string) => !isConstructor(item) && isFunction(prototype[item])
  )

  return methodNames.map(methodName => {
    const fn = prototype[methodName]

    //取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)

    return {
      route,
      method,
      fn,
      methodName
    }
  })
}

//--------------------------
@Controller('/test')
class SomeClass {
  public name: string

  @Get('/a')
  someGetMethod() {
    return 'hello world'
  }

  @Post('/b')
  somePostMethod() {}
}

console.log(Reflect.getMetadata(PATH_METADATA, SomeClass))

Reflect.getMetadata(PATH_METADATA, SomeClass) // "/test"

console.log(mapRoute(new SomeClass()))

mapRoute(new SomeClass())
/**
 *
 * *[{
 *    route: '/a',
 *    method: 'GET',
 *    fn: someGetMethod() { ... },
 *    methodName: 'someGetMethod'
 *  },{
 *    route: '/b',
 *    method: 'POST',
 *    fn: somePostMethod() { ... },
 *    methodName: 'somePostMethod'
 * }]
 */

/**
 * 所有的用途都是一个目的，给对象添加额外的信息，但是不影响对象的结构
 * 当给对象添加原信息的时候，对象是不会有任何的变化的，不会多property，也不会有的property被修改了
 * 但是可以衍生很多其他的用途
 */

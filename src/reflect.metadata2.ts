import 'reflect-metadata'

function logType(target: any, key: string) {
  var t = Reflect.getMetadata('design:type', target, key)
  console.log(`${key} type: ${t}`)
}

class Demo {
  @logType
  // @Reflect.metadata('design:type', { name: 'nametest' })
  public attr1: string
}

new Demo()

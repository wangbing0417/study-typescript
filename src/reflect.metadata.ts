import 'reflect-metadata'

const nameSymbol = Symbol('lorry')
// 类元数据
@Reflect.metadata('classKey', 'classd')
class MetaDataClass {
  // 实例属性元数据
  @Reflect.metadata(nameSymbol, 'nihaod')
  public name = 'origin'
  // 实例方法元数据
  @Reflect.metadata('getNameKey', 'getNamed')
  public getName() {}
  // 静态方法元数据
  @Reflect.metadata('staticKey', 'staticd')
  static staticMethod() {}
}
const value = Reflect.getMetadata('classKey', MetaDataClass)
const metadataInstance = new MetaDataClass()
const name = Reflect.getMetadata(nameSymbol, metadataInstance, 'name')
const methodVal = Reflect.getMetadata('getNameKey', metadataInstance, 'getName')
const staticVal = Reflect.getMetadata(
  'staticKey',
  MetaDataClass,
  'staticMethod'
)
console.log(value, name, methodVal, staticVal)

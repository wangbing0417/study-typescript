export function isConstructor(item: string) {
  return item === 'constructor'
}

export function isFunction(fn: any) {
  return typeof fn == 'function'
}

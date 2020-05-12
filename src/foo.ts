export {}

class EventEmitter {
  private stack = {}
  on(type: string, cb: Function) {
    this.stack[type] ? this.stack[type].push(cb) : (this.stack[type] = [cb])
  }
  emit(type: string) {
    !!this.stack[type] && this.stack[type].map((cb: Function) => cb())
  }
}

const emitter = new EventEmitter()

emitter.on('foo', () => console.log('11'))
emitter.on('foo', () => console.log('22'))

emitter.emit('foo')

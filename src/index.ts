import { StoreOptions, baseOptions, identifier } from './configs'
import { ensureFile } from './init'
import { StoreIO } from './io'

class Store {
  private io: StoreIO
  
  static instance (): Store {
    if (!global[identifier]) {
      throw new Error('Store is not initialized.')
    }
    return global[identifier]
  }
  
  constructor(
    private project: string,
    private options: StoreOptions = baseOptions,
  ) {
    if (!project) {
      throw new Error('store-now: missing param "project"')
    }
    const filepath = ensureFile(project, options.filename)
    this.io = new StoreIO(filepath)
    global[identifier] = this
  }
  
  async save(key: string, value: any): Promise<{ [key: string]: typeof value }> {
    if (key === null || key === undefined) throw new Error('Store: key is undefined')
    const keyVal = { [`${key}`]: value }
    await this.io.saveAll(keyVal)
    return keyVal
  }

  async find<T>(key: string): Promise<T> {
    if (!key) return null
    return (await this.io.findAll())[key] || null
  }
  
  async findAll(): Promise<JSON> {
    return this.io.findAll()
  }
  
  async has(key: string): Promise<boolean> {
    if (!key) return false
    return !!(await this.find(key))
  }

  async clear(): Promise<void> {
    await this.io.saveAll(null)
  }

}

class StoreNotInit {
  constructor() {
    new Error('Store is not initialized.')
  }
}

export {
  Store,
}

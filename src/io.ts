import fs from 'fs'

export class StoreIO {
  
  constructor(
    private filepath: string,
  ) {
  }
  
  async findAll(): Promise<JSON> {
    try {
      return JSON.parse(fs.readFileSync(this.filepath, 'utf-8'))
    } catch (e) {
      throw new Error(`Store: file is corrupt.(${this.filepath})`)
    }
  }
  
  async saveAll(dict: object | null): Promise<object> {
    const last = await this.findAll()
    const next = dict === null ? {} :Object.assign({}, last, dict)
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.filepath,
        JSON.stringify(next, null, 2),
        'utf-8',
        err => {
          if (err) return reject(err)
          resolve(next)
        })
    })
  }
}

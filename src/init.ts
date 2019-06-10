import os from 'os'
import path from 'path'
import fs from 'fs'

const ensureFile = (project: string, filename: string): string => {
  if (!filename.endsWith('.json')) {
    filename = `${filename}.json`
  }
  const home = path.join(os.homedir(), project)
  const filepath = path.join(home, filename)
  
  try {
    if (!fs.existsSync(home)) fs.mkdirSync(home)
    if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, '{}')
  } catch (e) {
    if (`${e.message}`.includes('permission')) {
      throw new Error(`Directory '${home}' does not have write permission.`)
    }
    throw e
  }
  
  return filepath
}

export {
  ensureFile,
}

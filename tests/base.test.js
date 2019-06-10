import * as fs from 'fs-extra'
import test from 'ava'
import os from 'os'
import path from 'path'
import { Store } from '../dist/index'

const project = 'base_test'
const home = path.join(os.homedir(), project)

test.before('clear context', () => {
  fs.removeSync(home)
})

test.after('clear base project', () => {
  fs.removeSync(home)
})

test('import module', t => {
  t.is(typeof Store, 'function')
  t.pass()
})

test('import instance should report error', t => {
  try {
    Store.instance()
    t.fail('should throw error')
  } catch (e) {
    t.pass()
  }
})

test('import instance after instance initialized', t => {
  new Store(project)
  Store.instance()
  t.pass()
})

test('store dir should created', t => {
  new Store(project)
  t.is(fs.existsSync(home), true)
})

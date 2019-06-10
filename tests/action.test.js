import * as fs from 'fs-extra'
import test from 'ava'
import os from 'os'
import path from 'path'
import { Store } from '../dist/index'

const projects = []
const random = () => Math.random().toString(32)

test.after('clear base project', () => {
  projects.forEach(project => fs.removeSync(path.join(os.homedir(), project)))
})

test('save string', async t => {
  const project = `project-${random()}`
  projects.push(project)
  const store = new Store(project)
  const value = random()
  const key = `key-${random()}`
  await store.save(key, value)
  t.is(await store.find(key), value)
})

test('save object', async t => {
  const project = `project-${random()}`
  projects.push(project)
  const store = new Store(project)
  const key = `key-${random()}`
  const value = { [random()]: random() }
  await store.save(key, value)
  t.deepEqual(await store.find(key), value)
})

test('clear all', async t => {
  const project = `project-${random()}`
  projects.push(project)
  const store = new Store(project)
  const key = `key-${random()}`
  const value = { [random()]: random() }
  await store.save(key, value)
  await store.clear()
  t.is(await store.find(key), null)
})

test('has value', async t => {
  const project = `project-${random()}`
  projects.push(project)
  const store = new Store(project)
  const key = `key-${random()}`
  const value = { [random()]: random() }
  await store.save(key, value)
  t.is(await store.has(key), true)
})

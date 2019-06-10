## store-now

Use file store in NodeJS (projects suitable for command-line tools).

In the project of command line tools, i rewrite config storage every time, this project may help you with the same problem.


## Feature

  - **Small**: no dependencies, no libs
  - **Easy**: no learning cost
  - **Safe**: contain tests
  - **Support**: `Promise` / `async / await` / Multiple Stores / Multiple Systems
  
## Usage

Store file writing location is related to the operate system, in `macos`, the path is `/Users/${user}`.

  1. install: `npm i store-now`
  
  2. import and create project: 
  ```js
  import { Store } from 'store-now'
  const store = new Store('my_project')
  ```

## API

> `store-now` contain type files, and in most cases you can get prompts.

  - `store.save(key: string, value: any)`: save an object or string or number.
  
  - `store.find(key: string)`: find a value.
  
  - `store.findAll()`: find all values.
  
  - `store.has(key: string)`: check whether the key exists.
  
  - `store.clear()`: clear all.

e.g.

```js
import { Store } from 'store-now'
// create project
const store = new Store('my_project')

// save value
await store.save('user', { name: 'witt' })

// get value
const user = await store.find('user')
```

## LICENSE
[MIT](./LICENSE)

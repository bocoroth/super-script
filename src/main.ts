import { invoke } from '@tauri-apps/api'

// styles
import './style.scss'

// dependency scripts
// @ts-ignore
import * as bootstrap from 'bootstrap'

// app scripts
import { App } from './ts/App'

// main app invocation
new App()

// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then((response) => console.log(response))

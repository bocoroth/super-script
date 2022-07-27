import { invoke } from '@tauri-apps/api'

// Turn Debug log on or off
const DEBUGGING_ENABLED = true

// styles
import './style.scss'

// dependency scripts
import * as bootstrap from 'bootstrap'

// app scripts
import { App } from './App'

// main app invocation
new App(DEBUGGING_ENABLED)

const triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl: HTMLElement) {
  const tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event: Event) {
    event.preventDefault()
    tabTrigger.show()
  })
})

/* IPC Functions **************************************************************/

// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!
invoke('greet', { name: 'World' })
  // `invoke` returns a Promise
  .then((response) => console.log(response))

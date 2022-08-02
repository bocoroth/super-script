// styles
import './style.scss'

// dependency scripts
import * as bootstrap from 'bootstrap'

// app scripts
import { App } from './App'

// Turn Debug log on or off
const DEBUGGING_ENABLED = false

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

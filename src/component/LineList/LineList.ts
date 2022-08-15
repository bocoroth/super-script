import { App } from '../../App'
import { DOMComponent } from '../../interface/DOMComponent.interface'
import { lineListTemplate } from './LineList.template'

import jQuery from 'jquery'
import * as DataTable from 'datatables.net'
import 'datatables.net-dt'
// @ts-ignore
import Select from 'datatables.net-select-dt'

Object.assign(window, { $: jQuery, jQuery })

// @ts-ignore
new DataTable(window, $)
Select()

export class LineList implements DOMComponent {
  scrollHeight: string
  selector: string
  selectStyle: 'api' | 'single' | 'multi' | 'os' | 'multi+shift'
  toggleable: boolean
  readonly className = 'linelist-component'

  constructor (
    selector = '#linelist',
    selectStyle: 'single',
    toggleable = true,
    scrollHeight = '70vh'
  ) {
    this.scrollHeight = scrollHeight
    this.selector = selector
    this.selectStyle = selectStyle
    this.toggleable = toggleable
  }

  public init () {
    const lineListElement = document.querySelector<HTMLDivElement>(this.selector)
    lineListElement!.innerHTML = lineListTemplate
    lineListElement!.classList.add(this.className)

    // @ts-ignore
    $('#line_table').DataTable({
      columnDefs: [{ width: '100%', targets: 5 }],
      dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
        "<'row'<'col-sm-12'tr>>",
      info: false,
      paging: false,
      ordering: false,
      scrollY: this.scrollHeight,
      select: {
        style: this.selectStyle,
        toggleable: this.toggleable
      }
    })

    App.debugLog('LineList loaded.')
  }
}

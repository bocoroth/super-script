import { AfterViewInit, Component, OnInit } from '@angular/core'
import { ShortcutInput } from 'ng-keyboard-shortcuts'
import { ExternalService } from '../../external.service'
import { LineBrokerService } from '../../line-broker.service'
import { IpcService } from '../../ipc.service'

@Component({
  selector: 'app-performance-hotkeys',
  templateUrl: './performance-hotkeys.component.html',
  styleUrls: ['./performance-hotkeys.component.scss']
})
export class PerformanceHotkeysComponent implements AfterViewInit, OnInit {
  shortcuts: ShortcutInput[] = []
  shortcutsDisabled = true

  constructor(
    private external: ExternalService,
    private lineBroker: LineBrokerService,
    private readonly _ipc: IpcService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this._ipc.on('unloadPerformanceResponse', () => {
      this.shortcutsDisabled = true
    })

    this._ipc.on('loadPerformanceResponse', () => {
      this.shortcutsDisabled = false
    })

    this.shortcuts.push(
      // Performance next line
      {
        key: ['space', 'down', 'x'],
        command: () => {
          this.nextLine()
        },
        preventDefault: true
      },
      // Performance previous line
      {
        key: ['backspace', 'up', 'z'],
        command: () => {
          this.prevLine()
        },
        preventDefault: true
      },
      // show/hide displayed line
      {
        key: ['h', 'tab'],
        command: () => {
          this.external.hideLine()
        },
        preventDefault: true
      }
    )
  }

  public nextLine() {
    let id = this.lineBroker
      .getDatatableInstance()
      .rows({ selected: true })
      .data()[0][0]
    id++
    const length = this.lineBroker
      .getDatatableInstance()
      .rows()
      .data().length
    if (id < length) {
      const newRow = this.lineBroker
        .getDatatableInstance()
        .row(id)
        .data()
      this.external.setExternal(newRow[5], newRow[4])
      this.lineBroker.selectDatatableRow(id)
    }
  }

  public prevLine() {
    let id = this.lineBroker
      .getDatatableInstance()
      .rows({ selected: true })
      .data()[0][0]
    id = id < 1 ? 0 : id - 1
    const newRow = this.lineBroker
      .getDatatableInstance()
      .row(id)
      .data()
    this.external.setExternal(newRow[5], newRow[4])
    this.lineBroker.selectDatatableRow(id)
  }
}

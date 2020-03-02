import { AfterViewInit, Component } from '@angular/core'
import { ShortcutInput } from 'ng-keyboard-shortcuts'
import { IpcService } from '../ipc.service'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  shortcuts: ShortcutInput[] = []
  isExternal: boolean = true // default render the external panel

  constructor(private readonly _ipc: IpcService) {}

  ngAfterViewInit(): void {
    // Close app: CTRL + w / CTRL + q
    this.shortcuts.push({
      key: ['ctrl + w', 'ctrl + q', 'cmd + w', 'cmd + q'],
      command: () => {
        this._ipc.send('hotkeyclose')
      },
      preventDefault: true
    })

    this._ipc.on('loadExternal', () => {
      this.isExternal = true
    })

    this._ipc.on('loadControl', () => {
      this.isExternal = false
    })
  }
}

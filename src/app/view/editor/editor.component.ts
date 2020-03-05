import { AfterViewInit, Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'
import { IpcService } from '../../ipc.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnInit {
  constructor(private status: StatusService, private readonly _ipc: IpcService) {}

  ngOnInit() {
    this.status.changeView('editor')
  }

  ngAfterViewInit() {
    this._ipc.send('unloadPerformance')
  }
}

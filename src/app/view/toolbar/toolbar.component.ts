import { Component, OnInit } from '@angular/core'
import { LineBrokerService } from '../../line-broker.service'
import { StatusService } from '../../status.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  statusContent: string

  constructor(private lineBroker: LineBrokerService, private statusService: StatusService) {}

  ngOnInit() {
    this.statusService.currentStatus.subscribe(status => (this.statusContent = status))
    this.statusService.changeStatus('ready...')
  }

  public async openScript() {
    await this.lineBroker.loadPath().then(async path => {
      await this.lineBroker.loadFile(path).then(script => {
        this.lineBroker.setFilePath(path)
        this.lineBroker.setScript(script)
        this.lineBroker.loadDatatable()
      })
    })
  }

  public saveScript() {
    this.statusService.changeStatus('saving...')
    $.when(this.lineBroker.saveFile())
      .then(() => {
        this.statusService.changeStatus('Script saved!')
      })
      .fail(error => {
        this.statusService.changeStatus('<span class="text-danger">Failed to save script.</span>')
        console.warn(error)
      })
  }
}
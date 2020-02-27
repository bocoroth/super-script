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

  public async newScript() {
    const path = 'assets/default.json'
    await this.lineBroker.loadFile(path).then(script => {
      this.lineBroker.setFilePath(path)
      this.lineBroker.setScript(script)
      this.lineBroker.loadDatatable()
      this.lineBroker.selectDatatableRow(0)
    })
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

  public saveScript(saveAs = false) {
    const currentPath = this.lineBroker.getFilePath()

    if (currentPath.match(/assets(\\|\/)default\.json$/i) || saveAs) {
      // new script, or Save As
      $.when(this.lineBroker.getSaveFilePath())
        .then(filePath => {
          if (filePath) {
            this.lineBroker.setFilePath(filePath)
            this.statusService.changeStatus('saving...')
            $.when(this.lineBroker.saveFile())
              .then(() => {
                this.statusService.changeStatus(`Script saved as ${filePath}`)
                localStorage.setItem('ht-script', JSON.stringify(this.lineBroker.getScript()))
                localStorage.setItem('ht-path', this.lineBroker.getFilePath())
              })
              .fail(error => {
                this.statusService.changeStatus('<span class="text-danger">Failed to save script.</span>')
                console.warn(error)
              })
          } else {
            this.statusService.changeStatus('<span class="text-danger">Failed to save script.</span>')
          }
        })
        .fail(error => {
          this.statusService.changeStatus('<span class="text-danger">Failed to save script.</span>')
          console.warn(error)
        })
    } else {
      // not default script, regular save
      this.statusService.changeStatus('saving...')
      $.when(this.lineBroker.saveFile())
        .then(() => {
          this.statusService.changeStatus(`Script saved as ${this.lineBroker.getFilePath()}`)
          localStorage.setItem('ht-script', JSON.stringify(this.lineBroker.getScript()))
          localStorage.setItem('ht-path', this.lineBroker.getFilePath())
        })
        .fail(error => {
          this.statusService.changeStatus('<span class="text-danger">Failed to save script.</span>')
          console.warn(error)
        })
    }
  }
}

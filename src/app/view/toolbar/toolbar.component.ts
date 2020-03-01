import { AfterViewInit, Component, OnInit } from '@angular/core'
import { ShortcutInput } from 'ng-keyboard-shortcuts'
import { LineBrokerService } from '../../line-broker.service'
import { StatusService } from '../../status.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit, OnInit {
  statusContent: string

  shortcuts: ShortcutInput[] = []

  constructor(private lineBroker: LineBrokerService, private statusService: StatusService) {}

  ngAfterViewInit(): void {
    this.shortcuts.push(
      // New Script: CTRL + n
      {
        key: ['ctrl + n', 'cmd + n'],
        command: () => {
          this.newScript()
        },
        preventDefault: true
      },
      // Open Script: CTRL + o
      {
        key: ['ctrl + o', 'cmd + o'],
        command: () => {
          this.openScript()
        },
        preventDefault: true
      },
      // Open Script: CTRL + o
      {
        key: ['ctrl + o', 'cmd + o'],
        command: () => {
          this.openScript()
        },
        preventDefault: true
      },
      // Save Script: CTRL + s
      {
        key: ['ctrl + s', 'cmd + s'],
        command: () => {
          this.saveScript()
        },
        preventDefault: true
      },
      // Save As Script: CTRL + SHIFT + s
      {
        key: ['ctrl + shift + s', 'cmd + shift + s'],
        command: () => {
          this.saveScript(true)
        },
        preventDefault: true
      },
      // Edit Meta: CTRL + m
      {
        key: ['ctrl + m', 'cmd + m'],
        command: () => {
          this.editMeta()
        },
        preventDefault: true
      },
      // Import Script: CTRL + SHIFT + i
      {
        key: ['ctrl + shift + i', 'cmd + shift + i'],
        command: () => {
          this.importScript()
        },
        preventDefault: true
      },
      // Export Script: CTRL + SHIFT + x
      {
        key: ['ctrl + shift + x', 'cmd + shift + x'],
        command: () => {
          this.exportScript()
        },
        preventDefault: true
      }
    )
  }
  ngOnInit() {
    this.statusService.currentStatus.subscribe(status => (this.statusContent = status))
    this.statusService.changeStatus('ready...')
  }

  public async newScript() {
    // TODO: check for changes to file and prompt to overwrite
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

    if (saveAs || currentPath === null || currentPath.match(/assets(\\|\/)default\.json$/i)) {
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

  public editMeta() {}

  public async importScript() {
    await this.lineBroker.importPath().then(async (path: string) => {
      const fileParts = path.split('.')
      let ext = fileParts[fileParts.length - 1]
      if (typeof ext === 'undefined' || ext.length > 5) {
        ext = ''
      }
      await this.lineBroker.importFile(path, ext).then(script => {
        this.lineBroker.setScript(script)
        this.lineBroker.loadDatatable()
      })
    })
  }

  public exportScript() {}
}

import { AfterViewInit, Component, OnDestroy, ViewChild, OnInit } from '@angular/core'
import { DataTableDirective } from 'angular-datatables'
import { ShortcutInput } from 'ng-keyboard-shortcuts'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { Script } from '../../script.interface'
import { ScriptLine } from '../../script-line.interface'
import { LineBrokerService } from '../../line-broker.service'
import { StatusService } from '../../status.service'
import { ExternalService } from '../../external.service'

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.scss']
})
export class LineListComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective
  dtOptions: any = {}
  lines: ScriptLine[] = []
  dtTrigger: Subject<any> = new Subject()
  dtInstance: any = null // required to be 'any' to work with angular-datatables

  shortcuts: ShortcutInput[] = []

  lineNumber: string
  durationMS: string
  cssClass: string
  entry: string

  filePath = 'assets/default.json' // TODO: set up autoload last file with settings

  constructor(
    private http: HttpClient,
    private lineBrokerService: LineBrokerService,
    private status: StatusService,
    private external: ExternalService
  ) {}

  ngAfterViewInit() {}

  ngOnInit() {
    const self = this
    this.lineBrokerService.lineNumber.subscribe(num => (this.lineNumber = num))
    this.lineBrokerService.durationMS.subscribe(ms => (this.durationMS = ms))
    this.lineBrokerService.cssClass.subscribe(css => (this.cssClass = css))
    this.lineBrokerService.currentEntry.subscribe(entry => (this.entry = entry))
    this.lineBrokerService.setFilePath(self.filePath)

    let scroll = '60vh'
    let select = 'os'
    let toggleable = true
    if (this.status.getView() === 'performance') {
      scroll = '80vh'
      select = 'single'
      toggleable = false
    }

    this.dtOptions = {
      paging: false,
      ordering: false,
      select: { style: select, toggleable: toggleable },
      scrollY: scroll,
      info: false,
      columnDefs: [{ width: '100%', targets: 5 }] // lines column max width
    }
    this.http.get(this.filePath).subscribe(scriptSrc => {
      const script: any = scriptSrc

      this.lineBrokerService.setScript(script)

      // Call the DT trigger to render the table
      this.dtTrigger.next()

      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.dtInstance = dtInstance
        this.lineBrokerService.setDatatableInstance(dtInstance)
        if (localStorage.getItem('ht-script')) {
          const lsScript: Script = JSON.parse(localStorage.getItem('ht-script'))
          this.lineBrokerService.setScript(lsScript)
        }
        this.lineBrokerService.loadDatatable()
        this.dtInstance.rows(':first-child').select()
        if (this.status.getView() === 'performance') {
          $('#line-table tbody').on('dblclick', 'tr', function() {
            const data = self.dtInstance.row(this).data()
            self.external.setExternal(data[5], data[4])
          })
        }
      })
    })
  }

  ngOnDestroy(): void {
    localStorage.setItem('ht-script', JSON.stringify(this.lineBrokerService.getScript()))
  }
}

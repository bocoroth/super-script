import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core'
import { DataTableDirective } from 'angular-datatables'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { Script } from '../../script.interface'
import { ScriptLine } from '../../script-line.interface'
import { LineBrokerService } from '../../line-broker.service'

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.scss']
})
export class LineListComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective
  dtOptions: any = {}
  lines: ScriptLine[] = []
  dtTrigger: Subject<any> = new Subject()
  dtInstance: any = null // required to be 'any' to work with angular-datatables

  lineNumber: string
  durationMS: string
  cssClass: string
  entry: string

  filePath = 'assets/default.json' // TODO: set up autoload last file with settings

  constructor(private http: HttpClient, private lineBrokerService: LineBrokerService) {}

  ngOnInit() {
    const self = this
    self.lineBrokerService.lineNumber.subscribe(num => (this.lineNumber = num))
    self.lineBrokerService.durationMS.subscribe(ms => (this.durationMS = ms))
    self.lineBrokerService.cssClass.subscribe(css => (this.cssClass = css))
    self.lineBrokerService.currentEntry.subscribe(entry => (this.entry = entry))
    self.lineBrokerService.setFilePath(self.filePath)

    let scroll = '60vh'
    switch (self.lineBrokerService.currentTab) {
      case 'performance':
        scroll = '80vh'
    }

    self.dtOptions = {
      paging: false,
      ordering: false,
      select: 'os',
      scrollY: scroll,
      info: false,
      columnDefs: [{ width: '100%', targets: 5 }] // lines column max width
    }
    self.http.get(this.filePath).subscribe(scriptSrc => {
      const script: any = scriptSrc

      self.lineBrokerService.setScript(script)

      // Call the DT trigger to render the table
      self.dtTrigger.next()

      self.datatableElement.dtInstance.then(function(dtInstance: DataTables.Api) {
        self.dtInstance = dtInstance
        self.lineBrokerService.setDatatableInstance(dtInstance)
        if (localStorage.getItem('ht-script')) {
          const lsScript: Script = JSON.parse(localStorage.getItem('ht-script'))
          self.lineBrokerService.setScript(lsScript)
        }
        self.lineBrokerService.loadDatatable()
        self.dtInstance.rows(':last-child').select()
      })
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.lineBrokerService.destroyDatatableInstance()
    localStorage.setItem('ht-script', JSON.stringify(this.lineBrokerService.getScript()))
  }
}

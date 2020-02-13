import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core'
import { DataTableDirective } from 'angular-datatables'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
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
  entry: String

  constructor(private http: HttpClient, private lineBrokerService: LineBrokerService) {}

  ngOnInit() {
    const self = this
    self.lineBrokerService.currentEntry.subscribe(entry => (this.entry = entry))

    self.dtOptions = {
      paging: false,
      ordering: false,
      select: 'single',
      scrollY: '50vh',
      columnDefs: [{ width: '100%', targets: 5 }], // lines column max width
      createdRow: function() {
        // TODO: tunnel to edit-box to set up next row entry?
      },
      initComplete: function() {
        // TODO: tunnel to edit-box to set up first row entry
      }
    }
    self.http
      .get('assets/default.json') // TODO: set correct link to data
      .subscribe(scriptSrc => {
        const script: any = scriptSrc
        if (typeof script.text !== 'undefined') {
          let lineCount = 0
          for (const line of script.text) {
            if (typeof line.startTime === 'undefined') {
              line.startTime = ''
            }
            if (typeof line.endTime === 'undefined') {
              line.endTime = ''
            }
            if (typeof line.durationMS === 'undefined') {
              line.durationMS = 0
            }
            if (typeof line.cssClass === 'undefined') {
              line.cssClass = ''
            }
            if (typeof line.text === 'undefined') {
              line.text = ''
            }
            this.lines.push(line)
            lineCount++
          }

          // blank line for editing
          const lastLine: ScriptLine = {
            id: lineCount,
            startTime: '',
            endTime: '',
            durationMS: 0,
            cssClass: '',
            text: ''
          }

          self.lines.push(lastLine)
          self.lineBrokerService.setScript(script)
        }
        // Calling the DT trigger to manually render the table
        self.dtTrigger.next()

        self.datatableElement.dtInstance.then(function(dtInstance: DataTables.Api) {
          self.dtInstance = dtInstance
          self.lineBrokerService.setDatatableInstance(dtInstance)
          self.dtInstance.rows(':last-child').select()
        })
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.lineBrokerService.destroyDatatableInstance()
  }
}

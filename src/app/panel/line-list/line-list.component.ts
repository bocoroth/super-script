import { Component, OnDestroy, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { ScriptLine } from '../../script-line.interface'

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.scss']
})
export class LineListComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {}
  lines: ScriptLine[] = []
  dtTrigger: Subject<any> = new Subject()

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.dtOptions = {
      paging: false,
      scrollY: '50vh',
      createdRow: function() {
        // TODO: tunnel to edit-box to set up next row entry?
      },
      initComplete: function() {
        // TODO: tunnel to edit-box to set up first row entry
      }
    }
    this.http
      .get('assets/default.json') // TODO: set correct link to data
      .subscribe(scriptSrc => {
        const script: any = scriptSrc
        console.log(script)
        if (typeof script.text !== 'undefined') {
          for (const line of script.text) this.lines.push(line)
        }
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next()
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }
}

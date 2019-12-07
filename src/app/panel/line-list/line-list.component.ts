import { Component, OnDestroy, OnInit } from '@angular/core'
import { Http, Response } from '@angular/http'
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

  constructor(private http: Http) {}

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
      .get('data/data.json') // TODO: set correct link to data
      .map(this.extractData)
      .subscribe(lines => {
        this.lines = lines
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next()
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  private extractData(res: Response) {
    // TODO: set to return correct values from json data
    const body = res.json()
    return body.data || {}
  }
}

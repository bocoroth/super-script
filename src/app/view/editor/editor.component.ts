import { Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  constructor(private status: StatusService) {}

  ngOnInit() {
    this.status.changeView('editor')
  }
}

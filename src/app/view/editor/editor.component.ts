import { Component, OnInit } from '@angular/core'
import { LineBrokerService } from '../../line-broker.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  constructor(private lineBrokerService: LineBrokerService) {}

  ngOnInit() {
    this.lineBrokerService.currentTab = 'editor'
  }
}

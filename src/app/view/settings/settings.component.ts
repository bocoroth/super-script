import { Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private status: StatusService) {}

  ngOnInit() {
    this.status.changeView('settings')
  }
}

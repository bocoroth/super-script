import { Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.scss']
})
export class RehearsalComponent implements OnInit {
  constructor(private status: StatusService) {}

  ngOnInit() {
    this.status.changeView('rehearsal')
  }
}

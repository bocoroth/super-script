import { Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  constructor(private status: StatusService) {}

  ngOnInit() {
    this.status.changeView('performance')
  }
}

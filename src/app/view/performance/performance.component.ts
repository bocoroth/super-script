import { Component, OnInit } from '@angular/core'
import { LineBrokerService } from '../../line-broker.service'

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  constructor(private lineBrokerService: LineBrokerService) {}

  ngOnInit() {
    this.lineBrokerService.currentTab = 'performance'
  }
}

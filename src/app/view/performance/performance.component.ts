import { AfterViewInit, Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'
import { SettingsService } from '../../settings.service'
import { ExternalService } from '../../external.service'
import { ScriptService } from '../../script.service'
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements AfterViewInit, OnInit {
  constructor(
    private status: StatusService,
    private settings: SettingsService,
    private external: ExternalService,
    private script: ScriptService
  ) {}

  ngOnInit() {
    this.status.changeView('performance')
  }

  ngAfterViewInit() {
    this.settings.loadLocalSettings()

    const loadedX = parseInt(this.settings.getSetting('externalX'))
    const loadedY = parseInt(this.settings.getSetting('externalY'))
    const loadedWidth = parseInt(this.settings.getSetting('externalWidth'))
    const loadedHeight = parseInt(this.settings.getSetting('externalHeight'))
    const loadedBorder = this.settings.getSetting('externalBorder') === 'true'
    const loadedCSS = this.settings.getSetting('metaCSS')

    this.external.setX(loadedX)
    this.external.setY(loadedY)
    this.external.setWidth(loadedWidth)
    this.external.setHeight(loadedHeight)
    this.external.showBorder(loadedBorder)
    this.external.loadStyles(loadedCSS)
    this.script.setMetaStyles(loadedCSS)
  }
}

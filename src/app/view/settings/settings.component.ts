import { AfterViewInit, Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'
import { SettingsService } from '../../settings.service'
import { ExternalService } from '../../external.service'
import { ScriptService } from '../../script.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit, OnInit {
  constructor(
    private status: StatusService,
    private settings: SettingsService,
    private external: ExternalService,
    private script: ScriptService
  ) {}

  ngOnInit() {
    this.status.changeView('settings')
  }

  ngAfterViewInit() {
    this.settings.loadLocalSettings()

    // EXTERNAL DISPLAY
    const loadedX = parseInt(this.settings.getSetting('externalX'))
    const loadedY = parseInt(this.settings.getSetting('externalY'))
    const loadedWidth = parseInt(this.settings.getSetting('externalWidth'))
    const loadedHeight = parseInt(this.settings.getSetting('externalHeight'))
    const loadedBorder = this.settings.getSetting('externalBorder') === 'true'
    const loadedCSS = this.settings.getSetting('metaCSS')

    this.script.setMetaStyles(loadedCSS)

    $('#externalX').val(loadedX)
    this.external.setX(loadedX)
    $('#externalY').val(loadedY)
    this.external.setY(loadedY)
    $('#externalWidth').val(loadedWidth)
    this.external.setWidth(loadedWidth)
    $('#externalHeight').val(loadedHeight)
    this.external.setHeight(loadedHeight)
    $('#externalBorder').prop('checked', loadedBorder)
    this.external.showBorder(loadedBorder)

    // META
    $('#metaCSS').text(loadedCSS)
    this.external.loadStyles(loadedCSS)

    // CHANGE LISTENERS
    const self = this
    $('#externalX').change(function() {
      const newX: number = parseInt($(this).val() as string)
      self.external.setX(newX)
    })
    $('#externalY').change(function() {
      const newY: number = parseInt($(this).val() as string)
      self.external.setY(newY)
    })
    $('#externalWidth').change(function() {
      const newWidth: number = parseInt($(this).val() as string)
      self.external.setWidth(newWidth)
    })
    $('#externalHeight').change(function() {
      const newHeight: number = parseInt($(this).val() as string)
      self.external.setHeight(newHeight)
    })
    $('#externalBorder').change(function() {
      const border: boolean = $(this).prop('checked') as boolean
      self.external.showBorder(border)
    })
    $('#metaCSS').change(function() {
      const newStyles: string = $(this).val() as string
      self.external.loadStyles(newStyles)
    })
  }

  public saveSettings(): void {
    // EXTERNAL DISPLAY
    this.settings.saveSetting(
      'externalX',
      $('#externalX')
        .val()
        .toString()
    )
    this.settings.saveSetting(
      'externalY',
      $('#externalY')
        .val()
        .toString()
    )
    this.settings.saveSetting(
      'externalWidth',
      $('#externalWidth')
        .val()
        .toString()
    )
    this.settings.saveSetting(
      'externalHeight',
      $('#externalHeight')
        .val()
        .toString()
    )
    this.settings.saveSetting(
      'externalBorder',
      $('#externalBorder')
        .prop('checked')
        .toString()
    )

    // META
    this.settings.saveSetting('metaCSS', $('#metaCSS').val() as string)

    this.status.changeStatus('Settings saved!')
  }
}

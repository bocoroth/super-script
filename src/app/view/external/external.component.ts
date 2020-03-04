import { Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'
import { SettingsService } from '../../settings.service'
import { ExternalService } from '../../external.service'
import { IpcService } from '../../ipc.service'

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {
  lineContent: string
  classContent: string
  styleContent: string

  constructor(
    private readonly _ipc: IpcService,
    private status: StatusService,
    private external: ExternalService,
    private settings: SettingsService
  ) {}

  ngOnInit() {
    this.status.changeView('external')
    this.external.currentLine.subscribe(newLine => (this.lineContent = newLine))
    this.external.changeLine('test')
    this.external.currentClass.subscribe(newClass => (this.classContent = newClass))
    this.external.changeClass('test')
    this.external.currentStyle.subscribe(newStyle => (this.styleContent = newStyle))
    this.external.changeStyle('')

    this.external.setX(parseInt(this.settings.getSetting('externalX')) || 0)
    this.external.setY(parseInt(this.settings.getSetting('externalY')) || 0)
    this.external.setWidth(parseInt(this.settings.getSetting('externalWidth')) || 0)
    this.external.setHeight(parseInt(this.settings.getSetting('externalHeight')) || 0)
    this.external.showBorder(this.settings.getSetting('externalBorder') === 'true')
    this.external.loadStyles(this.settings.getSetting('metaCSS'))

    this._ipc.on('loadLineResponse', (_e: any, line: string) => {
      //console.log('got loadLineResponse: ', line)
      this.external.changeLine(line)
      $('#ht-external-content').html(line)
    })

    this._ipc.on('loadStylesResponse', (_e: any, style: string) => {
      //console.log('got loadStylesResponse: ', style)
      this.external.changeStyle(style)
      if ($('style#ht-script-styles').length) {
        $('style#ht-script-styles').text(style)
      } else {
        $(`<style id="ht-script-styles">${style}</style>`).appendTo('head')
      }
    })

    this._ipc.on('loadClassResponse', (_e: any, newClass: string) => {
      //console.log('got loadClassResponse: ', newClass)
      this.external.changeClass(newClass)
      $('#ht-external-content')
        .removeClass()
        .addClass(newClass)
    })

    this._ipc.on('setExternalXResponse', (_e: any, newX: number) => {
      //console.log('got setExternalXResponse: ', newX)
      $('#ht-external-container').css('left', newX + 'px')
    })

    this._ipc.on('setExternalYResponse', (_e: any, newY: number) => {
      //console.log('got setExternalYResponse: ', newY)
      $('#ht-external-container').css('top', newY + 'px')
    })

    this._ipc.on('setExternalHeightResponse', (_e: any, newHeight: number) => {
      //console.log('got setExternalHeightResponse: ', newHeight)
      $('#ht-external-container').css('height', newHeight + 'px')
    })

    this._ipc.on('setExternalWidthResponse', (_e: any, newWidth: number) => {
      //console.log('got setExternalWidthResponse: ', newWidth)
      $('#ht-external-container').css('width', newWidth + 'px')
    })

    this._ipc.on('showExternalBorderResponse', (_e: any, border: boolean) => {
      //console.log('got showExternalBorderResponse: ', border)
      if (border) {
        $('#ht-external-container').css('border', '2px solid white')
      } else {
        $('#ht-external-container').css('border', 'none')
      }
    })

    this._ipc.on('hideExternalLineResponse', () => {
      //console.log('got hideExternalLineResponse: ', setHidden)
      if ($('#ht-external-container').css('visibility') === 'hidden') {
        $('#ht-external-container').css('visibility', 'visible')
      } else {
        $('#ht-external-container').css('visibility', 'hidden')
      }
    })
  }
}

import { Component, OnInit } from '@angular/core'
import { StatusService } from '../../status.service'
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

  constructor(private readonly _ipc: IpcService, private status: StatusService, private external: ExternalService) {}

  ngOnInit() {
    this.status.changeView('external')
    this.external.currentLine.subscribe(newLine => (this.lineContent = newLine))
    this.external.changeLine('test')
    this.external.currentClass.subscribe(newClass => (this.classContent = newClass))
    this.external.changeClass('test')
    this.external.currentStyle.subscribe(newStyle => (this.styleContent = newStyle))
    this.external.changeStyle('')

    this._ipc.on('loadLineResponse', (_e: any, line: string) => {
      this.external.changeLine(line)
      $('#ht-external-content').html(line)
    })

    this._ipc.on('loadStylesResponse', (_e: any, style: string) => {
      this.external.changeStyle(style)
      if ($('style#ht-script-styles').length) {
        $('style#ht-script-styles').text(style)
      } else {
        $(`<style id="ht-script-styles">${style}</style>`).appendTo('head')
      }
    })

    this._ipc.on('loadClassResponse', (_e: any, newClass: string) => {
      this.external.changeClass(newClass)
      $('#ht-external-content')
        .removeClass()
        .addClass(newClass)
    })
  }
}

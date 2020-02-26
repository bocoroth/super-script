import { Component, OnInit } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { FontService } from '../../font.service'
import { LineBrokerService } from '../../line-broker.service'
import { ScriptLine } from '../../script-line.interface'

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss']
})
export class EditBoxComponent implements OnInit {
  lineNumber: string
  durationMS: string
  cssClass: string
  entryContent: string

  constructor(private fontService: FontService, private lineBroker: LineBrokerService) {}

  async ngOnInit() {
    this.loadFonts()
    this.lineBroker.lineNumber.subscribe(num => (this.lineNumber = num))
    this.lineBroker.durationMS.subscribe(ms => (this.durationMS = ms))
    this.lineBroker.cssClass.subscribe(css => (this.cssClass = css))
    this.lineBroker.currentEntry.subscribe(entry => (this.entryContent = entry))

    // test file loading
    /*await this.lineBroker.loadPath().then(async path => {
      console.log(path)
      await this.lineBroker.loadFile(path).then(script => {
        console.log(script)
      })
    })*/
  }

  private async loadFonts() {
    const fonts = await this.fontService.getFonts()
    this.editorConfig.fonts = fonts
  }

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [{ class: 'select-font', name: 'Font...' }],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'customClasses',
        'insertVideo',
        'link',
        'unlink',
        'insertHorizontalRule'
      ]
    ]
  }

  public saveLine() {
    //this.lineBroker.changeLineNumber($('#lineNumber').val() as string)
    this.lineBroker.changeDurationMS($('#durationMS').val() as string)
    this.lineBroker.changeCssClass($('#cssClass').val() as string)

    const line: ScriptLine = {
      id: parseInt(this.lineNumber),
      durationMS: parseInt(this.durationMS),
      cssClass: this.cssClass,
      text: this.entryContent
    }
    this.lineBroker.editLine(line)
    this.lineBroker.loadDatatable()
    this.lineBroker.selectDatatableRow(parseInt(this.lineNumber + 1))
  }
}

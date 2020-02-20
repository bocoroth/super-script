import { Component, OnInit } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { FontService } from '../../font.service'
import { LineBrokerService } from '../../line-broker.service'

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss']
})
export class EditBoxComponent implements OnInit {
  entryContent: String

  constructor(private fontService: FontService, private lineBroker: LineBrokerService) {}

  async ngOnInit() {
    this.loadFonts()
    this.lineBroker.currentEntry.subscribe(entry => (this.entryContent = entry))

    // test file loading
    /*await this.lineBroker.testLoadPath().then(async path => {
      console.log(path)
      await this.lineBroker.testLoadFile(path).then(script => {
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
}

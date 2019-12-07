import { Component, OnInit } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { FontService } from '../../font.service'

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss']
})
export class EditBoxComponent implements OnInit {
  constructor(private fontService: FontService) {}

  ngOnInit() {
    this.loadFonts()
  }

  private async loadFonts() {
    const fonts = await this.fontService.getFonts()
    this.editorConfig.fonts = fonts
  }

  private editorConfig: AngularEditorConfig = {
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
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      }
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['insertVideo', 'link', 'unlink']]
  }
}

import { Component, AfterViewInit, OnInit } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts'
import { FontService } from '../../font.service'
import { LineBrokerService } from '../../line-broker.service'
import { ScriptLine } from '../../script-line.interface'

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss']
})
export class EditBoxComponent implements AfterViewInit, OnInit {
  lineNumber: string
  durationMS: string
  cssClass: string
  entryContent: string

  shortcuts: ShortcutInput[] = []

  constructor(private fontService: FontService, private lineBroker: LineBrokerService) {}

  async ngOnInit() {
    this.loadFonts()
    this.lineBroker.lineNumber.subscribe(num => (this.lineNumber = num))
    this.lineBroker.durationMS.subscribe(ms => (this.durationMS = ms))
    this.lineBroker.cssClass.subscribe(css => (this.cssClass = css))
    this.lineBroker.currentEntry.subscribe(entry => (this.entryContent = entry))
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

  ngAfterViewInit(): void {
    this.shortcuts.push(
      // Save Line: enter (in textarea)
      {
        key: 'enter',
        command: e => {
          const event = e.event
          const targetElem = e.event.target as HTMLTextAreaElement
          if (targetElem.classList && targetElem.classList.contains('angular-editor-textarea') && !event.shiftKey) {
            e.event.preventDefault()
            this.saveLine()
          }
        },
        allowIn: [AllowIn.Textarea],
        preventDefault: false
      },
      // Delete Line: delete (on selected datatable line[s])
      {
        key: 'del',
        command: e => {
          const targetElem = e.event.target as HTMLBodyElement
          if (targetElem.nodeName && targetElem.nodeName === 'BODY') {
            e.event.preventDefault()
            const dt = this.lineBroker.getDatatableInstance()
            let ids: number[] = []
            dt.rows({ selected: true })
              .data()
              .each((row: (string | number)[]) => {
                const id = row[0] as number
                ids.push(id)
              })
            ids.sort((a, b) => b - a)
            const firstID = ids[ids.length - 1]

            for (const id of ids) {
              this.lineBroker.deleteLine(id)
            }

            this.lineBroker.loadDatatable()
            this.lineBroker.selectDatatableRow(firstID)
          }
        },
        preventDefault: false
      },
      // Insert Line After: insert (on first selected datatable line)
      {
        key: 'ins',
        command: e => {
          const event = e.event
          const targetElem = e.event.target as HTMLBodyElement
          if (targetElem.nodeName && targetElem.nodeName === 'BODY' && !event.shiftKey) {
            e.event.preventDefault()
            const dt = this.lineBroker.getDatatableInstance()
            let firstID: number = null
            dt.rows({ selected: true })
              .data()
              .each((row: (string | number)[]) => {
                // insert after first selected row
                if (firstID === null) {
                  firstID = row[0] as number
                }
              })

            this.lineBroker.insertBlankLine(firstID)
            this.lineBroker.loadDatatable()
            this.lineBroker.selectDatatableRow(firstID + 1)
          }
        },
        preventDefault: false
      },
      // Insert Line Before: shift + insert (on first selected datatable line)
      {
        key: 'shift + ins',
        command: e => {
          const targetElem = e.event.target as HTMLBodyElement
          if (targetElem.nodeName && targetElem.nodeName === 'BODY') {
            e.event.preventDefault()
            const dt = this.lineBroker.getDatatableInstance()
            let firstID: number = null
            dt.rows({ selected: true })
              .data()
              .each((row: (string | number)[]) => {
                // insert before first selected row
                if (firstID === null) {
                  firstID = row[0] as number
                }
              })

            this.lineBroker.insertBlankLine(firstID, true)
            this.lineBroker.loadDatatable()
            const selectID = firstID - 1 < 0 ? 0 : firstID - 1
            this.lineBroker.selectDatatableRow(selectID)
          }
        },
        preventDefault: false
      }
    )
  }

  public saveLine() {
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

  public deleteLine() {
    this.lineBroker.deleteLine(parseInt(this.lineNumber))
    this.lineBroker.loadDatatable()
    this.lineBroker.selectDatatableRow(parseInt(this.lineNumber))
  }
}

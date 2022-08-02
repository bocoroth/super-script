import { invoke } from '@tauri-apps/api'
import { App } from '../../App'

import { DOMComponent } from '../../interfaces/DOMComponent.interface'
import { FontFamily } from '../../interfaces/FontFamily.interface'

import { editBoxTemplate } from './EditBox.template'

import * as tinymce from 'tinymce'

import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom/model'

import 'tinymce/plugins/code'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'

export class EditBox implements DOMComponent {
  selector: string
  readonly className = 'editbox-component'

  constructor (selector = '#editbox') {
    this.selector = selector
  }

  public async load () {
    const editBoxElement = document.querySelector<HTMLDivElement>(this.selector)
    editBoxElement!.innerHTML = editBoxTemplate
    editBoxElement!.classList.add(this.className)

    let response

    try {
      response = await invoke('get_system_fonts')
    } catch (e) {
      console.error('Error loading system fonts.')
      console.error(e)
    }

    // clean up response into a useable JSON string here because I don't
    // really understand how Rust variables work
    let fontFamilies: FontFamily[]

    let fontsRaw = response as string || 'error'
    fontsRaw = fontsRaw.replace(/FaceInfo\s?/g, '')
    fontsRaw = fontsRaw.replace(/\s?File\(".*?"\)/g, '"file"')
    fontsRaw = fontsRaw.replace(/\s?ID\((.*?)\)/g, '$1')
    fontsRaw = fontsRaw.replace(/\s?Weight\((.*?)\)/g, '$1')
    fontsRaw = fontsRaw.replace(/{\s?/g, '{"')
    fontsRaw = fontsRaw.replace(/:\s?/g, '": ')
    fontsRaw = fontsRaw.replace(/,\s?/g, ', "')
    fontsRaw = fontsRaw.replace(/,\s?"\{/g, ', {')
    fontsRaw = fontsRaw.replace(/,\s?"style":\s?(.*?),/g, ', "style": "$1",')
    fontsRaw = fontsRaw.replace(/,\s?"stretch":\s?(.*?),/g, ', "stretch": "$1",')

    fontFamilies = [
      { family: 'Arial', monospaced: false },
      { family: 'Courier New', monospaced: true }
    ]

    try {
      fontFamilies = JSON.parse(fontsRaw)
    } catch (e) {}

    const fontStrings: string[] = []

    for (const family of fontFamilies) {
      let fontString = `${family.family}='${family.family.toLowerCase()}'`

      if (family.monospaced) {
        fontString += ', monospace'
      } else {
        fontString += ', sans-serif'
      }

      if (!fontStrings.includes(fontString)) { // tease out duplicates
        fontStrings.push(fontString)
      }
    }

    const fonts = fontStrings.join('; ')

    try {
      // this works fine, but typescript is complaining that init doesn't exist, so...
      // @ts-ignore
      tinymce.init({
        branding: false,
        elementpath: false,
        height: 125,
        font_family_formats: fonts,
        font_size_formats: '6pt 8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 64pt 72pt',
        menubar: false,
        plugins: ['code', 'image', 'media'],
        selector: 'textarea#tinymce',
        skin: false,
        theme: 'silver',
        toolbar: 'undo redo | copy cut paste selectall remove removeformat ' +
        '| blocks fontfamily fontsize forecolor backcolor | bold italic ' +
        'underline strikethrough subscript superscript | alignleft ' +
        'aligncenter alignright alignjustify | image media | code'
      })
    } catch (e) {
      console.error('Could not load TinyMCE.')
      console.error(e)
    }

    App.debugLog('EditBox loaded.')
  }
}

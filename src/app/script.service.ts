import { Injectable } from '@angular/core'
import { Script } from './script.interface'
import { ScriptLine } from './script-line.interface'
import { ScriptMeta } from './script-meta.interface'

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private script: Script

  constructor() {}

  public getScript(): Script {
    return this.script
  }

  public setScript(script: Script): Script {
    this.script = script
    this.reNumberScript()
    return this.script
  }

  public scriptToJSON(): string {
    const json = JSON.stringify(this.script)
    return json
  }

  public setMeta(meta: ScriptMeta) {
    if (this.script) {
      this.script.meta = meta
    }
  }

  public setMetaStyles(styles: string): void {
    if (this.script) {
      this.script.meta.css = styles
    }
  }

  public getMetaStyles(): string {
    return this.script.meta.css || ''
  }

  public getLine(id: number): ScriptLine {
    return this.script.text[id]
  }

  public addLine(line: ScriptLine) {
    const id = this.script.text.length
    line.id = id
    if (Number.isNaN(+line.durationMS)) {
      line.durationMS = 0
    }
    this.script.text.push(line)
    this.reNumberScript()
  }

  public insertBlankLine(insertAtID: number = null, insertBefore = false) {
    if (insertAtID === null) {
      insertAtID = this.script.text.length

      const line: ScriptLine = {
        id: insertAtID,
        startTime: '',
        endTime: '',
        durationMS: 0,
        cssClass: '',
        text: ''
      }
      this.script.text.push(line)
    } else {
      let insertID: number
      if (insertBefore === true) {
        insertID = insertAtID - 0.5 // decrement 0.5 to preserve order during sort
      } else {
        insertID = insertAtID + 0.5 // increment 0.5 to preserve order during sort
      }

      if (insertID < 0) {
        insertAtID = 0
      }

      const line: ScriptLine = {
        id: insertID,
        startTime: '',
        endTime: '',
        durationMS: 0,
        cssClass: '',
        text: ''
      }

      if (insertBefore === false) {
        this.script.text.splice(insertAtID + 1, 0, line)
      } else {
        this.script.text.splice(insertAtID, 0, line)
      }
    }
    this.reNumberScript()
  }

  public editLine(line: ScriptLine) {
    const id = line.id
    this.script.text[id] = line
    this.reNumberScript()
  }

  public deleteLine(lineNumber: number) {
    const ret = this.script.text.splice(lineNumber, 1)
    this.reNumberScript()
    return ret
  }

  private reNumberScript() {
    this.script.text.sort((a, b) => a.id - b.id)

    let i = 0
    let duration = 0
    for (const line of this.script.text) {
      line.id = i
      line.startTime = this.msToTimeCode(duration)
      duration += line.durationMS
      line.endTime = this.msToTimeCode(duration)
      i++
    }
  }

  private msToTimeCode(ms: number): string {
    let timecode = ''

    const hrs = Math.floor(ms / (1000 * 60 * 60))
    timecode += hrs.toString().padStart(2, '0') + ':'
    ms = ms - 1000 * 60 * 60 * hrs

    const mins = Math.floor(ms / (1000 * 60))
    timecode += mins.toString().padStart(2, '0') + ':'
    ms = ms - 1000 * 60 * mins

    const secs = Math.floor(ms / 1000)
    timecode += secs.toString().padStart(2, '0') + '.'
    ms = ms - 1000 * secs

    timecode += ms.toString().padStart(3, '0')

    return timecode
  }
}

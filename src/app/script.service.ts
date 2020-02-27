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

  public static JSONToScript(json: string): Script {
    const script: Script = JSON.parse(json)
    return script
  }

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
    this.script.meta = meta
  }

  public addLine(line: ScriptLine) {
    const id = this.script.text.length
    line.id = id
    this.script.text.push(line)
    this.reNumberScript()
  }

  public insertBlankLine(beforeID: number = null) {
    if (beforeID === null) {
      beforeID = this.script.text.length

      const line: ScriptLine = {
        id: beforeID,
        startTime: '',
        endTime: '',
        durationMS: 0,
        cssClass: '',
        text: ''
      }
      this.script.text.push(line)
    } else {
      const insertID = beforeID + 0.5 // increment 0.5 to preserve order during sort

      const line: ScriptLine = {
        id: insertID,
        startTime: '',
        endTime: '',
        durationMS: 0,
        cssClass: '',
        text: ''
      }

      this.script.text.splice(beforeID, 0, line)
    }
    this.reNumberScript()
  }

  public editLine(line: ScriptLine) {
    const id = line.id
    this.script.text[id] = line
    this.reNumberScript()
  }

  public deleteLine(lineNumber: number) {
    this.script.text.splice(lineNumber, 1)
    this.reNumberScript()
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

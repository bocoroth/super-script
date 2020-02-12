import { Injectable } from '@angular/core'
//import { Script } from './script.interface'
//import { ScriptLine } from './script-line.interface'
//import { ScriptMeta } from './script-meta.interface'

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  //private script: Script

  constructor(/*script: Script = null*/) {
    /*if (script === null) {
      const newScript: Script = {
        meta: {},
        text: []
      }
      this.script = newScript
    } else {
      this.script = script
      this.reNumberScript()
    }*/
  }

  /*public static JSONToScript(json: string): Script {
    const script: Script = JSON.parse(json)
    return script
  }

  public getScript(): Script {
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
  }

  public insertBlankLine(beforeID: number = null) {
    if (beforeID === null) {
      beforeID = this.script.text.length

      const line: ScriptLine = {
        id: beforeID,
        startTime: '',
        endTime: '',
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
  }

  public deleteLine(line: ScriptLine) {
    const id = line.id
    this.script.text.splice(id, 1)
    this.reNumberScript()
  }

  private reNumberScript() {
    this.script.text.sort((a, b) => a.id - b.id)

    let i = 0
    for (const line of this.script.text) {
      line.id = i
      i++
    }
  }*/
}

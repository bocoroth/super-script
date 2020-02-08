import { Injectable } from '@angular/core'
import { Script } from './script.interface'
import { ScriptLine } from './script-line.interface'
import { ScriptMeta } from './script-meta.interface'

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private script: Script

  public static JSONToScript(json: string): Script {
    const script: Script = JSON.parse(json)
    return script
  }

  constructor(script: Script = null) {
    if (script === null) {
      const newScript: Script = {
        meta: {},
        text: []
      }
      this.script = newScript
    } else {
      this.script = script
    }
  }

  public getScript(): Script {
    return this.script
  }

  public scriptToJSON(): string {
    const json = JSON.stringify(this.script)
    return json
  }

  setMeta(meta: ScriptMeta) {
    this.script.meta = meta
  }

  addLine(line: ScriptLine) {}

  editLine(line: ScriptLine) {}
}

import { ScriptLine } from './script-line.interface'
import { ScriptMeta } from './script-meta.interface'

export interface Script {
  meta: ScriptMeta
  text: ScriptLine[]
}

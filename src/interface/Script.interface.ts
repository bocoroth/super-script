import { ScriptLine } from './ScriptLine.interface'
import { ScriptMeta } from './ScriptMeta.interface'

export interface Script {
  meta: ScriptMeta
  text: ScriptLine[]
}

import { ScriptLine } from './script-line.interface'

export interface Script {
  workTitle?: string
  authorName?: string
  composerName?: string
  editorName?: string
  dateCreated?: string
  dateModified?: string
  performanceNotes?: string
  text: ScriptLine[]
}

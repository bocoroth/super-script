import debugMode from '../../App.vue'

export class Util {
  public static debugLog(...messages: any): string {
    let log = ''
    if (debugMode) {
      const now = new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' UTC')

      log = [`[${now}]`, ...messages].join(' ')

      console.debug(log)
    }

    return log
  }
}
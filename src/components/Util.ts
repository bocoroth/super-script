export class Util {
  private static debugMode = false

  public static setDebugMode(enabled: boolean): void {
    this.debugMode = enabled
  }

  public static debugLog(...messages: any): string {
    let log = ''
    if (this.debugMode) {
      const now = new Date().toISOString().replace('T', ' ').replace('Z', ' UTC')

      log = [`[${now}]`, ...messages].join(' ')

      console.debug(log)
    }

    return log
  }
}

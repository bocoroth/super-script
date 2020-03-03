import { Injectable } from '@angular/core'
import { Setting } from './setting.interface'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Setting[] = []

  constructor() {}

  // TODO: auto-saving feature
  // TODO: custom hotkeys
  // TODO: monitor output box sizing / reference border

  public loadLocalSettings(): void {
    let loadedSettings: Setting[] = []
    for (const key in localStorage) {
      if (key.startsWith('ht-setting-')) {
        const name = key.slice(11)
        let setting: Setting = {}
        setting[`${name}`] = localStorage.getItem(key)
        loadedSettings.push(setting)
      }
    }
    this.settings = loadedSettings
  }

  public saveSetting(name: string, value: string): void {
    let setting: Setting = {}
    setting[`${name}`] = value
    this.settings.push(setting)
    localStorage.setItem(`ht-setting-${name}`, value)
  }

  public getSetting(name: string): string {
    if (this.settings) {
      for (const setting of this.settings) {
        if (setting.hasOwnProperty(name)) {
          return setting[`${name}`]
        }
      }
    }
    return null
  }

  public exportSettings(): Setting[] {
    return this.settings
  }

  public importSettings(settings: Setting[]): void {
    this.settings = settings
  }
}

import { test, expect, describe } from 'vitest'
import { Util } from './Util'

describe('Running Util tests...', () => {
  test('Debug logging', () => {
    // Debug mode off
    Util.setDebugMode(false)
    let msg = Util.debugLog('msg')
    expect(msg).toBe('')

    // Debug mode on
    Util.setDebugMode(true)
    msg = Util.debugLog('msg')
    // match a pattern like '[1970-01-01 00:00:00.000 UTC] msg'
    expect(msg).toMatch(/^\[\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}\.\d{3}\sUTC\]\smsg$/)
  })
})

import type { Instrument } from '../entities'
import instrumentsData from './instruments.json'

/**
 * Возвращает список валют из предварительно загруженных данных
 * При необходимости можно ограничить количество возвращаемых валют
 */
export function generateInstruments(count?: number): Instrument[] {
  // Если count не указан или больше количества имеющихся валют, вернуть все валюты
  if (!count || count >= instrumentsData.length) {
    return instrumentsData as Instrument[]
  }

  // В противном случае вернуть только указанное количество валют
  return instrumentsData.slice(0, count) as Instrument[]
}

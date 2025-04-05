import type { Country } from '../entities'
import countriesData from './countries.json'

/**
 * Возвращает список компаний (банков) из предварительно загруженных данных
 * Всегда возвращает полный список компаний независимо от параметра count
 */
export function generateCountries(): Country[] {
  // Всегда возвращать все компании
  return countriesData as Country[]
}

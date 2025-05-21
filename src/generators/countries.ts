import type { Country } from '../entities'
import countriesData from './countries.json'

/**
 * Возвращает список стран из предварительно загруженных данных
 * Всегда возвращает полный список стран независимо от параметра count
 */
export function generateCountries(): Country[] {
  // Всегда возвращать все страны
  return countriesData as Country[]
}

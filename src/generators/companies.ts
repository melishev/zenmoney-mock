import type { Organization } from '../entities'
import companiesData from './companies.json'

/**
 * Возвращает список компаний (банков) из предварительно загруженных данных
 * Всегда возвращает полный список компаний независимо от параметра count
 */
export function generateCompanies(): Organization[] {
  // Всегда возвращать все компании
  return companiesData as Organization[]
}

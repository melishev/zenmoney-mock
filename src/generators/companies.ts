import type { Organization } from '../entities'
import companiesData from './companies.json'

/**
 * Возвращает список компаний (банков) из предварительно загруженных данных
 * При необходимости можно ограничить количество возвращаемых компаний
 */
export function generateCompanies(count?: number): Organization[] {
  // Если count не указан или больше количества имеющихся компаний, вернуть все компании
  if (!count || count >= companiesData.length) {
    return companiesData as Organization[]
  }

  // В противном случае вернуть только указанное количество компаний
  return companiesData.slice(0, count) as Organization[]
}

import { faker } from '@faker-js/faker'

import type { Organization } from '../entities'

/**
 * Генерирует список компаний (банков)
 */
export function generateCompanies(count: number): Organization[] {
  const companies: Organization[] = []

  for (let i = 0; i < count; i++) {
    const companyName = faker.company.name()
    companies.push({
      id: i + 1,
      changed: Date.now(),
      title: companyName,
      fullTitle: `${companyName} ${faker.company.buzzPhrase()}`,
      www: faker.internet.url(),
      country: faker.location.country(),
    })
  }

  return companies
}

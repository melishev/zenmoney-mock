import { faker } from '@faker-js/faker'

import type { Account, Category, Merchant, Transaction, User } from '../entities'

/**
 * Генерирует список транзакций
 */
export function generateTransactions(
  users: User[],
  accounts: Account[],
  merchants: Merchant[],
  categories: Category[],
  transactionsPerUser: number,
): Transaction[] {
  const transactions: Transaction[] = []

  users.forEach((user) => {
    const userAccounts = accounts.filter((account) => account.user === user.id)
    const userCategories = categories.filter((category) => category.user === user.id)
    const userMerchants = merchants.filter((merchant) => merchant.user === user.id)

    for (let i = 0; i < transactionsPerUser; i++) {
      const isIncome = faker.datatype.boolean()
      const account = faker.helpers.arrayElement(userAccounts)
      let secondAccount: Account | null = null

      // 30% шанс, что это будет перевод между счетами
      const isTransfer = faker.number.int({ min: 1, max: 10 }) <= 3
      if (isTransfer && userAccounts.length > 1) {
        // Выбираем другой счет для перевода
        do {
          secondAccount = faker.helpers.arrayElement(userAccounts)
        } while (secondAccount && secondAccount.id === account.id)
      }

      const amount = faker.number.float({ min: 10, max: 50000, fractionDigits: 2 })

      // Генерируем дату в пределах последнего года
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      const recentDate = faker.date.between({ from: oneYearAgo, to: new Date() })
      const date = recentDate.toISOString().split('T')[0] // Формат 'YYYY-MM-DD'

      // Для поля tag используем реальные категории пользователя
      // В 70% случаев будет одна категория, в 20% - две, в 10% - null
      let tagsArray: string[] | null = null

      if (userCategories.length > 0) {
        const tagChance = faker.number.int({ min: 1, max: 10 })

        if (tagChance <= 7) {
          // 70% случаев - одна категория
          tagsArray = [faker.helpers.arrayElement(userCategories).id]
        } else if (tagChance <= 9 && userCategories.length >= 2) {
          // 20% случаев - две категории (если есть хотя бы 2 категории)
          const firstCategory = faker.helpers.arrayElement(userCategories)
          let secondCategory

          do {
            secondCategory = faker.helpers.arrayElement(userCategories)
          } while (secondCategory.id === firstCategory.id)

          tagsArray = [firstCategory.id, secondCategory.id]
        }
        // 10% случаев - null (отсутствие категории)
      }

      const transaction: Transaction = {
        id: crypto.randomUUID(),
        user: user.id,
        date,
        income: isIncome || isTransfer ? amount : 0,
        outcome: !isIncome || isTransfer ? amount : 0,
        changed: Date.now(),
        incomeInstrument: isTransfer ? secondAccount?.instrument || account.instrument : account.instrument,
        outcomeInstrument: account.instrument,
        created: Date.now() - faker.number.int({ min: 0, max: 7 * 24 * 60 * 60 * 1000 }),
        originalPayee: null,
        deleted: false,
        viewed: faker.datatype.boolean(),
        hold: faker.datatype.boolean(),
        qrCode: null,
        source: null,
        incomeAccount: isTransfer ? secondAccount?.id || account.id : account.id,
        outcomeAccount: account.id,
        tag: tagsArray,
        comment: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        payee: isIncome && !isTransfer ? faker.company.name() : null,
        opIncome: null,
        opOutcome: null,
        opIncomeInstrument: null,
        opOutcomeInstrument: null,
        latitude: null,
        longitude: null,
        merchant:
          faker.datatype.boolean() && !isTransfer
            ? userMerchants.length > 0
              ? faker.helpers.arrayElement(userMerchants).id
              : null
            : null,
        incomeBankID: null,
        outcomeBankID: null,
        reminderMarker: null,
      }

      transactions.push(transaction)
    }
  })

  return transactions
}

import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

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
    // Фильтруем счета, категории и получателей для текущего пользователя
    const userAccounts = accounts.filter((account) => account.user === user.id)
    const userCategories = categories.filter((category) => category.user === user.id)
    const userMerchants = merchants.filter((merchant) => merchant.user === user.id)
    
    // Генерируем транзакции для пользователя
    for (let i = 0; i < transactionsPerUser; i++) {
      const isTransfer = faker.datatype.boolean() && userAccounts.length > 1
      const isIncome = !isTransfer && faker.datatype.boolean()
      const isOutcome = !isTransfer && !isIncome
      
      // Выбираем случайные счета
      const accountFrom = isTransfer || isOutcome ? 
        faker.helpers.arrayElement(userAccounts) : 
        null
      
      const accountTo = isTransfer || isIncome ? 
        isTransfer ? 
          // Для перевода выбираем другой счет
          faker.helpers.arrayElement(
            userAccounts.filter(acc => acc.id !== (accountFrom?.id || ''))
          ) : 
          faker.helpers.arrayElement(userAccounts) : 
        null
      
      // Сумма транзакции
      const amount = faker.number.float({ min: 10, max: 10000, fractionDigits: 2 })
      
      // Дата транзакции в пределах последних 30 дней
      const transactionDate = faker.date.recent({ days: 30 })
      
      // Базовая транзакция
      const transaction: Transaction = {
        id: uuidv4(),
        changed: Date.now(),
        created: transactionDate.getTime(),
        user: user.id,
        deleted: false,
        date: transactionDate.toISOString().split('T')[0], // Форматируем дату как YYYY-MM-DD
        
        // Приход
        incomeAccount: (accountTo?.id || '') as string,
        incomeInstrument: (accountTo?.instrument || 1) as number,
        income: isTransfer || isIncome ? amount : 0,
        
        // Расход
        outcomeAccount: (accountFrom?.id || '') as string,
        outcomeInstrument: (accountFrom?.instrument || 1) as number,
        outcome: isTransfer || isOutcome ? amount : 0,
      }
      
      // Добавляем дополнительные поля в зависимости от типа транзакции
      if (isIncome || isOutcome) {
        // Для доходов и расходов добавляем категорию
        if (userCategories.length > 0) {
          transaction.tag = [faker.helpers.arrayElement(userCategories).id]
        }
        
        // Для расходов добавляем мерчанта
        if (isOutcome && userMerchants.length > 0 && faker.datatype.boolean()) {
          const merchant = faker.helpers.arrayElement(userMerchants)
          transaction.merchant = merchant.id
          transaction.payee = merchant.title
        } else if (isOutcome) {
          // Иногда добавляем просто название магазина без привязки к мерчанту
          transaction.payee = faker.company.name()
        }
        
        // Добавляем комментарий с некоторой вероятностью
        if (faker.datatype.boolean(0.6)) {
          transaction.comment = faker.lorem.sentence(3)
        }
        
        // Добавляем MCC код для операций по банковской карте
        if (isOutcome && accountFrom?.type === 'ccard' && faker.datatype.boolean(0.8)) {
          transaction.mcc = faker.helpers.arrayElement([
            5411, // Супермаркеты
            5812, // Рестораны
            5921, // Алкоголь
            5542, // Заправки
            4121, // Такси
            5814, // Фастфуд
            5311, // Универмаги
            5499, // Продуктовые
            7832, // Кинотеатры
            5912  // Аптеки
          ])
        }
      }
      
      transactions.push(transaction)
    }
  })
  
  return transactions
}

import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionListDTO {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionListDTO {
    // criar um objeto com transactions : lista de transacoes e de balance : balanco de todas as trans
    const transactions = this.transactions;
    const balance = this.getBalance();
    const transactionList = { transactions, balance };

    // retorna o objeto
    return transactionList;
  }

  public getBalance() : Balance {
    const income = this.transactions.reduce((total, transaction) => {
      if (transaction.type == 'income') {
        return total + transaction.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      if (transaction.type == 'outcome') {
        return total + transaction.value;
      }
      return total;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  // send it to service verify our rules and then deliver a new transaction created
  public create({ title, value, type } : CreateTransactionDTO) : Transaction {
    // create dto first

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

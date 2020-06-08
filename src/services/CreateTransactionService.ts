import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type } : RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    // keep in mind that you must add it to the balance before you test it
    const total = type === 'income' ? balance.total + value : balance.total - value;

    // you can only create a transaction if you have positive balance
    if (total < 0) {
      throw Error('Not enough resources!')
    }

    // to create a transaction you must send it to the repository because it knows how to do it!
    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;

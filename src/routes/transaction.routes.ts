import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';


const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
  // get all transactions
    const transactions = transactionsRepository.all();
    return response.json(transactions);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // get data off request
    const { title, value, type } = request.body;

    // create a new transaction service that sends our repository as an argument
    const createTransaction = new CreateTransactionService(transactionsRepository);

    // post a transactions - use service!
    const transaction = createTransaction.execute({ title, value, type });

    return response.json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

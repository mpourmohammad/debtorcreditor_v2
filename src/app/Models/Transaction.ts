import { Users } from './Users';

export class Transaction {
  id: any;
  amount: any;
  description: any;
  transaction_Date: any;
  isClearing: any;
  isDebtor: any;
  created_Date: any;
  updated_Date: any;
  userId: any;
  users!: Users[];
}

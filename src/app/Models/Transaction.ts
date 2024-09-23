import { Users } from './Users';

export class Transaction {
  id: any;
  
  amount: any;            // مبلغ
  description: any;       // توضیحات
  transaction_Date: any;  // تاریخ
  isClearing: any;        // وضعیت پرداخت
  isDebtor: any;          // وضعیت بدهکاری
  created_Date: any;      // تاریخ ثبت
  updated_Date: any;      // تاریخ بروزرسانی
  userId: any;            // کاربر
  users!: Users[];        // کاربران
}

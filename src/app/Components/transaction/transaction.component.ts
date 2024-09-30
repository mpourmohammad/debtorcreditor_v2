import { Component } from '@angular/core';
import { Transactions } from '../../Models/Transaction';
import { AppModule } from '../../app.module';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Users } from '../../Models/Users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [AppModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {

  checkoutForm!: FormGroup;
  checkoutFormDel!: FormGroup;
  transactionDialog!: boolean;

  transactions!: Transactions[];
  transaction!: Transactions;
  selecttransactions!: Transactions[];

  cols!: any[];
  sumDebtor!: any;
  sumCreditor!: any;

  btnUpdate: boolean = false;
  AllUsers!: Users[];

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      isDebtor: ['', Validators.required],
      transaction_Date: ['', Validators.required],
      isClearing: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.transaction = new Transactions();

    // getAllUsers
    this.apiService.getAllUsers().then(data => {
      if (data !== undefined) {
        if (data.length !== 0) {
          this.AllUsers = data;
        }
      }
    });

    this.cols = [
      { field: 'id', header: 'شناسه تراکنش' },
      { field: 'amount', header: 'مبلغ' },
      { field: 'description', header: 'توضیحات تکمیلی' },
      { field: 'transaction_Date', header: 'تاریخ تراکنش' },
      { field: 'isClearing', header: 'تسویه شده' },
      { field: 'isDebtor', header: 'بدهکار یا بستانکار' },
      { field: 'created_Date', header: 'تاریخ ثبت تراکنش' },
      { field: 'updated_Date', header: 'تاریخ آخرین به روز رسانی ترانکش' },
      { field: 'userId', header: 'شناسه کاربر' },
      { field: 'users', header: 'کاربر' },
    ];

    this.apiService.getTransactions().then((data) => {
      if (data !== undefined) {
        this.transactions = data;
        if (this.transactions.length !== 0) {
          // Sum Amount
          this.sumDebtor = this.transactions
            .filter((item) => item.isDebtor !== 0)
            .reduce((sum, current) => sum + current.amount, 0);

          this.sumCreditor = this.transactions
            .filter((item) => item.isDebtor === 0)
            .reduce((sum, current) => sum + current.amount, 0);
        }
      }
    });
  }

  filter() { }
  onSubmit(event: Event) {
    const transaction = this.checkoutForm.value;

    if (this.btnUpdate === true) {
      this.updateTransactions(transaction);
    } else {
      this.addTransactions(transaction);
    }
    this.checkoutForm.reset();
  }
  updateTransactions(transaction: any) {
    throw new Error('Method not implemented.');
  }

  showDialog() {
    this.transaction = new Transactions();
    this.transactionDialog = true;
  }

  addTransactions(transactions: Transactions) {
    this.apiService.addTransactions(transactions).then(data => {
      if (data !== undefined) {
        this.messageService.add({
          severity: 'success',
          summary: 'اطلاعات تراکنش با موفقیت ثبت شد',
          detail: 'اطلاعات تراکنش با موفقیت ثبت شد',
          life: 3000,
        });
        this.router.navigate(['/']);
      }
    });
  }
}

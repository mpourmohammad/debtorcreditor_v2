import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../Models/Transaction';
import { AppModule } from '../../app.module';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Users } from '../../Models/Users';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [TableModule, CommonModule, AppModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {
  getUsers!: Users[];
  getRoles!: Users[];

  checkoutForm!: FormGroup;
  haghighiDialog!: boolean;

  transactions!: Transaction[];
  transaction!: Transaction;
  selectGetCalcs!: Transaction[];

  cols!: any[];
  sumDebtor!: any;
  sumCreditor!: any;

  constructor(
    private apiService: ApiService,
  ) {

  }

  ngOnInit() {
    this.haghighiDialog = true;
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

    this.apiService.getUsers().then((data) => {
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

  onFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
  }
  openNew() {}
  filter() {}
  onSubmit(a: any) {}
}

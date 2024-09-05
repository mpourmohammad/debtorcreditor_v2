import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transaction } from '../Models/Transaction';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [TableModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {
  transactions!: Transaction[];

  cols!: any[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'amount', header: 'amount' },
      { field: 'description', header: 'description' },
      { field: 'transaction_Date', header: 'transaction_Date' },
      { field: 'isClearing', header: 'isClearing' },
      { field: 'isDebtor', header: 'isDebtor' },
      { field: 'created_Date', header: 'created_Date' },
      { field: 'updated_Date', header: 'updated_Date' },
      { field: 'userId', header: 'userId' },
      { field: 'users', header: 'users' },
    ];

    this.apiService.getUsers().then((data) => {
      debugger;
      this.transactions = data;
    });
  }
}

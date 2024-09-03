import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transaction } from '../Models/Transaction';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [TableModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  transactions!: Transaction[];

  cols!: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'name' },
      { field: 'company', header: 'company' },
      { field: 'username', header: 'username' },
      { field: 'email', header: 'email' }
    ];

    this.apiService.getUsers().then(data => {
      debugger;
      this.transactions = data;
    });
  }
}

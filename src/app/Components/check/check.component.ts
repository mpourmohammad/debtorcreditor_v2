import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from 'express';
import moment from 'jalali-moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Transactions } from '../../Models/Transaction';
import { Users } from '../../Models/Users';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [AppModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss'
})
export class CheckComponent implements OnInit {
  checkoutForm!: FormGroup;
  transactionDialog: boolean = false;
  transactions: Transactions[] = [];
  transaction: Transactions = new Transactions();
  selectedTransactions: Transactions[] = [];
  hideFilter: boolean = true;

  sumDebtor: number = 0;
  sumCreditor: number = 0;

  isUpdate: boolean = false;
  allUsers: Users[] = [];

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
    this.loadTransactions();
  }

  initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      isDebtor: ['', Validators.required],
      transaction_Date: ['', Validators.required],
      isClearing: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  getValue(nameField: string, event: Event): string {
    debugger;
    const inputElement = event.target as HTMLInputElement;

    this.apiService.searchTransactions(nameField, inputElement.value).then((res) => {
      this.transactions = res;
    });
    return inputElement.value;
  }

  async loadUsers(): Promise<void> {
    try {
      const data = await this.apiService.getAllUsers();
      if (data?.length) {
        this.allUsers = data;
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async loadTransactions(): Promise<void> {
    try {
      const data = await this.apiService.getTransactions();
      if (data?.length) {
        this.transactions = data;
        this.calculateSums();
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  }

  calculateSums(): void {
    this.sumDebtor = this.transactions
      .filter(item => item.isDebtor !== 0)
      .reduce((sum, current) => sum + current.amount, 0);

    this.sumCreditor = this.transactions
      .filter(item => item.isDebtor === 0)
      .reduce((sum, current) => sum + current.amount, 0);
  }

  toggleFilter(): void {
    this.hideFilter = !this.hideFilter;
  }

  async onSubmit(): Promise<void> {
    const transactionData = this.checkoutForm.value;
    transactionData.transaction_Date = moment(transactionData.transaction_Date, 'YYYY-MM-DD').format('YYYY-MM-DD');

    if (this.isUpdate) {
      await this.updateTransaction(transactionData);
    } else {
      await this.addTransaction(transactionData);
    }
  }

  async addTransaction(transaction: Transactions): Promise<void> {
    try {
      await this.apiService.addTransactions(transaction);
      this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'حساب ثبت شد' });
      await this.loadTransactions();
      this.closeDialog();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.messageService.add({ severity: 'error', summary: 'خطا', detail: error.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'An unknown error occurred' });
      }
    }
  }

  async updateTransaction(transaction: Transactions): Promise<void> {
    try {
      transaction.id = this.transaction.id;
      await this.apiService.updateTransactions(transaction);
      this.messageService.add({ severity: 'success', summary: 'انجام شد', detail: 'حساب بروز شد' });
      await this.loadTransactions();
      this.closeDialog();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.messageService.add({ severity: 'error', summary: 'خطا', detail: error.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'An unknown error occurred' });
      }
    }
  }
  editTransaction(transaction: Transactions): void {
    this.isUpdate = true;
    this.transaction = { ...transaction };
    this.transactionDialog = true;
  }

  async deleteTransaction(transaction: Transactions): Promise<void> {
    this.confirmationService.confirm({
      message: 'آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟',
      header: 'تأیید حذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      accept: async () => {
        try {
          await this.apiService.deleteTransaction(transaction.id);
          this.messageService.add({ severity: 'success', summary: 'حذف شد', detail: 'آیتم حذف شد' });
          await this.loadTransactions();
        } catch (error: unknown) {
          if (error instanceof Error) {
            this.messageService.add({ severity: 'error', summary: 'خطا', detail: error.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'An unknown error occurred' });
          }
        }
      }, reject: () => {
        this.messageService.add({ severity: 'info', summary: 'لغو شد', detail: 'عملیات حذف لغو شد' });
      }
    });
  }

  showDialog(): void {
    this.transaction = new Transactions();
    this.isUpdate = false;
    this.transactionDialog = true;
  }

  closeDialog(): void {
    this.transactionDialog = false;
    this.transaction = new Transactions();
  }

  trackById(index: number, item: Transactions): number {
    return item.id;
  }
}
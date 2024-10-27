import { Component, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from 'express';
import moment from 'jalali-moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Users } from '../../Models/Users';
import { ApiService } from '../../Services/api.service';
import { Checks } from '../../Models/Checks';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [AppModule],
  templateUrl: './check.component.html',
  styleUrl: './check.component.scss',
})
export class CheckComponent implements OnInit {
  checkoutForm!: FormGroup;
  checkDialog: boolean = false;
  checks: Checks[] = [];
  check: Checks = new Checks();
  selectedChecks: Checks[] = [];
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
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
    this.loadChecks();
  }

  initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      due_Date: ['', Validators.required],
      serial: ['', Validators.required],
      status: ['', Validators.required],
      userId: ['', Validators.required],
    });
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

  async loadChecks(): Promise<void> {
    debugger;
    try {
      const data = await this.apiService.getChecks();
      if (data?.length) {
        this.checks = data;
        //this.calculateSums();
      }
    } catch (error) {
      console.error('Error loading checks:', error);
    }
  }

  // calculateSums(): void {
  //   this.sumDebtor = this.checks
  //     .filter(item => item.isDebtor !== 0)
  //     .reduce((sum, current) => sum + current.amount, 0);

  //   this.sumCreditor = this.checks
  //     .filter(item => item.isDebtor === 0)
  //     .reduce((sum, current) => sum + current.amount, 0);
  // }

  toggleFilter(): void {
    this.hideFilter = !this.hideFilter;
  }

  async onSubmit(): Promise<void> {
    debugger;
    const checkData = this.checkoutForm.value;
    checkData.due_Date = moment(
      checkData.due_Date,
      'YYYY-MM-DD'
    )
      .locale('cs')
      .format('YYYY-MM-DD');

    if (this.isUpdate) {
      await this.updateCheck(checkData);
    } else {
      await this.addCheck(checkData);
    }
  }

  async addCheck(check: Checks): Promise<void> {
    try {
      await this.apiService.addChecks(check);
      this.messageService.add({
        severity: 'success',
        summary: 'انجام شد',
        detail: 'حساب ثبت شد',
      });
      await this.loadChecks();
      this.closeDialog();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: error.message,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: 'An unknown error occurred',
        });
      }
    }
  }

  async updateCheck(check: Checks): Promise<void> {
    try {
      check.id = this.check.id;
      await this.apiService.updateChecks(check);
      this.messageService.add({
        severity: 'success',
        summary: 'انجام شد',
        detail: 'حساب بروز شد',
      });
      await this.loadChecks();
      this.closeDialog();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: error.message,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: 'An unknown error occurred',
        });
      }
    }
  }
  editCheck(check: Checks): void {
    this.isUpdate = true;
    this.check = { ...check };
    this.checkDialog = true;
  }

  async deleteCheck(check: Checks): Promise<void> {
    this.confirmationService.confirm({
      message: 'آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟',
      header: 'تأیید حذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      accept: async () => {
        try {
          await this.apiService.deleteCheck(check.id);
          this.messageService.add({
            severity: 'success',
            summary: 'حذف شد',
            detail: 'آیتم حذف شد',
          });
          await this.loadChecks();
        } catch (error: unknown) {
          if (error instanceof Error) {
            this.messageService.add({
              severity: 'error',
              summary: 'خطا',
              detail: error.message,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'خطا',
              detail: 'An unknown error occurred',
            });
          }
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'لغو شد',
          detail: 'عملیات حذف لغو شد',
        });
      },
    });
  }

  showDialog(): void {
    this.check = new Checks();
    this.isUpdate = false;
    this.checkDialog = true;
  }

  closeDialog(): void {
    this.checkDialog = false;
    this.check = new Checks();
  }

  trackById(index: number, item: Checks): number {
    return item.id;
  }
}

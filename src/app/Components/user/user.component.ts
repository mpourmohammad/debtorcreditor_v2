import { Component, OnInit } from '@angular/core';
import { Users } from '../../Models/Users';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from '../../Services/api.service';
import moment from 'jalali-moment';
import { AppModule } from '../../app.module';
import { Roles } from '../../Models/Roles';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AppModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  checkoutForm!: FormGroup;
  userDialog: boolean = false;
  users: Users[] = [];
  user: Users = new Users();
  selectedUsers: Users[] = [];
  hideFilter: boolean = true;

  sumDebtor: number = 0;
  sumCreditor: number = 0;

  isUpdate: boolean = false;
  allRoles: Roles[] = [];

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRoles();
    this.loadUsers();
  }

  initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      fullNames: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
      roleId: ['', Validators.required],
    });
  }

  async loadUsers(): Promise<void> {
    try {
      const data = await this.apiService.getAllUsers();
      if (data?.length) {
        this.users = data;
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async loadRoles(): Promise<void> {

    try {
      const data = await this.apiService.getAllRoles();
      if (data?.length) {
        this.allRoles = data;
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  toggleFilter(): void {
    this.hideFilter = !this.hideFilter;
  }

  async onSubmit(): Promise<void> {
    const userData = this.checkoutForm.value;
    if (this.isUpdate) {
      await this.updateUser(userData);
    } else {
      await this.addUser(userData);
    }
  }

  async addUser(userData: Users) {
    try {
      await this.apiService.addUsers(userData);
      this.messageService.add({
        severity: 'success',
        summary: 'انجام شد',
        detail: 'حساب ثبت شد',
      });
      await this.loadUsers();
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

  async updateUser(user: Users): Promise<void> {
    try {
      user.id = this.user.id;
      await this.apiService.updateUsers(user);
      this.messageService.add({
        severity: 'success',
        summary: 'انجام شد',
        detail: 'حساب بروز شد',
      });
      await this.loadUsers();
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

  editUser(user: Users): void {
    this.isUpdate = true;
    this.user = { ...user };
    this.userDialog = true;
  }

  showDialog(): void {
    this.user = new Users();
    this.isUpdate = false;
    this.userDialog = true;
  }

  closeDialog(): void {
    this.userDialog = false;
    this.user = new Users();
  }

  trackById(index: number, item: Users): number {
    return item.id;
  }
}

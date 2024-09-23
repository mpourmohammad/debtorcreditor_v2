import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../Models/Transaction';
import { AppModule } from '../../app.module';
import { ApiService } from '../../Services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../Models/Users';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, CommonModule, AppModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {

  checkoutForm!: FormGroup;
  checkoutFormDel!: FormGroup;
  haghighiDialog!: boolean;

  hideFilter = true;

  haghighiDialogDelete: boolean = false;

  btnUpdate: boolean = false;

  haghighiPersons!: Transaction[];
  haghighiPerson!: Transaction;
  selecthaghighiPersons!: Transaction[];

  disabled = true;
  submitted: boolean = false;
  StatusColeMeli: boolean = true;
  StatusColeMeliRepeat: boolean = true;



  getUsers!: Users[];
  getRoles!: Users[];

  visible: boolean = false;

  transactions!: Transaction[];
  transaction!: Transaction;
  selectGetCalcs!: Transaction[];

  cols!: any[];
  sumDebtor!: any;
  sumCreditor!: any;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      NationalCode: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      FirstName: ['', [Validators.required, Validators.maxLength(40)]],
      FamilyName: ['', [Validators.required, Validators.maxLength(40)]],
      BirthDate: ['', [Validators.required]],
      FatherName: ['', [Validators.required, Validators.maxLength(40)]],
      ShomarehShenasnameh: ['', [Validators.required, Validators.maxLength(20)]],
      MahalSodoorShenasnamehId: ['', [Validators.required]],
      SeriShenasnameh: ['', [Validators.required, Validators.maxLength(15)]],
      SerialShenasnameh: ['', [Validators.required, Validators.maxLength(20)]],
      ShomarehMobile: ['', Validators.maxLength(50)],

      CityId: [''],
      ProvinceId: [''],
      ProvinceCode: ['', [Validators.required]]

    });
    this.checkoutFormDel = this.formBuilder.group({
      PersonId: ['']
    });
  }
  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      // Your code that requires document
      document.body.style.overflow = 'hidden';
    }
  }
  ngOnInit() {

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
  filter() { }
  onSubmit(a: any) { }

  showDialog() {
    this.haghighiDialog = true;
  }

  closeDialog() {
    this.visible = false;
  }

  addUser() {

  }
}

import { NgModule } from '@angular/core';
import { JalaliPipe } from './Pipe/jalali.pipe';
import { PrimengModule } from './Shared/primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS,
} from './Shared/variables/material.persian-date.adapter';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { CheckComponent } from './Components/check/check.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [JalaliPipe],
  imports: [
    AppComponent,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JalaliPipe,
    PrimengModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
  ],
})
export class AppModule {}

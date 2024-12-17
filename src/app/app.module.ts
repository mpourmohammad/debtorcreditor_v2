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
import { LoadingComponent } from './Components/loading/loading.component';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingService } from './Services/loading.service';

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
    LoadingService,
    MessageService,
    ConfirmationService,
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
})
export class AppModule {}

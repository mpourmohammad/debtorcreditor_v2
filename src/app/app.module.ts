import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliPipe } from './Pipe/jalali.pipe';
import { PrimengModule } from './Shared/primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [JalaliPipe],
  imports: [],
  exports: [JalaliPipe, PrimengModule, FormsModule, ReactiveFormsModule],
  providers: [MessageService, ConfirmationService],
})
export class AppModule {}

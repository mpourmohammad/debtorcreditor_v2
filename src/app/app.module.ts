import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaliPipe } from './Pipe/jalali.pipe';
import { PrimengModule } from './Shared/primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [JalaliPipe],
  imports: [PrimengModule],
  exports: [JalaliPipe, PrimengModule],
  providers: [MessageService, ConfirmationService],
})
export class AppModule {}

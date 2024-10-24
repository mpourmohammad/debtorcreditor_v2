import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { PrimengModule } from './Shared/primeng.module';
import { CheckComponent } from './Components/check/check.component';
import { UserComponent } from './Components/user/user.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PrimengModule,
    TransactionComponent,
    CheckComponent,
    UserComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'debtorcreditor_v2';
}

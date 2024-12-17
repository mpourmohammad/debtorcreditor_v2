import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { PrimengModule } from './Shared/primeng.module';
import { CheckComponent } from './Components/check/check.component';
import { UserComponent } from './Components/user/user.component';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { LoadingService } from './Services/loading.service';
import { LoadingComponent } from './Components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PrimengModule,
    TransactionComponent,
    CheckComponent,
    UserComponent,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private loadingService: LoadingService) {}

  // نمایش لودینگ
  showLoading() {
    this.loadingService.show();
  }

  // پنهان کردن لودینگ
  hideLoading() {
    this.loadingService.hide();
  }
}

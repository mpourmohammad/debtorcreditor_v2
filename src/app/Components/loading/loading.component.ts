import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule], // Import CommonModule here
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading$: Observable<boolean>; // Observable برای وضعیت لودینگ

  constructor(private loadingService: LoadingService) {
    // متصل کردن به Observable در سرویس
    this.isLoading$ = this.loadingService.isLoading;
  }
}

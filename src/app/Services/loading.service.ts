import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false); // وضعیت پیش‌فرض: false

  isLoading: Observable<boolean> = this.isLoadingSubject.asObservable();

  // نمایش لودینگ
  show() {
    this.isLoadingSubject.next(true);
  }

  // پنهان کردن لودینگ
  hide() {
    this.isLoadingSubject.next(false);
  }
}

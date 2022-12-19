import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { ModalService } from 'src/app/service/modal.service';
import { httpResponse } from 'src/app/shared/interface/http-response-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  subscription = new Subscription();
  modalShow = false;
  itemArray$!: Observable<any>;
  refreshInfo$ = new BehaviorSubject<boolean>(true);

  item!: httpResponse;

  constructor(
    private modalService: ModalService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.modalService.modal.subscribe((o) => (this.modalShow = o))
    );

    this.getData();
  }

  getData() {
    this.itemArray$ = this.refreshInfo$.pipe(
      switchMap((_) => this.httpService.getCompany())
    );
    setInterval(() => {
      this.refreshInfo$.next(true);
    }, 5000);
  }

  updatePrice(item: httpResponse) {
    this.modalShow = true;
    this.item = item;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

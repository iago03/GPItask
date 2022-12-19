import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { ModalService } from 'src/app/service/modal.service';
import { httpResponse } from 'src/app/shared/interface/http-response-interface';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  subscriptions = new Subscription();
  formMarket!: FormGroup;
  message = false;
  @Input() item!: httpResponse;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.createForm(this.item);
  }

  createForm(item: httpResponse) {
    this.formMarket = this.fb.group({
      marketOnePrice: new FormControl(
        item.markets[0].price,
        Validators.required
      ),
      marketTwoPrice: new FormControl(
        item.markets[1].price,
        Validators.required
      ),
      marketThreePrice: new FormControl(
        item.markets[2].price,
        Validators.required
      ),
    });
  }

  closeModal() {
    this.modalService.modal.emit(false);
    this.formMarket.reset();
  }

  submit(controlName: string, item: any) {
    if (this.formMarket.get(controlName)?.valid) {
      this.updatePrice(controlName, item);
    } else {
      this.formMarket.get(controlName)?.markAsDirty();
    }
  }

  updatePrice(controlName: string, item: any) {
    this.httpService
      .updatePrice(item.id, this.formMarket.get(controlName)?.value)
      .subscribe(() => this.createMessage());
  }

  createMessage() {
    this.message = true;
    setTimeout(() => {
      this.message = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

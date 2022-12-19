import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
}

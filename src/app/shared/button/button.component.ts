import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() fontSize: string = '16px';
  @Input() margin: string = '30px 0px';
  @Input() padding: string = '16px';
  @Input() background = '#7c7cf6';
  @Input() opacity = '0.7';

  constructor() {}
}

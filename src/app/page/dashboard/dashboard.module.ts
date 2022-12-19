import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/shared/button/button.module';
import { InputModule } from 'src/app/shared/input/input.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  declarations: [DashboardComponent, EditModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    InputModule,
    ReactiveFormsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}

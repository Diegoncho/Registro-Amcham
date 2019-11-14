import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ModalComponent } from '../shared/modal/modal.component';

// Pipes
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TimeWhenPipe } from './pipes/time-when.pipe';

@NgModule({
  declarations: [
    ProgressBarComponent,
    ModalComponent,
    TimeAgoPipe,
    TimeWhenPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [],
  exports: [
    ProgressBarComponent,
    ModalComponent,
    TimeAgoPipe,
    TimeWhenPipe

  ],
  bootstrap: []
})
export class SharedModule { }

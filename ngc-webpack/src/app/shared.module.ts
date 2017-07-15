import { NgModule } from '@angular/core';

import { CustomComponent } from './custom.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    CustomComponent
  ],
  declarations: [CustomComponent]
})
export class SharedModule {
}

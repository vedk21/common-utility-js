import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';
import { JSONUtilityService } from './json-utility.service';
import {JSONCommons} from './json-operations.service';
import {CommonOps} from './common-operations.service';

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './json-utility.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  providers: [
    JSONUtilityService,
      JSONCommons,
      CommonOps
  ]

})
export class CommonUtilityModule {

}

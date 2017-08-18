import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { SampleDirective } from './sample.directive';
import { SamplePipe } from './sample.pipe';
import { JSONFilterService } from './json-filter.service';

export * from './sample.component';
export * from './sample.directive';
export * from './sample.pipe';
export * from './json-filter.service';

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
  ]
})
export class CommonUtilityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonUtilityModule,
      providers: [JSONFilterService]
    };
  }
}

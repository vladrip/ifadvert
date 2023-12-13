import { ModuleWithProviders, NgModule } from '@angular/core';
import { EqualValidator } from './equal-validator.directive';

@NgModule({
  declarations: [
    EqualValidator,
  ],
  exports: [
    EqualValidator,
  ],
  providers: []
})
export class ValidatorsModule {
  static forRoot(): ModuleWithProviders<ValidatorsModule> {
    return {
      ngModule: ValidatorsModule,
    };
  }
}



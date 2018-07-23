import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FamTestIntroPage } from './fam-test-intro';

@NgModule({
  declarations: [
    FamTestIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(FamTestIntroPage),
    TranslateModule.forChild()
  ],
})
export class FamIntroPageModule {}

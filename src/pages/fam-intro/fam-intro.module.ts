import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FamIntroPage } from './fam-intro';

@NgModule({
  declarations: [
    FamIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(FamIntroPage),
    TranslateModule.forChild()
  ],
})
export class FamIntroPageModule {}

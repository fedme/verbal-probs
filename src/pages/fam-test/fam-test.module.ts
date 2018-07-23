import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FamTestPage } from './fam-test';

@NgModule({
  declarations: [
    FamTestPage,
  ],
  imports: [
    IonicPageModule.forChild(FamTestPage),
    TranslateModule.forChild()
  ],
})
export class FamTestPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FamStudyPage } from './fam-study';

@NgModule({
  declarations: [
    FamStudyPage,
  ],
  imports: [
    IonicPageModule.forChild(FamStudyPage),
    TranslateModule.forChild()
  ],
})
export class FamStudyPageModule {}

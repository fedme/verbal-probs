import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FamReportPage } from './fam-report';

@NgModule({
  declarations: [
    FamReportPage,
  ],
  imports: [
    IonicPageModule.forChild(FamReportPage),
    TranslateModule.forChild()
  ],
})
export class FamReportPageModule {}

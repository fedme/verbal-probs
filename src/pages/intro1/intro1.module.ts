import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { Intro1Page } from './intro1';

@NgModule({
  declarations: [
    Intro1Page,
  ],
  imports: [
    IonicPageModule.forChild(Intro1Page),
    TranslateModule.forChild()
  ],
})
export class Intro1PageModule {}

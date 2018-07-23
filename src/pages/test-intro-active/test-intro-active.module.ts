import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TestIntroActivePage } from './test-intro-active';

@NgModule({
  declarations: [
    TestIntroActivePage,
  ],
  imports: [
    IonicPageModule.forChild(TestIntroActivePage),
    TranslateModule.forChild()
  ],
})
export class TestIntroActivePageModule {}

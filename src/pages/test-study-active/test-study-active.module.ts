import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TestStudyActivePage} from './test-study-active';

@NgModule({
  declarations: [
    TestStudyActivePage,
  ],
  imports: [
    IonicPageModule.forChild(TestStudyActivePage),
    TranslateModule.forChild()
  ],
})
export class TestStudyActivePageModule {}

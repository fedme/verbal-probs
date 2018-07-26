import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperimenterNotesPage } from './experimenter-notes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ExperimenterNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperimenterNotesPage),
    TranslateModule.forChild()
  ],
})
export class ExperimenterNotesPageModule {}

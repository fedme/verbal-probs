import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PlanetPage } from './planet';

@NgModule({
  declarations: [
    PlanetPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanetPage),
    TranslateModule.forChild()
  ],
})
export class PlanetPageModule {}

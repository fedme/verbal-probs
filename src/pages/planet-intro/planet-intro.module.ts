import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PlanetIntroPage } from './planet-intro';

@NgModule({
  declarations: [
    PlanetIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanetIntroPage),
    TranslateModule.forChild()
  ],
})
export class PlanetIntroPageModule {}

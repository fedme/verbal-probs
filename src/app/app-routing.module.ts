import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App routes
const routes: Routes = [
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'practice-slider', loadChildren: './practice-slider/practice-slider.module#PracticeSliderPageModule' },
  { path: 'practice-intro', loadChildren: './practice-intro/practice-intro.module#PracticeIntroPageModule' },
  { path: 'practice-planet', loadChildren: './practice-planet/practice-planet.module#PracticePlanetPageModule' },
  { path: 'practice-outro', loadChildren: './practice-outro/practice-outro.module#PracticeOutroPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'planet-intro', loadChildren: './planet-intro/planet-intro.module#PlanetIntroPageModule' },
  { path: 'planet', loadChildren: './planet/planet.module#PlanetPageModule' },
  { path: 'well-done', loadChildren: './well-done/well-done.module#WellDonePageModule' },
  { path: 'exp-notes', loadChildren: './exp-notes/exp-notes.module#ExpNotesPageModule' },
  { path: 'end', loadChildren: './end/end.module#EndPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

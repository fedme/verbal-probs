import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import { Stimuli } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-planet-intro',
  templateUrl: 'planet-intro.html',

  animations: [
    trigger('fade', [
      state('true', style({
        opacity: 1
      })),
      state('false', style({
        opacity: 0
      })),
      transition('true <=> false', animate('1000ms linear'))
    ])
  ]
})
export class PlanetIntroPage {

  slideNumber: number = 0;
  lastSlideNumber: number = 3;

  planetState: boolean = false;
  titleState: boolean = false;
  rocketState: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public stimuli: Stimuli
  ) {
    // TODO: REMOVE!
    //this.stimuli.initializeConditions();
  }

  ionViewDidEnter() {
    this.slide0();
  }

  async next() {
    this.hideAll();
    await this.sleep(1100);
    this.navCtrl.setRoot("PlanetPage");
  }

  async slide0() {
    await this.sleep(500);
    this.planetState = true;
    this.titleState = true;
    await this.sleep(1000);
    this.rocketState = true;
  }

  hideAll() {
    this.planetState = false;
    this.titleState = false;
    this.rocketState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

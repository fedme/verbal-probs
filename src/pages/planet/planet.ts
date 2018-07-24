import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import { Stimuli } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-planet',
  templateUrl: 'planet.html',

  animations: [
    trigger('fade', [
      state('true', style({
        opacity: 1
      })),
      state('false', style({
        opacity: 0
      })),
      transition('true <=> false', animate('500ms linear'))
    ])
  ]
})
export class PlanetPage {

  slideNumber: number = 0;
  lastSlideNumber: number = 3;

  titleState: boolean = false;
  rocketState: boolean = false;
  robotState: boolean = false;
  textState: boolean = false;

  text: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public stimuli: Stimuli
  ) {

    translate.get('INTRO.TEXT_1').subscribe((res: string) => {
      this.text = res;
    });

  }

  ionViewDidEnter() {
    this.slide0();
  }

  next() {
    this.slideNumber++;

    if (this.slideNumber > this.lastSlideNumber) {
      this.navCtrl.setRoot("PlanetIntroPage");
    }

    if (typeof this['slide' + this.slideNumber] === 'function') {
        this['slide' + this.slideNumber]();
    }

  }

  async slide0() {
    await this.sleep(500);
    this.titleState = true
    await this.sleep(1000);
    this.rocketState = true
  }

  async slide1() {
    this.textState = true;
    this.robotState = true;
  }

  async slide2() {
    this.textState = false;
    await this.sleep(600)
    this.text = await this.translate.get('INTRO.TEXT_2').toPromise()
    await this.sleep(100)
    this.textState = true;
  }

  async slide3() {
    this.textState = false;
    await this.sleep(600)
    this.text = await this.translate.get('INTRO.TEXT_3').toPromise()
    await this.sleep(100)
    this.textState = true;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

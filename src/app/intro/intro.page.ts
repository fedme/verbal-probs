import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../services/common/app.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
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
export class IntroPage implements OnInit {

  slideNumber = 0;
  lastSlideNumber = 3;

  titleState = false;
  rocketState = false;
  robotState = false;
  textState = false;
  planetsState = false;

  text: string;
  planetsImg = 'intro_planets';

  constructor(
    public vprobs: VprobsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private app: AppService
  ) {
    // this.vprobs.setupExperiment(); // TODO: REMOVE!
  }

  ngOnInit() {
    this.slide0();
  }

  async next() {
    this.slideNumber++;

    if (this.slideNumber > this.lastSlideNumber) {
      this.hideAll();
      await this.sleep(600);
      this.navCtrl.navigateRoot('/planet-intro');
    }

    if (typeof this['slide' + this.slideNumber] === 'function') {
        this['slide' + this.slideNumber]();
    }

  }

  async slide0() {
    this.text = await this.translate.get('INTRO.TEXT_1').toPromise();
    this.planetsImg = 'intro_planets';

    await this.sleep(500);
    this.titleState = true;
    await this.sleep(1000);
    this.rocketState = true;
  }

  async slide1() {
    this.textState = true;
    this.planetsState = true;
    await this.sleep(1000);
    this.robotState = true;
  }

  async slide2() {
    this.textState = false;
    this.planetsState = false;
    await this.sleep(600);
    this.text = await this.translate.get('INTRO.TEXT_2').toPromise();
    this.planetsImg = 'intro_planets_with_monsters';
    await this.sleep(100);
    this.textState = true;
    this.planetsState = true;
  }

  async slide3() {
    this.textState = false;
    await this.sleep(600);
    this.text = await this.translate.get('INTRO.TEXT_3').toPromise();
    await this.sleep(100);
    this.textState = true;
  }

  hideAll() {
    this.titleState = false;
    this.rocketState = false;
    this.robotState = false;
    this.textState = false;
    this.planetsState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}

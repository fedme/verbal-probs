import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.page.html',
  styleUrls: ['./planet.page.scss'],
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
export class PlanetPage implements OnInit {

  slideNumber = 0;
  lastSlideNumber = 3;

  monsterState = false;
  planetState = false;
  rocketState = false;
  robotState = false;
  textState = false;
  sliderState = false;
  robotTextState = false;

  text1: string;
  text2: string;
  robotText: string;
  sliderTextLeft: string;
  sliderTextRight: string;
  featureLeft: string;
  featureLabelLeft: string;
  featureRight: string;
  featureLabelRight: string;
  introText: string;
  questionText: string;

  sliderVal = 50;
  sliderTouched = false;
  mustTouchRobot = false;

  constructor(
    public vprobs: VprobsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {
    // this.vprobs.setupExperiment(); // TODO: REMOVE!
  }

  ngOnInit() {
    // Select LEFT arrangement of things
    this.featureLeft = this.vprobs.testBattery.currentPlanet.feature + '_b';
    this.featureLabelLeft = this.vprobs.testBattery.currentPlanet.feature_label_b;
    this.sliderTextLeft = this.vprobs.testBattery.currentPlanet.slider_text_b;
    this.vprobs.testBattery.currentPlanet.layoutLeft = 'b';

    // Select RIGHT arrangement of things
    this.featureRight = this.vprobs.testBattery.currentPlanet.feature + '_a';
    this.featureLabelRight = this.vprobs.testBattery.currentPlanet.feature_label_a;
    this.sliderTextRight = this.vprobs.testBattery.currentPlanet.slider_text_a;
    this.vprobs.testBattery.currentPlanet.layoutRight = 'a';

    // Select appropiate ordered text
    this.introText = this.vprobs.testBattery.currentPlanet.intro_text_b_a;
    this.questionText = this.vprobs.testBattery.currentPlanet.question_text_a;

    this.slide0();
  }

  sliderChanged(evt) {
    this.sliderTouched = true;
  }

  async next() {

    if (this.mustTouchRobot) {
      const msg = await this.translate.get('DIALOGS.MUST_TOUCH_ROBOT').toPromise();
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 1000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }

    this.slideNumber++;

    if (this.slideNumber > this.lastSlideNumber) {

      if (!this.sliderTouched) {
        const msg = await this.translate.get('DIALOGS.MUST_TOUCH_SLIDER').toPromise();
        const toast = await this.toastCtrl.create({
          message: msg,
          duration: 1000,
          position: 'top',
          color: 'danger'
        });
        toast.present();
        return;
      }

      // Save slider val
      this.vprobs.testBattery.currentPlanet.slider_val = this.sliderVal;

      if (this.vprobs.testBattery.isLastPlanet()) {
        this.hideAll();
        await this.sleep(600);
        this.navCtrl.navigateRoot('/exp-notes');
      } else {
        this.hideAll();
        await this.sleep(600);
        this.vprobs.testBattery.nextPlanet();
        this.navCtrl.navigateRoot('/planet-intro');
      }

    }

    if (typeof this['slide' + this.slideNumber] === 'function') {
        this['slide' + this.slideNumber]();
    }

    // this.vprobs.soundClick.play();
  }

  async slide0() {
    this.text1 = await this.translate.get('PLANET.INTRO_STATIC').toPromise();
    this.text2 = this.introText;
    this.sliderVal = 50;

    await this.sleep(500);
    this.planetState = true;
    await this.sleep(500);
    this.rocketState = true;
    await this.sleep(1000);
    this.monsterState = true;
    this.textState = true;
    // this.vprobs.soundWizard.play();
  }

  async slide1() {

    // Text changes
    this.textState = false;
    await this.sleep(600);

    if (this.vprobs.testBattery.currentPlanet.term_type === 'probability') {
      this.text1 = await this.translate.get('PLANET.QUESTION_STATIC_PROB').toPromise();
    } else {
      this.text1 = await this.translate.get('PLANET.QUESTION_STATIC_FREQ').toPromise();
    }

    this.text2 = this.questionText;
    await this.sleep(100);
    this.textState = true;


    // Robot appears

    this.robotText = await this.translate.get('PLANET.ROBOT_CLICK_ME').toPromise();
    this.mustTouchRobot = true;
    await this.sleep(1000);

    this.robotTextState = true;
    this.robotState = true;

    // this.vprobs.soundPop.play();

  }

  robotTouched() {

    if (this.slideNumber === 1) {
      if (!this.mustTouchRobot) { return; }
      this.slideNumber++;
      this.slide2();
      this.mustTouchRobot = false;
    } else if (this.slideNumber === 2) {
      this.slideNumber++;
      this.slide3();
    }

    // this.vprobs.soundMetallic.play();

  }

  async slide2() {

    // slide activated by click on robot

    this.robotTextState = false;
    await this.sleep(600);
    this.robotText = this.vprobs.testBattery.currentPlanet.robot_text;
    await this.sleep(100);
    this.robotTextState = true;

    // this.vprobs.soundPop.play();
  }

  async slide3() {
    

    this.sliderState = true;

    // this.vprobs.soundWizard.play();
  }

  hideAll() {
    this.monsterState = false;
    this.planetState = false;
    this.rocketState = false;
    this.robotState = false;
    this.robotTextState = false;
    this.textState = false;
    this.sliderState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}

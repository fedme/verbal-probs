import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-practice-planet',
  templateUrl: './practice-planet.page.html',
  styleUrls: ['./practice-planet.page.scss'],
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
export class PracticePlanetPage implements OnInit {

  slideNumber = 0;
  lastSlideNumber = 2;

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

  resetPage() {
    this.slideNumber = 0;
    this.lastSlideNumber = 2;
    this.monsterState = false;
    this.planetState = false;
    this.rocketState = false;
    this.robotState = false;
    this.textState = false;
    this.sliderState = false;
    this.robotTextState = false;
    this.sliderVal = 50;
    this.sliderTouched = false;
    this.mustTouchRobot = false;
    this.ngOnInit();
  }

  ngOnInit() {
    // Select LEFT arrangement of things
    this.featureLeft = this.vprobs.practiceBattery.currentPlanet.feature + '_b';
    this.featureLabelLeft = this.vprobs.practiceBattery.currentPlanet.feature_label_b;
    this.sliderTextLeft = this.vprobs.practiceBattery.currentPlanet.slider_text_b;
    this.vprobs.practiceBattery.currentPlanet.layoutLeft = 'b';

    // Select RIGHT arrangement of things
    this.featureRight = this.vprobs.practiceBattery.currentPlanet.feature + '_a';
    this.featureLabelRight = this.vprobs.practiceBattery.currentPlanet.feature_label_a;
    this.sliderTextRight = this.vprobs.practiceBattery.currentPlanet.slider_text_a;
    this.vprobs.practiceBattery.currentPlanet.layoutRight = 'a';

    // Select appropiate ordered text
    this.introText = this.vprobs.practiceBattery.currentPlanet.intro_text_b_a;
    this.questionText = this.vprobs.practiceBattery.currentPlanet.question_text_a;

    this.slide0();
  }

  sliderChanged(evt) {
    this.sliderTouched = true;
    //// this.vprobs.soundMetallic.play();
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
      this.vprobs.practiceBattery.currentPlanet.slider_val = this.sliderVal;

      if (this.vprobs.practiceBattery.isLastPlanet()) {
        this.hideAll();
        await this.sleep(600);
        this.navCtrl.navigateRoot('/practice-outro');
      } else {
        this.hideAll();
        await this.sleep(600);
        this.vprobs.practiceBattery.nextPlanet();
        // this.navCtrl.navigateRoot('/practice-planet');
        this.resetPage();
      }

    }

    if (typeof this['slide' + this.slideNumber] === 'function') {
        this['slide' + this.slideNumber]();
    }

    // this.vprobs.soundClick.play();
  }

  async slide0() {
    this.text1 = await this.translate.get('PRACTICE_PLANET.INTRO_STATIC').toPromise();
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

    if (this.vprobs.practiceBattery.currentPlanet.term_type === 'probability') {
      this.text1 = await this.translate.get('PLANET.QUESTION_STATIC_PROB').toPromise();
    } else {
      this.text1 = await this.translate.get('PLANET.QUESTION_STATIC_FREQ').toPromise();
    }

    this.text2 = this.questionText;
    await this.sleep(100);
    this.textState = true;

    // Robbie appears

    //this.robotText = await this.translate.get('PLANET.ROBOT_CLICK_ME').toPromise();
    //this.mustTouchRobot = true;
    //await this.sleep(1000);

    //this.robotTextState = true;
    this.robotState = true;
    this.robotText = this.vprobs.practiceBattery.currentPlanet.robot_text;
    await this.sleep(100);
    this.robotTextState = true;

    this.mustTouchRobot = true;

    // this.slideNumber++;
    // this.slide2();

    // this.vprobs.soundPop.play();

  }

  robotTouched() {

    if (!this.mustTouchRobot) { return; }
    this.mustTouchRobot = false;

    this.slideNumber++;
    this.slide2();

    // this.vprobs.soundMetallic.play();

  }

  async slide2() {
    
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

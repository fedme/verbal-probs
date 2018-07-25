import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import { Stimuli, Data } from '../../providers/providers';

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
  lastSlideNumber: number = 2;

  monsterState: boolean = false;
  planetState: boolean = false;
  rocketState: boolean = false;
  robotState: boolean = false;
  textState: boolean = false;
  sliderState: boolean = false;

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

  sliderVal: number = 50;
  sliderTouched: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public stimuli: Stimuli,
    public data: Data,
    private toastCtrl: ToastController
  ) {

    // TODO: REMOVE!
    //this.stimuli.initializeConditions();

    console.log(this.stimuli.planetRound);
  }

  ionViewDidLoad() {
    // Select LEFT arrangement of things
    this.featureLeft = this.stimuli.planetRound.feature + "_b";
    this.featureLabelLeft = this.stimuli.planetRound.feature_label_b;
    this.sliderTextLeft = this.stimuli.planetRound.slider_text_b;

    // Select RIGHT arrangement of things
    this.featureRight = this.stimuli.planetRound.feature + "_a";
    this.featureLabelRight = this.stimuli.planetRound.feature_label_a;
    this.sliderTextRight = this.stimuli.planetRound.slider_text_a;

    // Select appropiate ordered text
    this.introText = this.stimuli.planetRound.intro_text_a_b;
    this.questionText = this.stimuli.planetRound.question_text_a;
  }

  ionViewDidEnter() {
    this.slide0();
  }

  sliderChanged(evt) {
    this.sliderTouched = true;
  }

  async next() {
    this.slideNumber++;

    if (this.slideNumber > this.lastSlideNumber) {

      if (!this.sliderTouched) {
        const toast = this.toastCtrl.create({
          message: "You haven't touched the slider",
          duration: 1000,
          position: 'top'
        });
        toast.present();
        return;
      }

      // Save slider val
      this.stimuli.planetRound.slider_val = this.sliderVal;

      if (this.stimuli.areThereMorePlanetRounds()) {
        this.hideAll();
        await this.sleep(600);
        this.stimuli.goToNextPlanetRound();
        this.navCtrl.setRoot("PlanetIntroPage");
      }

      else {

        // Save experiment data
        this.data.save();
        this.hideAll();
        await this.sleep(600);
        this.navCtrl.setRoot("EndPage");
      }
      
    }

    if (typeof this['slide' + this.slideNumber] === 'function') {
        this['slide' + this.slideNumber]();
    }
  }

  async slide0() {
    this.text1 = await this.translate.get('PLANET.INTRO_STATIC').toPromise();
    this.text2 = this.introText;
    this.robotText = this.stimuli.planetRound.robot_text;

    await this.sleep(500);
    this.planetState = true
    await this.sleep(500);
    this.rocketState = true
    await this.sleep(1000);
    this.monsterState = true
    this.textState = true;
  }

  async slide1() {
    this.robotState = true;
  }

  async slide2() {
    this.textState = false;
    await this.sleep(600)
    this.text1 = await this.translate.get('PLANET.QUESTION_STATIC').toPromise()
    this.text2 = this.questionText;
    await this.sleep(100)
    this.textState = true;
    this.sliderState = true;
  }

  hideAll() {
    this.monsterState = false;
    this.planetState = false;
    this.rocketState = false;
    this.robotState = false;
    this.textState = false;
    this.sliderState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

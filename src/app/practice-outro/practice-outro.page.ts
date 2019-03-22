import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../services/common/app.service';

@Component({
  selector: 'app-practice-outro',
  templateUrl: './practice-outro.page.html',
  styleUrls: ['./practice-outro.page.scss'],
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
export class PracticeOutroPage implements OnInit {

  slideNumber = 0;
  lastSlideNumber = 1;

  titleState = false;
  textState = false;
  robotState = false;

  constructor(
    public vprobs: VprobsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    public app: AppService
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

    // this.vprobs.soundClick.play();

  }

  async slide0() {
    await this.sleep(500);
    this.titleState = true;
    this.robotState = true;
  }

  async slide1() {
    this.titleState = false;
    await this.sleep(1000);
    this.textState = true;
  }

  hideAll() {
    this.titleState = false;
    this.textState = false;
    this.robotState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}

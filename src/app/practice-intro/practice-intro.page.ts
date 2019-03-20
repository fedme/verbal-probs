import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../services/common/app.service';

@Component({
  selector: 'app-practice-intro',
  templateUrl: './practice-intro.page.html',
  styleUrls: ['./practice-intro.page.scss'],
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
export class PracticeIntroPage implements OnInit {

  slideNumber = 0;
  lastSlideNumber = 3;

  titleState = false;
  textState = false;

  text: string;
  planetsImg = 'intro_planets';

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
    this.hideAll();
    await this.sleep(600);
    this.navCtrl.navigateRoot('/practice-planet');
  }

  async slide0() {
    await this.sleep(500);
    this.titleState = true;
  }

  hideAll() {
    this.titleState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}

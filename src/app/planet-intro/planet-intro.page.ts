import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-planet-intro',
  templateUrl: './planet-intro.page.html',
  styleUrls: ['./planet-intro.page.scss'],
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
export class PlanetIntroPage implements OnInit {

  slideNumber: number = 0;
  lastSlideNumber: number = 3;

  planetState: boolean = false;
  titleState: boolean = false;
  rocketState: boolean = false;

  constructor(
    public vprobs: VprobsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {

  }

  ngOnInit() {
    this.slide0();
  }

  async next() {
    this.hideAll();
    await this.sleep(1100);
    this.navCtrl.navigateRoot("/planet-page");
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

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../services/common/app.service';
import { DataService } from '../services/common/data.service';

@Component({
  selector: 'app-exp-notes',
  templateUrl: './exp-notes.page.html',
  styleUrls: ['./exp-notes.page.scss'],
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
export class ExpNotesPage implements OnInit {

  contentState = false;

  constructor(
    public vprobs: VprobsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private app: AppService,
    private data: DataService
  ) {
    // this.vprobs.setupExperiment(); // TODO: REMOVE!
  }

  ngOnInit() {
    this.slide0();
  }

  async slide0() {
    await this.sleep(500);
    this.contentState = true;
  }

  async next() {

    // Save experiment data
    this.data.save();

    this.hideAll();
    await this.sleep(1100);
    this.navCtrl.navigateRoot('/end');
  }

  hideAll() {
    this.contentState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}

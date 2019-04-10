import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { VprobsService } from '../services/vprobs/vprobs.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-practice-slider',
  templateUrl: './practice-slider.page.html',
  styleUrls: ['./practice-slider.page.scss'],
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
export class PracticeSliderPage implements OnInit {

  sliderVal = 50;
  sliderTouched = false;

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
    this.sliderVal = 50;
    this.sliderTouched = false;
    this.ngOnInit();
  }

  ngOnInit() {

  }

  sliderChanged(evt) {
    this.sliderTouched = true;
    //// this.vprobs.soundMetallic.play();
  }

  async next() {
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
  
    this.navCtrl.navigateRoot('/practice-intro');
      
  }

}

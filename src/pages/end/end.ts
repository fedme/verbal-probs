import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-end',
  templateUrl: 'end.html',
  animations: [
    trigger('fade', [
      state('true', style({
        opacity: 1
      })),
      state('false', style({
        opacity: 0
      })),
      transition('true <=> false', animate('1000ms linear'))
    ])
  ]
})
export class EndPage {

  nextConfirmed: boolean = false;
  titleState: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndPage');
  }

  ionViewDidEnter() {
    this.slide0();
  }

  async slide0() {
    await this.sleep(500);
    this.titleState = true
  }

  confirmNext() {
    this.nextConfirmed = true;
  }

  async next() {
    if (!this.nextConfirmed) return;
    this.hideAll()
    await this.sleep(1100);
    this.navCtrl.setRoot("RegistrationPage");
    this.navCtrl.popToRoot();
  }

  hideAll() {
    this.titleState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

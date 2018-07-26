import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli, Data } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-experimenter-notes',
  templateUrl: 'experimenter-notes.html',
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
export class ExperimenterNotesPage {

  contentState: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private stimuli: Stimuli,
    private data: Data
  ) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EndPage');
  }

  ionViewDidEnter() {
    this.slide0();
  }

  async slide0() {
    await this.sleep(500);
    this.contentState = true
  }

  async next() {

    // Save experiment data
    this.data.save();

    this.hideAll()
    await this.sleep(1100);
    this.navCtrl.setRoot("EndPage");
  }

  hideAll() {
    this.contentState = false;
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

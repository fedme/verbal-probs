import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';
import { Stim } from '../../models/models';


@IonicPage()
@Component({
  selector: 'page-test-study-active',
  templateUrl: 'test-study-active.html',
})
export class TestStudyActivePage {


  shownShape: Stim = null;
  allRevealed: boolean = false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private stimuli: Stimuli,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    

    // TODO: remove
    this.stimuli.initializeConditions();

  }


  ionViewDidLoad() {
    this.stimuli.famRound.repetitions++;
    console.log("Started FamRound", this.stimuli.famRound);
  }

  

  objClicked(obj: Stim) {

    if (this.shownShape == null) { 
      obj.show();
      this.shownShape = obj;
    }

    else if (this.shownShape == obj) {
      obj.hide();
      this.shownShape = null;
    }

    if (this.stimuli.famRound.allObjectsRevealedOnce) {
      this.allRevealed = true;
    }

    //console.log(this.shownShape)

  }

  next() {
    if (this.shownShape != null) {
      this.shownShape.hide();
      this.shownShape = null;
    }
    this.allRevealed = false;
    //this.navCtrl.setRoot("TestTestIntroPage");
  }

  
}

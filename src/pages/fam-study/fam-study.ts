import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Stimuli } from '../../providers/providers';
import { Stim } from '../../models/models';


@IonicPage()
@Component({
  selector: 'page-fam-study',
  templateUrl: 'fam-study.html',
})
export class FamStudyPage {


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
    //this.stimuli.initializeConditions();

  }


  ionViewDidLoad() {
    this.stimuli.famRound.repetitions++;
    console.log("Started FamRound", this.stimuli.famRound);
  }

  

  shapeClicked(shape: Stim) {

    if (this.shownShape == null) { 
      shape.show();
      this.shownShape = shape;
    }

    else if (this.shownShape == shape) {
      shape.hide();
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
    this.navCtrl.setRoot("FamTestIntroPage");
  }

  
}

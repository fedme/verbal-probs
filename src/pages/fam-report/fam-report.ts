import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli} from '../../providers/providers';
import { Stim } from '../../models/models';

@IonicPage()
@Component({
  selector: 'page-fam-report',
  templateUrl: 'fam-report.html',
})
export class FamReportPage {

  accuracyPerc: number = 0;
  requiredAccuracy: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private stimuli: Stimuli,
  ) {

    this.accuracyPerc = Math.round(this.stimuli.famRound.getAccuracyPerc() * 100) / 100;
    this.requiredAccuracy = this.stimuli.famRound.requiredAccuracy;
  }


  nextFam() {

    if (this.stimuli.areThereMoreFams()) {
      this.stimuli.goToNextFam();
      this.navCtrl.setRoot("FamStudyPage");
    }
    else {
      // End of fams
      this.navCtrl.setRoot("TestIntroActivePage");
    }   
    
  }

  repeatFam() {
    this.navCtrl.setRoot("FamStudyPage");  
  }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-fam-intro',
  templateUrl: 'fam-intro.html',
})
export class FamIntroPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private stimuli: Stimuli,
  ) {

 
  }


  next() {

    this.navCtrl.setRoot("FamStudyPage");
    
  }

  



}

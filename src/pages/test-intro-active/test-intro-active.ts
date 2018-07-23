import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-test-intro-active',
  templateUrl: 'test-intro-active.html',
})
export class TestIntroActivePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private stimuli: Stimuli,
  ) {

 
  }


  next() {

    this.navCtrl.setRoot("TestStudyActivePage");
    
  }

  



}

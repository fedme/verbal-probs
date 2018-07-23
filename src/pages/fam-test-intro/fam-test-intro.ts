import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-fam-test-intro',
  templateUrl: 'fam-test-intro.html',
})
export class FamTestIntroPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

 
  }


  next() {

    this.navCtrl.setRoot("FamTestPage");
    
  }

  



}

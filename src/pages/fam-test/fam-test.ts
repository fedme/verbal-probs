import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli} from '../../providers/providers';
import { Stim } from '../../models/models';

@IonicPage()
@Component({
  selector: 'page-fam-test',
  templateUrl: 'fam-test.html',
})
export class FamTestPage {

  currentObj: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private stimuli: Stimuli,
  ) {

  }


  answer(answ: boolean) {
    this.obj.answerTest(answ);

    //console.log(this.stimuli.famRound.objects)

    if (this.areThereMoreObjs()) {
      this.goToNextObj();
    }
    else {

      console.log("Finished FamRound", this.stimuli.famRound);
      this.navCtrl.setRoot("FamReportPage");

    }
    
  }

  yes() {
    this.answer(true);
  }

  no() {
    this.answer(false);
  }

  /**
   * Obj navigation
   */

  get obj(): Stim {
    if (this.currentObj < 0) return null;
    return this.stimuli.famRound.objectsAndDistractors[this.currentObj];
  }

  areThereMoreObjs() : boolean {
    return this.currentObj < this.stimuli.famRound.objectsAndDistractors.length - 1;
  }

  goToNextObj() {
    this.currentObj++;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FamTestPage');
  }

}

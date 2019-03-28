import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-well-done',
  templateUrl: './well-done.page.html',
  styleUrls: ['./well-done.page.scss'],
})
export class WellDonePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  public async next() {
    await this.navCtrl.navigateRoot('/exp-notes');
  }

}

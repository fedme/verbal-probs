import { Injectable, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../utils/utils';
import { Participant, Stim, StimType, FamRound, TestRound } from '../../models/models';
import { STIMULIS, SHAPES } from './constants';
import { FAMS_SIZE, FAMS_REQUIRED_ACCURACY, SEED_YOKED_SESSION, N_OBJECTS_TEST } from './conditions';
import { AppInfo } from './app-info';

@Injectable()
export class Stimuli {

  appInfo: AppInfo = AppInfo;

  public langChangedEvent: EventEmitter<string> = new EventEmitter();
  lang: string = "en";

  // general exp
  shortVersion: boolean = false;
  condition: any;
  conditionId: number;
  initialTimestamp: number;
  participant: Participant;
  conditionCounterOverride: number = null;
  runInBrowser: boolean = false;

  //stimuli
  famRounds: FamRound[] = [];
  currentFam: number = 0;
  testRound: TestRound;

  
  constructor(private utils: Utils, private platform: Platform) {
    console.log('Hello Stimuli Provider');
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
    //this.runInBrowser = this.platform.is('core') || this.platform.is('mobileweb'); TODO: not detecting windows UWA
    this.runInBrowser = false
    console.log("You are running", this.platform)

    if (localStorage.getItem('lang') != null && localStorage.getItem('lang') != "") {
      this.lang = localStorage.getItem('lang')
    }
  }

  initialize() {
    this.shortVersion = false; 
    this.initialTimestamp = Date.now(); 
    this.participant = new Participant("anonymous-" + this.utils.getCounterValue());
  }

  resetExperiment() {
    this.famRounds = [];
    this.currentFam = 0;
  }

  initializeConditions() {
    this.resetExperiment()
    this.initializeFams();
    this.initializeTests();
    this.initialTimestamp = Date.now();
  
  }

  initializeFams() {

    let counter = 0;
    let all_shapes = SHAPES.slice();

    for (let famSize of FAMS_SIZE) {

      const shapeIds = this.utils.pickRandFromArrayNoRep(all_shapes, famSize * 2, true, true);

      const shapes: Stim[] = [];
      const distractors: Stim[] = [];

      // Create shapes and distractors arrays
      for (let i=0; i< shapeIds.length; i++) {
        if (i < shapeIds.length / 2) {
          shapes.push(new Stim(shapeIds[i], StimType.Normal));
        }
        else {
          distractors.push(new Stim(shapeIds[i], StimType.Distractor));
        }   
      }

      this.famRounds.push(new FamRound(counter + 1, shapes, distractors, FAMS_REQUIRED_ACCURACY[counter]));

      counter++;
    }

  }

  initializeTests() {

    // Set seed yoked session
    if (!localStorage.getItem('alma_yoked_session')) {
      localStorage.setItem('alma_yoked_session', JSON.stringify(SEED_YOKED_SESSION))
    }

    // Get yoked session
    let yokedSession = JSON.parse(localStorage.getItem('alma_yoked_session'));

    // Draw test objects and distractors ids
    let allObjects = STIMULIS.slice();
    allObjects.filter(a => { return yokedSession["objects"].indexOf(a) < 0 });
    const objects_ids = this.utils.pickRandFromArrayNoRep(allObjects, N_OBJECTS_TEST, true, true);
    const distractors_ids = this.utils.pickRandFromArrayNoRep(allObjects, N_OBJECTS_TEST, true, true);

    // Create Objects, Distractors and Yoked Objects
    let objects = [], distractors =[], yoked = [];
    for (let i=0; i<N_OBJECTS_TEST; i++) {
      objects.push(new Stim(objects_ids[i], StimType.Normal));
      yoked.push(new Stim(yokedSession["objects"][i], StimType.Yoked));
      distractors.push(new Stim(distractors_ids[i], StimType.Distractor));
    }

    // Create TestRound
    this.testRound = new TestRound(1, objects, yoked, distractors, yokedSession);
  }


  /**
   * Fam navigation
   */

  get famRound(): FamRound {
    if (this.currentFam < 0) return null;
    return this.famRounds[this.currentFam];
  }

  areThereMoreFams() : boolean {
    return this.currentFam < this.famRounds.length - 1;
  }

  goToNextFam() {
    this.currentFam++;
  }


  pickCondition() {

    this.condition = this.utils.pickFirstCondition();
    this.conditionId = this.condition['id'];
    console.log('Picked condition', this.condition);
  }

  // TODO: age groups
  getParticipantAgeGroup() {
    if (this.participant.age >= 18) return 18;
    return this.participant.age;
  }

  setLang(langCode: string) {
    this.langChangedEvent.emit(langCode);
  }

}

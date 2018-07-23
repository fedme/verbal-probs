import { Injectable, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../utils/utils';
import { Participant, PlanetRound } from '../../models/models';
import { FREQ_TERMS, PROB_TERMS, FEATURES, PLANETS } from './constants';
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
  planetRounds: PlanetRound[] = [];
  currentPlanetRound: number = 0;

  
  constructor(private platform: Platform) {
    console.log('Hello Stimuli Provider');
    this.participant = new Participant("anonymous-" + Utils.getCounterValue());
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
    this.participant = new Participant("anonymous-" + Utils.getCounterValue());
  }

  resetExperiment() {
    this.planetRounds= [];
    this.currentPlanetRound = 0;
  }

  initializeConditions() {
    this.resetExperiment()
    this.initializePlanetRounds();
    this.initialTimestamp = Date.now();
  }

  initializePlanetRounds() {
  
    // Get terms, features and planets
    const freq_terms = FREQ_TERMS.slice();
    const prob_terms = PROB_TERMS.slice();
    let terms = freq_terms.concat(prob_terms);
    let features = FEATURES.slice();
    let planets = PLANETS.slice();

    // Randomize their order
    Utils.shuffleArray(terms)
    Utils.shuffleArray(features)
    Utils.shuffleArray(planets)

    // Create planet rounds
    for (let i=0; i<terms.length; i++) {
      this.planetRounds.push(
        new PlanetRound(i+1, features[i], terms[i], planets[i])
      );
    }

  }

  /**
   * PlanetRound Navigation
   */

  get planetRound(): PlanetRound {
    if (this.currentPlanetRound < 0) return null;
    return this.planetRounds[this.currentPlanetRound];
  }

  areThereMorePlanetRounds() : boolean {
    return this.currentPlanetRound < this.planetRounds.length - 1;
  }

  goToNextPlanetRound() {
    this.currentPlanetRound++;
  }


  pickCondition() {
    this.condition = Utils.pickFirstCondition();
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

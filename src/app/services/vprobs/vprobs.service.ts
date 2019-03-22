import { Injectable } from '@angular/core';
import { IExperiment } from '../common/experiment.interface';
// tslint:disable-next-line:max-line-length
import { Condition, TestBattery, PracticeBattery, FEATURES, PLANETS, N_PRACTICE, N_TEST} from './models';
import { Utils } from '../common/utils';
import { SourceNode } from 'source-list-map';

@Injectable({
  providedIn: 'root'
})
export class VprobsService implements IExperiment {

  condition: Condition;
  practiceBattery: PracticeBattery;
  testBattery: TestBattery;
  experimenterNotes: string;

  // Sounds
  soundIntro: HTMLAudioElement;
  soundMetallic: HTMLAudioElement;
  soundClick: HTMLAudioElement;
  soundPop: HTMLAudioElement;
  soundSpaceship: HTMLAudioElement;
  soundWizard: HTMLAudioElement;

  constructor() { }

  public setupExperiment(): void {
    console.log('[VProbsService] setupExperiment()');
    this.resetData();
    this.chooseCondition();
    this.setupPracticeAndTest();
    //this.loadSounds();
  }

  public resetData() {
    this.condition = null;
    this.practiceBattery = null;
    this.testBattery = null;
    this.experimenterNotes = null;
  }

  setupPracticeAndTest() {
    const features = FEATURES.slice();
    const planets = PLANETS.slice();
    Utils.shuffleArray(features);
    Utils.shuffleArray(planets);

    this.practiceBattery = PracticeBattery.getDefault(
      this.condition.id === 'freq-first',
      features.slice(0, N_PRACTICE),
      planets.slice(0, N_PRACTICE),
    );

    this.testBattery = TestBattery.getDefault(
      features.slice(N_PRACTICE),
      planets.slice(N_PRACTICE)
    );
  }

  loadSounds() {
    this.soundIntro = new Audio('assets/sounds/intro_sound.mp3');
    this.soundIntro.load();

    this.soundMetallic = new Audio('assets/sounds/metallic_sound.mp3');
    this.soundMetallic.load();

    this.soundClick = new Audio('assets/sounds/mouse-click.mp3');
    this.soundClick.load();

    this.soundPop = new Audio('assets/sounds/pop_sound.mp3');
    this.soundPop.load();

    this.soundSpaceship = new Audio('assets/sounds/spaceship_sound.mp3');
    this.soundSpaceship.load();

    this.soundWizard = new Audio('assets/sounds/wizard_sound.mp3');
    this.soundWizard.load();
  }

  chooseCondition() {

    // Get condition ids from local storage
    let ids = [];
    try {
      ids = JSON.parse(localStorage.getItem('isrc-vprobs-conds'));
    } catch (error) {
      console.log('Error parsing condition ids from json', error);
    }

    // If not present, set initial condition ids
    if (ids == null || ids.length === 0) {
      ids = this.setInitialConditions();
    }

    // Shuffle the condition ids
    ids = Utils.getShuffledCopy(ids);

    // Pick condition
    const conds = Condition.getAll();
    const id = ids.shift();
    this.condition = conds[id];

    // Update condition ids in local storage
    localStorage.setItem('isrc-vprobs-conds', JSON.stringify(ids));

    console.log('[VprobsService] Condition chosen', this.condition);

  }

  setInitialConditions(): number[] {
    // Save an array with 20 possible condition ids to local Storage
    let ids = Array(10).fill(0).concat(Array(10).fill(1));
    ids = Utils.getShuffledCopy(ids);
    localStorage.setItem('isrc-vprobs-conds', JSON.stringify(ids));
    return ids;
  }

  public getExperimentData() {

    const data = {
      condition: this.condition,
      practice: this.practiceBattery,
      test: this.testBattery,
      notes: this.experimenterNotes
    };

    return data;
  }

}

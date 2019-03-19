import { Injectable } from '@angular/core';
import { IExperiment } from '../common/experiment.interface';
// tslint:disable-next-line:max-line-length
import { Condition, TestBattery, PlanetRound, MemoryCheck, ExplanationBattery, MemoryCheckBattery, SecondTestBattery } from './models';
import { Utils } from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class VprobsService implements IExperiment {

  condition: Condition;
  testBattery: TestBattery;

  constructor() { }

  public setupExperiment(): void {
    console.log('[VProbsService] setupExperiment()');
    this.resetData();
    this.chooseCondition();
    this.setupTests();
  }

  public resetData() {
    this.condition = null;
    this.testBattery = null;
  }


  setupTests() {
    this.testBattery = TestBattery.getDefault();
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
    let ids = Array(5).fill(0).concat(Array(5).fill(1)).concat(Array(5).fill(2)).concat(Array(5).fill(3));
    ids = Utils.getShuffledCopy(ids);
    localStorage.setItem('isrc-vprobs-conds', JSON.stringify(ids));
    return ids;
  }

  public getExperimentData() {

    // TODO: save data here
    const data = {
      condition: this.condition,
      test: this.testBattery
    };

    return data;
  }

}

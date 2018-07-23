import 'rxjs/add/operator/map';
import { CONDITIONS } from '../stimuli/conditions';


export class Utils {

  constructor() {
    console.log('Hello Utils Provider');
  }

  public static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  public static pickRandomFromArray(items: any[], howMany: number = 1) {
    let picked = [];

    for (let i=0; i<howMany; i++) {
      const idx = Math.floor(Math.random()*items.length);
      picked.push(items[idx]);
    }
    
    if (picked.length == 1) {
      return picked[0];
    }
    else {
      return picked;
    }
  }

  public static pickRandFromArrayNoRep(items: any[], howMany: number = 1, forceArray: boolean = false, inPlace: boolean = false) {

    let elems = items;
    if (!inPlace) {
      elems = items.slice();
    }

    let picked = [];

    for (let i=0; i<howMany; i++) {
      const idx = Math.floor(Math.random()*elems.length);
      picked.push(elems[idx]);
      elems.splice(idx, 1);
    }
    
    if (picked.length == 1 && !forceArray) {
      return picked[0];
    }
    else {
      return picked;
    }
  }

  public static range(start, end) {
    return Array.from({length: (end - start)}, (v, k) => k + start);
  }

  public static combine(alphabet, length, curstr) {
    if (curstr.length == length) return [curstr];
    var ret = [];
    for (var i = 0; i < alphabet.length; i++) {
      ret.push.apply(ret, Utils.combine(alphabet, length, curstr + alphabet[i]));
    }
    return ret;
  }

  public static permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
  
    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
  }

  /* Counters */
  public static getCounterValue(counterIndex: number = 1) {
    let counterName = "isrc-counter-" + counterIndex;
    if (localStorage.getItem(counterName) === null) {
      return 0;
    }
    return parseInt(localStorage.getItem(counterName));
  }

  public static incrementCounter(counterIndex: number = 1) {
    let counterName = "isrc-counter-" + counterIndex;
    let count: number = 1;
    if (localStorage.getItem(counterName) != null) {
      count = parseInt(localStorage.getItem(counterName)) + 1;
    }
    localStorage.setItem(counterName, count.toString());  
  }

  public static getAllConditions() {
    // Parse all conditions form local storage
    let allConditions = null;
    if (localStorage.getItem("isrc-all-conditions") != null) {
      allConditions = JSON.parse(localStorage.getItem("isrc-all-conditions"));
    }

    if (allConditions != null && allConditions.constructor === Array && allConditions.length > 0) {
      return allConditions;
    }
    else {
      localStorage.setItem("isrc-all-conditions", JSON.stringify(CONDITIONS));
      return CONDITIONS;
    }
  }

  public static pickOneCondition(random: boolean = true) {
    let allConditions = Utils.getAllConditions();
    const condition = Utils.pickRandFromArrayNoRep(allConditions);
    localStorage.setItem("isrc-all-conditions", JSON.stringify(allConditions));
    return condition;
  }

  public static pickFirstCondition() {
    let allConditions = Utils.getAllConditions();
    const condition = allConditions[0];
    allConditions.splice(0, 1);
    localStorage.setItem("isrc-all-conditions", JSON.stringify(allConditions));
    return condition;
  }

}

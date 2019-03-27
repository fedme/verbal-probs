import { FEATURE_MAPPING } from './feature_mapping';
import { FEATURE_TERM_MAPPING } from './feature_term_mapping';
import { Utils } from '../common/utils';

export const N_PRACTICE: number = 6;
export const N_TEST: number = 12;

export const PRACTICE_FREQ_TERMS: string[] = [
    'nie',
    'immer',
    'haelfte'
];

export const TEST_FREQ_TERMS: string[] = [
    'selten',
    'gelegentlich',
    'manchmal',
    'häufig',
    'oft',
    'meistens'
];

export const PRACTICE_PROB_TERMS: string[] = [
    'unmöglich',
    'sicher',
    'gleichwahrscheinlich'
];

export const TEST_PROB_TERMS: string[] = [
    'unwahrscheinlich',
    'möglich',
    'eventuell',
    'vielleicht',
    'unsicher',
    'wahrscheinlich'
];

export const FEATURES: string[] = [
    'horns',
    'wings',
    'antenna',
    'antlers',
    'bellybutton',
    'hair',
    'moustache',
    'paws',
    'point',
    'scissors',
    'spikes',
    'spots',
    'stripe',
    'tail',
    'teeth',
    'tentacles',
    'legs',
    'toothgap'
];

export const PLANETS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export class PlanetRound {

    id: number;
    feature: string;
    term: string;
    term_type: string;
    planet: number;

    // feature dependent
    intro_text_a_b: string;
    intro_text_b_a: string;
    feature_label_a: string;
    feature_label_b: string;

    // feature and term dependent
    question_text_a: string;
    question_text_b: string;
    robot_text: string;
    slider_text_a: string;
    slider_text_b: string;

    // What was shown on the left and on the right
    layoutLeft: string;
    layoutRight: string;

    // Participant input
    slider_val: number;


    constructor(
        id: number,
        feature: string,
        term: string,
        planet: number
    ) {
        this.id = id;
        this.feature = feature;
        this.term = term;
        this.planet = planet;
        this.parseProperties();
    }

    parseProperties() {
        // gather info dependent on feature
        for (const fm of FEATURE_MAPPING.slice()) {
            if (fm.feature === this.feature) {
                this.feature_label_a = fm.feature_label_a;
                this.feature_label_b = fm.feature_label_b;
                this.intro_text_a_b = fm.intro_text_a_b;
                this.intro_text_b_a = fm.intro_text_b_a;
                break;
            }
        }

        // gather info dependent on term and feature
        for (const ftm of FEATURE_TERM_MAPPING.slice()) {
            if (ftm.feature === this.feature && ftm.term === this.term) {
                this.term_type = ftm.term_type;
                this.question_text_a = ftm.question_text_a;
                this.question_text_b = ftm.question_text_b;
                this.robot_text = ftm.robot_text;
                this.slider_text_a = ftm.slider_text_a;
                this.slider_text_b = ftm.slider_text_b;
                break;
            }
        }
    }

    public toString(): string {
        return 'PlanetRound: ' + this.id + ' [' + this.feature + '] [' + this.term + '] [' + this.planet + ']';
    }

    public equals(obj: PlanetRound): boolean {
        return this.id === obj.id;
    }

}

export class TestBattery {

    constructor(planets: PlanetRound[]) {
        this.planets = planets;
        this.planetIndex = 0;
    }

    public get currentPlanet(): PlanetRound {
        if (this.planetIndex >= this.planets.length) { return null; }
        return this.planets[this.planetIndex];
    }
    planets: PlanetRound[];
    planetIndex: number;

    public static getDefault(features: string[], planets: number[]): TestBattery {

        // Get terms, features and planets
        const freq_terms = TEST_FREQ_TERMS.slice();
        const prob_terms = TEST_PROB_TERMS.slice();
        const terms = freq_terms.concat(prob_terms);
        //const features = FEATURES.slice();
        //const planets = PLANETS.slice();

        // Randomize their order
        Utils.shuffleArray(terms);
        Utils.shuffleArray(features);
        Utils.shuffleArray(planets);

        // Create planet rounds
        const rounds: PlanetRound[] = [];
        for (let i = 0; i < terms.length; i++) {
            rounds.push(
                new PlanetRound(i + 1, features[i], terms[i], planets[i])
            );
        }

        const battery = new TestBattery(rounds);
        Utils.shuffleArray(battery.planets);
        return battery;
    }

    public isLastPlanet(): boolean {
        return this.planetIndex >= this.planets.length - 1;
    }

    public nextPlanet() {
        this.planetIndex++;
    }
}


export class PracticeBattery {

    constructor(planets: PlanetRound[]) {
        this.planets = planets;
        this.planetIndex = 0;
    }

    public get currentPlanet(): PlanetRound {
        if (this.planetIndex >= this.planets.length) { return null; }
        return this.planets[this.planetIndex];
    }
    planets: PlanetRound[];
    planetIndex: number;

    public static getDefault(freqFirst: boolean = true, features: string[], planets: number[]): PracticeBattery {

        // Get terms, features and planets
        const freq_terms = PRACTICE_FREQ_TERMS.slice();
        const prob_terms = PRACTICE_PROB_TERMS.slice();

        let terms = freq_terms.concat(prob_terms);
        if (!freqFirst) {
            terms = prob_terms.concat(freq_terms);
        }

        //const features = FEATURES.slice();
        //const planets = PLANETS.slice();

        // Randomize their order
        Utils.shuffleArray(features);
        Utils.shuffleArray(planets);

        // Create planet rounds
        const rounds: PlanetRound[] = [];
        for (let i = 0; i < terms.length; i++) {
            rounds.push(
                new PlanetRound(i + 1, features[i], terms[i], planets[i])
            );
        }

        const battery = new PracticeBattery(rounds);
        Utils.shuffleArray(battery.planets);
        return battery;
    }

    public isLastPlanet(): boolean {
        return this.planetIndex >= this.planets.length - 1;
    }

    public nextPlanet() {
        this.planetIndex++;
    }
}


export class Condition {

    id: string;

    constructor(id: string) {
        this.id = id;
    }

    static getAll(): Condition[] {
        return [
            new Condition('freq-first'),
            new Condition('prob-first')
        ];
    }
}

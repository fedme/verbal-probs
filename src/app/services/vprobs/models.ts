import { FEATURE_MAPPING } from './feature_mapping';
import { FEATURE_TERM_MAPPING } from './feature_term_mapping';
import { Utils } from '../common/utils';

export const PRACTICE_FREQ_TERMS: string[] = [
    'nie',
    'immer',
    '??'
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
    '???'
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
    'tentacles'
];

export const PLANETS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

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

    public static getDefault(): TestBattery {

        // Get terms, features and planets
        const freq_terms = TEST_FREQ_TERMS.slice();
        const prob_terms = TEST_PROB_TERMS.slice();
        const terms = freq_terms.concat(prob_terms);
        const features = FEATURES.slice();
        const planets = PLANETS.slice();

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



























// TODO: Remove HALO stuff!!!

export enum Instructor {
    Blue = 'blue',
    Yellow = 'yellow'
}

export enum Skill {
    Fish = 'fish',
    QA = 'qa'
}

export enum Confidence {
    Confident = 'confident',
    NonConfident = 'notconfident'
}

export enum ConfidenceLevel {
    VerySure = 'verysure',
    DontKnow = 'dontknow',
    NotSure = 'notsure'
}

export enum Environment {
    Animals = 'animals',
    Fish = 'fish',
    Houses = 'houses'
}

export enum Art {
    Animals = 'animals',
    BetterAtSchool = 'betteratschool',
    Icecream = 'icecream',
    TreasureHunt = 'treasurehunt',
    Plane = 'plane',
    Riddle = 'riddle'
}

export class MemoryCheck {
    possibleChoices: Instructor[];
    choice: Instructor;

    constructor() {
        this.possibleChoices = [
            Instructor.Blue,
            Instructor.Yellow
        ];
        Utils.shuffleArray(this.possibleChoices);
    }

    choose(instructor: Instructor) {
        this.choice = instructor;
    }

    chooseByIndex(i: number) {
        if (i < this.possibleChoices.length) {
            this.choose(this.possibleChoices[i]);
        }
    }
}

export class MemoryCheckBattery {

    constructor(checks: MemoryCheck[]) {
        this.checks = checks;
        this.checkIndex = 0;
    }

    public get currentCheck(): MemoryCheck {
        if (this.checkIndex >= this.checks.length) { return null; }
        return this.checks[this.checkIndex];
    }

    public get visualIndex(): number {
        return this.checkIndex + 1;
    }
    checks: MemoryCheck[];
    private checkIndex: number;

    public static getDefault(): MemoryCheckBattery {
        return new MemoryCheckBattery([
            new MemoryCheck(),
            new MemoryCheck(),
            new MemoryCheck(),
            new MemoryCheck(),
        ]);
    }

    public isLastCheck(): boolean {
        return this.checkIndex >= this.checks.length - 1;
    }

    public nextCheck() {
        this.checkIndex++;
    }
}

export class SecondTestRound {
    picture: Art;
    choice: Instructor;

    possibleChoices: Instructor[];


    constructor(picture: Art) {
        this.picture = picture;
        this.possibleChoices = [Instructor.Blue, Instructor.Yellow];
        Utils.shuffleArray(this.possibleChoices);
    }

    chooseInstructor(i: number) {
        if (i < this.possibleChoices.length) {
            this.choice = this.possibleChoices[i];
        }
    }
}

export class SecondTestBattery {

    constructor(tests: SecondTestRound[]) {
        this.tests = tests;
        this.testIndex = 0;
    }

    public get currentTest(): SecondTestRound {
        if (this.testIndex >= this.tests.length) { return null; }
        return this.tests[this.testIndex];
    }
    tests: SecondTestRound[];
    private testIndex: number;

    public static getDefault(): SecondTestBattery {
        const battery = new SecondTestBattery([
            new SecondTestRound(Art.Animals),
            new SecondTestRound(Art.BetterAtSchool),
            new SecondTestRound(Art.Icecream),
            new SecondTestRound(Art.TreasureHunt),
            new SecondTestRound(Art.Plane),
            new SecondTestRound(Art.Riddle)
        ]);
        Utils.shuffleArray(battery.tests);
        return battery;
    }

    public isLastTest(): boolean {
        return this.testIndex >= this.tests.length - 1;
    }

    public nextTest() {
        this.testIndex++;
    }
}

export class ExplanationBattery {

    constructor(exps: Environment[]) {
        this.explanations = exps;
        this.explanationIndex = 0;
    }

    public get currentExplanation(): string {
        if (this.explanationIndex >= this.explanations.length) { return null; }
        return this.explanations[this.explanationIndex];
    }
    explanations: Environment[];
    private explanationIndex: number;

    public static getDefault(): ExplanationBattery {
        const battery = new ExplanationBattery([
            Environment.Animals,
            Environment.Fish,
            Environment.Houses
        ]);
        return battery;
    }

    public isLastExplanation(): boolean {
        return this.explanationIndex >= this.explanations.length - 1;
    }

    public nextExplanation() {
        this.explanationIndex++;
    }
}

export class Video {
    id: number;
    instructor: Instructor;
    skill: Skill;

    constructor(id: number, instructor: Instructor, skill: Skill) {
        this.id = id;
        this.instructor = instructor;
        this.skill = skill;
    }

    get videoFile(): string {
        return `assets/videos/Edit_Video${this.id}_${this.instructor}_${this.skill.toUpperCase()}EXPERT.mp4`;
    }
}

export class Condition {

    constructor(id: string, videos: Video[] = []) {
        this.id = id;
        this.videos = videos;
        this.videoIndex = 0;
    }

    public get currentVideo(): Video {
        if (this.videoIndex >= this.videos.length) { return null; }
        return this.videos[this.videoIndex];
    }
    id: string;
    videos: Video[] = [];
    private videoIndex: number;

    static getAll(): Condition[] {
        return [
            new Condition(
                'blue-fish',
                [
                    new Video(1, Instructor.Blue, Skill.Fish),
                    new Video(1, Instructor.Yellow, Skill.QA),
                    new Video(2, Instructor.Blue, Skill.Fish),
                    new Video(2, Instructor.Yellow, Skill.QA)
                ]
            ),
            new Condition(
                'blue-qa',
                [
                    new Video(1, Instructor.Blue, Skill.QA),
                    new Video(1, Instructor.Yellow, Skill.Fish),
                    new Video(2, Instructor.Blue, Skill.QA),
                    new Video(2, Instructor.Yellow, Skill.Fish)
                ]
            ),
            new Condition(
                'yellow-fish',
                [
                    new Video(1, Instructor.Yellow, Skill.Fish),
                    new Video(1, Instructor.Blue, Skill.QA),
                    new Video(2, Instructor.Yellow, Skill.Fish),
                    new Video(2, Instructor.Blue, Skill.QA)
                ]
            ),
            new Condition(
                'yellow-qa',
                [
                    new Video(1, Instructor.Yellow, Skill.QA),
                    new Video(1, Instructor.Blue, Skill.Fish),
                    new Video(2, Instructor.Yellow, Skill.QA),
                    new Video(2, Instructor.Blue, Skill.Fish)
                ]
            )
        ];
    }

    public isLastVideo(): boolean {
        return this.videoIndex >= this.videos.length - 1;
    }

    public nextVideo() {
        this.videoIndex++;
    }

}


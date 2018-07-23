import { FEATURE_MAPPING } from '../providers/stimuli/feature_mapping';
import { FEATURE_TERM_MAPPING } from '../providers/stimuli/feature_term_mapping';

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
        for (let fm of FEATURE_MAPPING.slice()) {
            if (fm.feature == this.feature) {
                this.feature_label_a = fm.feature_label_a;
                this.feature_label_b = fm.feature_label_b;
                this.intro_text_a_b = fm.intro_text_a_b;
                this.intro_text_b_a = fm.intro_text_b_a;
                break;
            }
        }

        // gather info dependent on term and feature
        for (let ftm of FEATURE_TERM_MAPPING.slice()) {
            if (ftm.feature == this.feature && ftm.term == this.term) {
                this.term_type = ftm.term_type;
                this.question_text_a = ftm.question_text_a
                this.question_text_b = ftm.question_text_b
                this.robot_text = ftm.robot_text
                this.slider_text_a = ftm.slider_text_a
                this.slider_text_b = ftm.slider_text_b
                break;
            }
        }
    }

    public toString(): string {
        return "PlanetRound: " + this.id + " [" + this.feature + "] [" + this.term + "] [" + this.planet + "]";
    }

    public equals(obj: PlanetRound): boolean {
        return this.id === obj.id;
    }

}
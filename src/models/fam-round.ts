import { Stim } from './stim';

export class FamRound {

    id: number;
    objects: Stim[] = [];
    distractors: Stim[] = [];
    objectsAndDistractors: Stim[];
    repetitions: number = 0;
    requiredAccuracy: number = 0;

    constructor(
        id: number, 
        objs: Stim[], 
        distractors: Stim[],
        requiredAccuracy: number
    ) {
        this.id = id;
        this.objects = objs;
        this.distractors = distractors;
        this.objectsAndDistractors = FamRound.shuffleArray(objs.concat(distractors));
        this.requiredAccuracy = requiredAccuracy;
    }

    get allObjectsRevealedOnce(): boolean {
        for (let obj of this.objects) {
            if (!obj.revealedOnce) {
                return false;
            }
        }
        return true;
    }

    public getCorrectGuessesCount(): number {
        let count: number = 0;
        for (let obj of this.objectsAndDistractors) {
            if ((!obj.isDistractor && obj.thinksSeenBefore) || (obj.isDistractor && !obj.thinksSeenBefore)) {
                count ++;
            }
        }
        return count;
    }

    public getAccuracyPerc(): number {
        return this.getCorrectGuessesCount() * 100 / this.objectsAndDistractors.length
    }


    public toString(): string {
        return "FamRound: " + this.id;
    }

    public equals(obj: FamRound): boolean {
        return this.id === obj.id;
    }

    private static shuffleArray(a: any[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

}
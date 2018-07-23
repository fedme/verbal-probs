import { Stim } from './stim';

export class TestRound {

    id: number;

    objects: Stim[] = [];
    yokedObjects: Stim[] = [];
    distractors: Stim[] = [];
    objectsAndDistractors: Stim[];

    yokedUid: number;
    yokedHistory: {time: number, id: string, action: string}[] = [];
    

    constructor(
        id: number, 
        objs: Stim[],
        yokedObjects: Stim[],
        distractors: Stim[],
        yokedSession: any,
    ) {
        this.id = id;
        this.objects = objs;
        this.yokedObjects = yokedObjects;
        this.distractors = distractors;
        this.objectsAndDistractors = TestRound.shuffleArray(objs.concat(yokedObjects, distractors));

        this.yokedUid = yokedSession["uid"];
        this.yokedHistory = yokedSession["history"];
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
        return "TestRound: " + this.id;
    }

    public equals(obj: TestRound): boolean {
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
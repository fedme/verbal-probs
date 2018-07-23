export class Stim {

    id: string;
    type: StimType;

    hidden: boolean = true;
    borderOverride: string = null;
    revealedOnce: boolean = false;
    thinksSeenBefore: boolean;

    //isDistractor: boolean;

    observedTimes: number = 0;
    observedFor: number = 0;

    initialTimestamp: number;

    constructor(
        id,
        type: StimType
    ) {
        this.id = id;
        this.type = type;
    }

    get fileName() {
        return this.hidden ? "none" : this.id;
    }

    get borderColor(): string {
        if (this.borderOverride != null) return this.borderOverride;
        if (!this.hidden) return "red";
        return "gray";
    }

    public show() {

        this.revealedOnce = true;
        this.observedTimes++;
        this.initialTimestamp = Date.now();

        this.borderOverride = "red";

        setTimeout(() => {
            this.borderOverride = null;
            this.hidden = false;
        }, 500);

    }

    public hide() {
        this.observedFor = this.observedFor + (Date.now() - this.initialTimestamp);
        this.hidden = true;
    }

    public toggle() {
        this.hidden = !this.hidden;
    }

    public answerTest(answer: boolean) {
        this.thinksSeenBefore = answer;
    }

    public get isDistractor(): boolean {
        return this.type === StimType.Distractor;
    }

    public get isNormal(): boolean {
        return this.type === StimType.Normal;
    }

    public get isYoked(): boolean {
        return this.type === StimType.Yoked;
    }

    public toString(): string {
        return "FamObject: " + this.id;
    }

    public equals(obj: Stim) : boolean { 
        return this.id === obj.id;
    }

}

export enum StimType {
    Normal,
    Distractor,
    Yoked
}
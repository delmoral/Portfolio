export class ToneNote {
    note: string;
    attack: string;
    release: number;
    constructor(note: string, attack = '8n', release?) {
        this.note = note;
        this.attack = attack;
        this.release = release;
    }
}
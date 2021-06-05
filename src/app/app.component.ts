import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import * as Tone from 'tone'
import { ToneNote } from './models/tone-note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio-delmo';
  theme = 'dark';
  checkLenguaje = false;

  synth;
  song // : ToneNote[];
  songPosition = 0;

  private idiomas: Array<string>;

  // https://techclub.tajamar.es/internationalization-i18n-angular/
  // https://github.com/ngx-translate/core
  constructor(public translate: TranslateService, public router: Router) {
    this.idiomas = ['es', 'en'];
    translate.addLangs(this.idiomas);
    translate.setDefaultLang('es');

    this.synth = new Tone.PolySynth().toDestination();
    // Air bach
    this.song = [
      [new ToneNote("D3", "8n")],
      [new ToneNote("D4", "8n"), new ToneNote("D5", "4n")],
      [new ToneNote("Db4", "8n")],
      [new ToneNote("Db3", "8n")],

      [new ToneNote("B2", "8n")],
      [new ToneNote("B3", "8n"), new ToneNote("B4", "4n")],
      [new ToneNote("A3", "8n")],
      [new ToneNote("A2", "8n")],

      [new ToneNote("G2", "8n")],
      [new ToneNote("G3", "8n"), new ToneNote("G4", "4n")],
      [new ToneNote("Ab3", "8n")],
      [new ToneNote("Ab2", "8n")],

      [new ToneNote("A2", "8n")],
      [new ToneNote("A3", "8n"), new ToneNote("A4", "4n")],
      [new ToneNote("G3", "8n")],
      [new ToneNote("G2", "8n")],
    ]
  }

  changeSong(songName: string): void {
    // Re menor mozart
    // ["D3", "A3", "D4", "F4", "A4", "D5", "F5", "D5", "A6", "F5", "D5", "A4", "F4", "D4"]

    // const subacuaticVals = [
    //   "G3", ["Bb3", "D4"], ["Bb3", "D4"], "G3", ["Bb3", "D4"], ["Bb3", "Eb4"],
    //   "D3", ["A3", "D4"], ["A3", "D4"], "D3", ["A3", "D4"], ["A3", "C4"],

    //   "G3", ["Bb3", "D4"], ["Bb3", "D4"], "G3", ["Bb3", "D4"], ["Bb3", "Eb4"],
    //   "D3", ["A3", "D4"], ["A3", "D4"], "D3", ["A3", "D4"], ["A3", "C4"],

    //   "Eb3", ["G3", "C4"], ["G3", "C4"], "Eb3", ["G3", "C4"], ["G3", "D4"],
    //   "D3", ["A3", "D4"], ["A3", "D4"], "D3", ["A3", "D4"], ["A3", "C4"],

    //   "Eb3", ["G3", "C4"], ["G3", "C4"], "Eb3", ["G3", "C4"], ["G3", "D4"],
    //   "D3", ["A3", "D4"], ["A3", "D4"], "D3", ["Bb3", "D4"], ["A3", "D4"],

    //   ["G3", "Bb5"], ["Bb3", "D4", "A5"], ["Bb3", "D4", "G5"], ["G3", "A5"], ["Bb3", "D4", "G5"], ["Bb3", "Eb4", "F5"],
    //   ["D3", "G5"], ["A3", "D4", "F5"], ["A3", "D4", "D5"], ["D3", "C5"], ["A3", "D4"], ["A3", "C4"],

    //   ["G3", "Bb5"], ["Bb3", "D4", "A5"], ["Bb3", "D4", "G5"], ["G3", "A5"], ["Bb3", "D4", "G5"], ["Bb3", "Eb4", "F5"],
    //   ["D3", "G5"], ["A3", "D4", "F5"], ["A3", "D4", "D5"], ["D3", "C5"], ["A3", "D4"], ["A3", "C4"],

    //   ["Eb3", "C5"], ["G3", "C4", "D5"], ["G3", "C4", "Eb5"], ["Eb3", "F5"], ["G3", "C4", "Eb5"], ["G3", "D4", "D5"],
    //   ["D3", "Eb5"], ["A3", "D4", "D5"], ["A3", "D4", "C5"], ["D3", "D5"], ["A3", "D4", "C5"], ["A3", "C4", "Bb4"],

    //   ["Eb3", "C5"], ["G3", "C4", "D5"], ["G3", "C4", "Eb5"], ["Eb3", "F5"], ["G3", "C4", "Eb5"], ["G3", "D4", "D5"],
    //   ["D3", "Eb5"], ["A3", "D4", "D5"], ["A3", "D4", "C5"], ["D3", "A4"], ["Bb3", "D4"], ["A3", "D4"],
    // ]
  }

  changeTheme(): void {
    this.theme === 'dark' ? this.theme = 'light' : this.theme = 'dark';
  }

  changeLenguaje(): void {
    this.checkLenguaje = !this.checkLenguaje;
    if (this.checkLenguaje) this.translate.use('en');
    else this.translate.use('es');
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  playClickSong(): void {
    let note = this.song[this.songPosition];
    let now = Tone.now()
    console.log("Sound- ", this.song.length, this.songPosition, note, now, typeof note['release']);
    note.forEach(n => {
      this.synth.triggerAttackRelease(n['note'], n['attack'], now + (n['release'] ? n['release'] : 0));
    })
    if (this.songPosition === (this.song.length - 1)) this.songPosition = 0;
    else this.songPosition += 1
  }


  // https://tonejs.github.io/
  // https://howlerjs.com/
  // https://greensock.com/
}

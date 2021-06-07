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
  song = [];
  songPosition = 0;
  songMinLenght = 2;
  songEnabled = true;

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
      // jazz
      [new ToneNote("D2", "8n"), new ToneNote("A2", "8n", 0.11), new ToneNote("D3", "8n", 0.47), new ToneNote("F3", "8n", 0.47),
      new ToneNote("A3", "8n", 0.47), new ToneNote("C4", "8n", 0.47), new ToneNote("E4", "8n", 0.47)],
      [new ToneNote("G1", "8n"), new ToneNote("D2", "8n", 0.11), new ToneNote("G2", "8n", 0.47), new ToneNote("B2", "8n", 0.47),
      new ToneNote("D3", "8n", 0.47), new ToneNote("F3", "8n", 0.47), new ToneNote("A3", "8n", 0.47)],
      [new ToneNote("C2", "8n"), new ToneNote("G3", "8n", 0.11), new ToneNote("C3", "8n", 0.47), new ToneNote("E3", "8n", 0.47),
      new ToneNote("G3", "8n", 0.47), new ToneNote("B3", "8n", 0.47), new ToneNote("E4", "8n", 0.47)],
      [new ToneNote("A1", "8n"), new ToneNote("E2", "8n", 0.11), new ToneNote("A2", "8n", 0.47), new ToneNote("C3", "8n", 0.47),
      new ToneNote("E3", "8n", 0.47), new ToneNote("G3", "8n", 0.47), new ToneNote("B3", "8n", 0.47)],

      [new ToneNote("D2", "8n"), new ToneNote("A2", "8n", 0.11), new ToneNote("D3", "8n", 0.47), new ToneNote("F3", "8n", 0.47),
      new ToneNote("A3", "8n", 0.47), new ToneNote("C4", "8n", 0.47), new ToneNote("E4", "8n", 0.47)],
      [new ToneNote("G1", "8n"), new ToneNote("D2", "8n", 0.11), new ToneNote("G2", "8n", 0.47), new ToneNote("B2", "8n", 0.47),
      new ToneNote("D3", "8n", 0.47), new ToneNote("F3", "8n", 0.47), new ToneNote("A3", "8n", 0.47)],
      [new ToneNote("C2", "8n"), new ToneNote("G3", "8n", 0.11), new ToneNote("C3", "8n", 0.47), new ToneNote("E3", "8n", 0.47),
      new ToneNote("G3", "8n", 0.47), new ToneNote("C4", "8n", 0.47), new ToneNote("E4", "8n", 0.47)],
      [new ToneNote("C2", "8n"), new ToneNote("G3", "8n", 0.11), new ToneNote("B3", "8n", 0.47), new ToneNote("E3", "8n", 0.47),
      new ToneNote("G3", "8n", 0.47), new ToneNote("B3", "8n", 0.47), new ToneNote("E4", "8n", 0.47)],
    ]
  }

  changeSong(songName: string): void {
    //
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
    if(this.songEnabled){
      let now = Tone.now()
      let note = this.song[this.songPosition];
      console.log("Sound- ", this.song.length, this.songPosition, note, now, typeof note['release']);
      note.forEach(n => {
        this.synth.triggerAttackRelease(n['note'], n['attack'], now + (n['release'] ? n['release'] : 0));
      })
      if (this.songPosition === (this.song.length - 1)) this.songPosition = 0;
      else this.songPosition += 1
    }
  }

  toogleClickSong(): void  {
    this.songEnabled = !this.songEnabled;
  }

  // https://tonejs.github.io/
  // https://howlerjs.com/
  // https://greensock.com/
}

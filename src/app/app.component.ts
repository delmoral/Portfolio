import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as songConstants from './utils/songConstants';
import * as CONS from './utils/constants';

import * as Tone from 'tone'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme = CONS.THEME_DARK;
  checkLenguaje = false;

  synth;
  song = [];
  songPosition = 0;
  songMinLenght = 2;
  songEnabled = false;

  private idiomas: Array<string>;

  constructor(public translate: TranslateService, public router: Router) {
    this.idiomas = [CONS.LANG_ES, CONS.LANG_EN];
    translate.addLangs(this.idiomas);
    translate.setDefaultLang(CONS.LANG_EN);

    this.synth = new Tone.PolySynth().toDestination();
    this.synth.volume.value = -15;
    this.song = songConstants.SONG_PRELUDE;
  }

  changeTheme(): void {
    this.theme === CONS.THEME_DARK ? this.theme = CONS.THEME_LIGHT : this.theme = CONS.THEME_DARK;
  }

  changeLenguaje(): void {
    this.checkLenguaje = !this.checkLenguaje;
    if (this.checkLenguaje) this.translate.use(CONS.LANG_EN);
    else this.translate.use(CONS.LANG_ES);
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  playClickSong(): void {
    if (this.songEnabled) {
      let now = Tone.now()
      let note = this.song[this.songPosition];
      // console.log("Sound- ", this.song.length, this.songPosition, note, now, typeof note['release']);
      note.forEach(n => {
        this.synth.triggerAttackRelease(n['note'], n['attack'], now + (n['release'] ? n['release'] : 0));
      })
      if (this.songPosition === (this.song.length - 1)) this.songPosition = 0;
      else this.songPosition += 1
    }
  }

  toogleClickSong(): void {
    this.songEnabled = !this.songEnabled;
  }
}

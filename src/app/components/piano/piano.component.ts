import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit {

  synth;

  rounds = 3;

  constructor() {
    this.synth = new Tone.PolySynth().toDestination();
  }

  ngOnInit(): void {

  }

  startRound(): void {

  }

  itemHover(): void {

  }
}

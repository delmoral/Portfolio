import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PianoComponent } from './components/piano/piano.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'piano', component: PianoComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

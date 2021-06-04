import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio-delmo';
  theme = 'dark';
  checked = false;
  checkLenguaje = false;

  private idiomas: Array<string>;

  // https://techclub.tajamar.es/internationalization-i18n-angular/
  // https://github.com/ngx-translate/core
  constructor(public translate: TranslateService, public router: Router) {
    this.idiomas = ['es', 'en'];
    translate.addLangs(this.idiomas);
    translate.setDefaultLang('es');
  }

  changeTheme(): void {
    this.theme === 'dark' ? this.theme = 'light' : this.theme = 'dark';
  }

  changeLenguaje(): void{
    this.checkLenguaje = !this.checkLenguaje;
    if(this.checkLenguaje) this.translate.use('en');
    else this.translate.use('es');
  }
  
  navigateTo(url: string): void{
    this.router.navigateByUrl(url);
  }

  // https://tonejs.github.io/
  // https://howlerjs.com/
  // https://greensock.com/
}

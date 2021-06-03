import { Component } from '@angular/core';
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
  constructor(public translate: TranslateService) {
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
}

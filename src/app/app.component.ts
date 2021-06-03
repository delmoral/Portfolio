import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio-delmo';
  theme = 'dark';
  checked = false;

  // https://techclub.tajamar.es/internationalization-i18n-angular/

  changeTheme(): void {
    this.theme === 'dark' ? this.theme = 'light' : this.theme = 'dark';
  }
}

import { Component } from '@angular/core';

import { navItems } from './_nav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',

})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private translate: TranslateService) {}

  switchLanguage(lang: string){
    this.translate.use(lang);
  }
}

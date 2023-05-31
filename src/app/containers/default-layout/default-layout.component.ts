import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { TranslateService } from '@ngx-translate/core';
import { INavData } from '@coreui/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnInit() {
    this.translateSidebarMenu();

  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    console.log(this.translate.use(lang));
  }

  translateSidebarMenu() {
    for (const item of this.navItems) {
      const translationKey = item.name || '';
      this.translate.get(translationKey).subscribe((translation: string) => {
        item.name = translation;
        console.log(translation);
      });
  
     
    }
  }
  
  


  
  
  
}

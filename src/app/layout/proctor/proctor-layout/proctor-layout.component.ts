import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import { DARK_THEME, LIGHT_THEME, LOCAL_HOST } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-proctor-layout',
  templateUrl: './proctor-layout.component.html',
  styleUrls: ['./proctor-layout.component.css',
    '../../../../../public/dashboard-assets/dist/libs/plyr/dist/plyr.css',
    '../../../../../public/dashboard-assets/dist/css/tabler.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-payments.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-vendors.min.css',
    '../../../../../public/dashboard-assets/dist/css/demo.min.css',

  ],
  encapsulation:ViewEncapsulation.None,
})
export class ProctorLayoutComponent {
  lightTheme = LIGHT_THEME;
  darkTheme = DARK_THEME;
  constructor(protected authService:AuthService) {

  }
  ngOnInit(): void {
    console.log('remove', 'load')

    this.removeScripts();
    this.loadScripts();
  }

  loadScripts() {
    const dynamicScripts = [
      `${LOCAL_HOST}/dashboard-assets/dist/js/demo-theme.min.js`,
      `${LOCAL_HOST}/dashboard-assets/dist/js/tabler.min.js`,
      `${LOCAL_HOST}/dashboard-assets/dist/js/demo.min.js`,
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }

  removeScripts() {


      const scripts = Array.from(document.getElementsByTagName('script'));
      scripts.forEach(script => {
        if (script != null && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });


  }
}

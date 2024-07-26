import {Component, ViewEncapsulation, ChangeDetectorRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css',
    '../../../../../public/dashboard-assets/dist/libs/plyr/dist/plyr.css',
    '../../../../../public/dashboard-assets/dist/css/tabler.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-payments.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-vendors.min.css',
    '../../../../../public/dashboard-assets/dist/css/demo.min.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent  implements OnInit {
  constructor() {

  }
  ngOnInit(): void {
    console.log('remove', 'load')
    this.removeScripts();
    this.loadScripts();
  }

  loadScripts() {
    const dynamicScripts = [
      'http://localhost:4200/dashboard-assets/dist/js/demo-theme.min.js',
      'http://localhost:4200/dashboard-assets/dist/js/tabler.min.js',
      'http://localhost:4200/dashboard-assets/dist/js/demo.min.js',
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

    if (document.getElementsByTagName('script') != null) {
      const scripts = Array.from(document.getElementsByTagName('script'));
      scripts.forEach(script => {
        if (script != null && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    }

  }
}





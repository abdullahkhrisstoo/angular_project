import { Component } from '@angular/core';

@Component({
  selector: 'app-proctor-layout',
  templateUrl: './proctor-layout.component.html',
  styleUrl: './proctor-layout.component.css'
})
export class ProctorLayoutComponent {
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


      const scripts = Array.from(document.getElementsByTagName('script'));
      scripts.forEach(script => {
        if (script != null && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });


  }
}

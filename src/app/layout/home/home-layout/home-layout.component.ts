import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls:  ['./home-layout.component.css',
    '../../../../../public/home-assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../../../../public/home-assets/vendor/bootstrap-icons/bootstrap-icons.css',
    '../../../../../public/home-assets/vendor/aos/aos.css',
    '../../../../../public/home-assets/vendor/glightbox/css/glightbox.min.css',
    '../../../../../public/home-assets/vendor/swiper/swiper-bundle.min.css',
    '../../../../../public/home-assets/css/main.css'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeLayoutComponent  implements OnInit {
  constructor() {

  }
  ngOnInit(): void {
    console.log('remove', 'load')
    this.removeScripts();
    this.loadScripts();
  }

  // Method to dynamically load JavaScript
  loadScripts() {
    // This array contains all the files/CDNs


    const dynamicScripts = [
      'http://localhost:4200/home-assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
      'http://localhost:4200/home-assets/vendor/php-email-form/validate.js',
      'http://localhost:4200/home-assets/vendor/aos/aos.js',
      'http://localhost:4200/home-assets/vendor/glightbox/js/glightbox.min.js',
      'http://localhost:4200/home-assets/vendor/purecounter/purecounter_vanilla.js',
      'http://localhost:4200/home-assets/vendor/swiper/swiper-bundle.min.js',
      'http://localhost:4200/home-assets/js/main.js'
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


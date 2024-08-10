import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ADMIN_ROLE, DARK_THEME, EXAM_PROVIDER_ROLE, LIGHT_THEME, LOCAL_HOST, PROCTOR_ROLE } from '../../../core/constants/app.constants';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { CurrentUserData } from '../../../core/models/current-user-data';
import { NgxSpinnerService } from 'ngx-spinner';

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
  lightTheme = LIGHT_THEME;
  darkTheme = DARK_THEME;
  constructor(private router: Router,private localStorageService:LocalStorageService,private spinner: NgxSpinnerService) {

  }

  isExist=false;
  ngOnInit(): void {
    console.log('remove', 'load')
    this.removeScripts();
    this.loadScripts();

    const user= <CurrentUserData> this.localStorageService.getItem(this.localStorageService.USER_SESSION_KEY);


   if(user !=null && user.roleId){
     this.isExist=true;
    }


  }

  // Method to dynamically load JavaScript
  loadScripts() {
    // This array contains all the files/CDNs


    const dynamicScripts = [
      `${LOCAL_HOST}/home-assets/vendor/bootstrap/js/bootstrap.bundle.min.js`,
      `${LOCAL_HOST}/home-assets/vendor/php-email-form/validate.js`,
      `${LOCAL_HOST}/home-assets/vendor/aos/aos.js`,
      `${LOCAL_HOST}/home-assets/vendor/glightbox/js/glightbox.min.js`,
      `${LOCAL_HOST}/home-assets/vendor/purecounter/purecounter_vanilla.js`,
      `${LOCAL_HOST}/home-assets/vendor/swiper/swiper-bundle.min.js`,
      `${LOCAL_HOST}/home-assets/js/main.js`,
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

  goToDash(){
    const user= <CurrentUserData> this.localStorageService.getItem(this.localStorageService.USER_SESSION_KEY);

    if(user.roleId){
     switch (user.roleId) {
       case EXAM_PROVIDER_ROLE:
         this.router.navigate(['/exam-provider/profile']);
         break;
       case PROCTOR_ROLE:
         this.router.navigate(['/proctor/profile']);
         break;
       case ADMIN_ROLE:
         this.router.navigate(['/admin/profile']);
         break;
       default:
         console.warn('Unknown role:', user.roleId);
         break;
     }
    }
  }


}



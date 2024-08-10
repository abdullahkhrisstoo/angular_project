import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { LOCAL_HOST, EXAM_PROVIDER_ROLE, LIGHT_THEME, DARK_THEME } from '../../../core/constants/app.constants';
import {AuthService} from "../../../core/services/auth.service";
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css',
    '../../../../../public/dashboard-assets/dist/libs/plyr/dist/plyr.css',
    '../../../../../public/dashboard-assets/dist/css/tabler.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-payments.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-vendors.min.css',
    '../../../../../public/dashboard-assets/dist/css/demo.min.css',

  ],
  encapsulation:ViewEncapsulation.None,
})
export class AdminLayoutComponent  implements OnInit {
  lightTheme = LIGHT_THEME;
  darkTheme = DARK_THEME;

  notifications: any[] = [];
  constructor(protected authService:AuthService,private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    console.log('remove', 'load')

    this.removeScripts();
    this.loadScripts();

    try{
      this.notificationService.notifications$.subscribe(notification => {

        this.notifications.push(notification);
        sessionStorage.setItem('messages', JSON.stringify(this.notifications));
        console.log('Notification in component:', notification);
      });

    }
    catch(e){}

    const savedMessages = sessionStorage.getItem('messages');
    this.notifications = savedMessages ? JSON.parse(savedMessages) : [];

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

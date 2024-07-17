import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css',
  encapsulation: ViewEncapsulation.None, 
})
export class HomeLayoutComponent  implements AfterViewInit{
  ngAfterViewInit(): void {
    AOS.init();
  }
}


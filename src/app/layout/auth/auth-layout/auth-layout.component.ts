import { Component, ViewEncapsulation ,ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  encapsulation: ViewEncapsulation.ShadowDom, 
})
export class AuthLayoutComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}





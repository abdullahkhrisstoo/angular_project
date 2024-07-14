// // app.component.ts

// import { Component, OnInit } from '@angular/core';
// import { ThemeService } from './core/theme.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   constructor(private themeService: ThemeService) {}

//   ngOnInit() {
//     this.applyTheme(this.themeService.getCurrentTheme());
//   }

//   private applyTheme(theme: 'light-theme' | 'dark-theme') {
//     const body = document.body;
//     body.classList.remove('light-theme', 'dark-theme');
//     body.classList.add(theme);
//   }
// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'system-gaurdian';
}

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { HomeModule } from './layout/home/home.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { SpinnerService } from './core/services/spinner.service';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SafeUrlPipe } from './core/pipes/safe-url.pipe';
import { UnsavedChangesDirective } from './core/directive/unsaved-changes.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    HomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',  // Updated position
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      tapToDismiss: true
    }),
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),

    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

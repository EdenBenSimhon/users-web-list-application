import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    CoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  exports: [HeaderComponent],
})
export class AppModule {}

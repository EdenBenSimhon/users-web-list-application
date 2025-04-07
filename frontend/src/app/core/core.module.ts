import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Import your services here
import { UserService } from './services/user.service';

// Import interceptors
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  exports: [CommonModule],
})
export class CoreModule {}

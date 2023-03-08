import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { SseService } from './core/services/business/SseService';
import { ConversionsService } from './core/services/business/ConversionsService';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [SseService, ConversionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Services
import { FileManagementService } from './services/file-management.service';

// Components
import { AppComponent } from './app.component';
import { SlideViewComponent } from './slide-view/slide-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [FileManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }

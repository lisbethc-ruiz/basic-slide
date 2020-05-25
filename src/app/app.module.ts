import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms"

// Services
import { PresentationService } from './services/presentation.service';

// Components
import { AppComponent } from './app.component';
import { PresentationListComponent } from './presentation-list/presentation-list.component';
import { PresentationEditComponent } from './presentation-edit/presentation-edit.component';
import { PresentationViewComponent } from './presentation-view/presentation-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationListComponent,
    PresentationEditComponent,
    PresentationViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PresentationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

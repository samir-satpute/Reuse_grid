import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GridViewComponent } from './grid-view/grid-view.component';

@NgModule({
  declarations: [
    AppComponent,
    GridViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule  {
 }

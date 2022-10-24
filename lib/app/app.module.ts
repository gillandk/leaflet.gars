import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

import { GarsComponent } from './gars.component';

@NgModule({
  declarations: [GarsComponent],
  imports: [BrowserModule, LeafletModule],
  providers: [],
  bootstrap: [GarsComponent],
})
export class AppModule {}

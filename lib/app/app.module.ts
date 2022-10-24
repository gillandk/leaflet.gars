import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { GarsComponent } from './gars.component';

@NgModule({
  bootstrap: [GarsComponent],
  declarations: [GarsComponent],
  imports: [BrowserModule, LeafletModule],
  providers: [],
})
export class AppModule {}

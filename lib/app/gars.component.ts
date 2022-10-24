import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GARSLayer } from './grid/GARSLayer';

@Component({
  selector: 'gars',
  styleUrls: ['./gars.component.scss'],
  templateUrl: './gars.component.html',
})
export class GarsComponent implements OnInit {
  public layersControl: any = {};

  public ngOnInit(): void {
    this.layersControl = {
      baseLayers: {
        'Open Street Map': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }),
      },
      overlays: {
        GARS: L.GridLayer.extend(new GARSLayer()),
      },
    };
  }

  public onMapReady(map: L.Map) {
    map.setView(new L.LatLng(0, 0), 3);
  }
}

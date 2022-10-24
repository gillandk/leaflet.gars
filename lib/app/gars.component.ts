import { Component } from '@angular/core';
import * as L from 'leaflet';
import { GARSLayer } from './grid/GARSLayer';

@Component({
  selector: 'gars',
  templateUrl: './gars.component.html',
  styleUrls: ['./gars.component.scss'],
})
export class GarsComponent {
  constructor() {}

  onMapReady(map: L.Map) {
    map.setView(new L.LatLng(0, 0), 3);

    // create the tile layer with correct attribution
    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = '&copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm = new L.TileLayer(osmUrl, { minZoom: 1, maxZoom: 20, attribution: osmAttrib });

    map.addLayer(osm);

    //const gars = new GARSLayer();
    //map.addLayer(gars);

    L.control
      .layers({
        osm: osm,
      })
      .addTo(map);
  }
}

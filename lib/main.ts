import L from "leaflet";
import { GARSLayer } from "./grid/GARSLayer";

const map = L.map('map');

const gars = new GARSLayer();
map.addLayer(gars);
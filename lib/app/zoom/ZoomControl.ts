import { Control, ControlOptions, DomUtil, LeafletEvent, Map } from 'leaflet';

export class ZoomControl extends Control {
  private map?: Map;
  private zoomDisplay?: HTMLElement;

  constructor(options?: ControlOptions) {
    super(options);
  }

  /**
   * @inheritdoc
   */
  public onAdd?(map: Map): HTMLElement {
    this.map = map;
    this.zoomDisplay = DomUtil.create('div', 'leaflet-bar-part leaflet-bar');
    this.updateZoomDisplay(map.getZoom());
    map.on('zoomend', this.onMapZoomEnd, this);
    return this.zoomDisplay;
  }

  /**
   * @inheritdoc
   */
  public onRemove?(map: Map): void {
    map.off('zoomend', this.onMapZoomEnd, this);
  }

  /**
   * @inheritdoc
   */
  public onMapZoomEnd(e: LeafletEvent) {
    this.updateZoomDisplay(this.map.getZoom());
  }

  private updateZoomDisplay(zoom: number) {
    this.zoomDisplay.innerHTML = 'Zoom: ' + zoom.toString();
  }
}

import { Grids, GridType, ZoomGrids } from '@ngageoint/gars-js';
import { GridTile } from '@ngageoint/grid-js';
import { GridLayer, Coords, DoneCallback, DomUtil, GridLayerOptions } from 'leaflet';
import { TileDraw } from './TileDraw';

export class GARSLayer extends GridLayer {
  private readonly grids: Grids;

  constructor(options?: GridLayerOptions, gridTypes?: GridType[]) {
    super(options);
    this.grids = Grids.create(gridTypes);
  }

  /** @inheritdoc */
  protected createTile(coords: Coords, done: DoneCallback): HTMLElement {
    // create a <canvas> element for drawing
    const tile = DomUtil.create('canvas', 'leaflet-tile') as HTMLCanvasElement;

    // setup tile width and height according to the options
    const size = this.getTileSize();
    tile.width = size.x;
    tile.height = size.y;

    // get a canvas context and draw something on it using coords.x, coords.y and coords.z
    const ctx = tile.getContext('2d');

    this.drawTile(tile, coords.x, coords.y, this._map.getZoom())
      .then((bitmap) => {
        done(undefined, tile);
      })
      .catch((err) => {
        done(err);
      });

    // return the tile so it can be rendered on screen
    return tile;
  }

  /**
   * Draw the tile
   *
   * @param x    x coordinate
   * @param y    y coordinate
   * @param zoom zoom level
   * @return bitmap
   */
  public drawTile(tile: HTMLCanvasElement, x: number, y: number, zoom: number): Promise<ImageBitmap | undefined> {
    let bitmap: Promise<ImageBitmap | undefined>;
    const zoomGrids = this.grids.getGrids(zoom);
    if (zoomGrids!.hasGrids()) {
      bitmap = this.drawTileFromTile(tile, GridTile.tile(tile.width, tile.height, x, y, zoom), zoomGrids!);
    }
    return bitmap!;
  }

  /**
   * Draw the tile
   *
   * @param gridTile  tile
   * @param zoomGrids zoom grids
   * @return bitmap tile
   */
  private drawTileFromTile(tile: HTMLCanvasElement, gridTile: GridTile, zoomGrids: ZoomGrids): Promise<ImageBitmap> {
    const canvas = tile.getContext('2d');
    const imageData = canvas!.createImageData(gridTile.getWidth(), gridTile.getHeight());

    for (const grid of zoomGrids.getGrids()) {
      const lines = grid.getLinesFromGridTile(gridTile);
      if (lines) {
        TileDraw.drawLines(lines, gridTile, grid, canvas!);
      }

      const labels = grid.getLabelsFromGridTile(gridTile);
      if (labels) {
        TileDraw.drawLabels(labels, gridTile, grid, canvas!);
      }
    }

    return createImageBitmap(imageData);
  }
}

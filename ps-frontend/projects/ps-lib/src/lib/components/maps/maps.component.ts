import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as ol from 'ol';
import * as geom from 'ol/geom';
import * as layer from 'ol/layer';
import * as source from 'ol/source';
import * as interaction from 'ol/interaction';
import * as control from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import Projection from 'ol/proj/Projection';
import * as extent from 'ol/extent';

import { IPopup, PopupETypes } from '../../../model/intefaces';
import { Location } from '../../../model/location';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'lib-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements IPopup, AfterViewInit, OnInit {
  public events: EventEmitter<{ event: PopupETypes, data?: any }> = new EventEmitter<{ event: PopupETypes, data?: any }>();

  public mapId = 'map-' + Math.floor(Date.now() / 1000);

  private view: ol.View;
  private map: ol.Map;
  private pointer: any;

  private srid: number;
  private defaultX: number;
  private defaultY: number;

  protected _location: Location;

  @Output() clicked: EventEmitter<Location> = new EventEmitter();
  @Input() clickable = false;
  @Input() controls = false;
  @Input() currentLocation = false;

  @Input() classes: string = '';

  @Input() set location(location: Location) {
    if (location && location.x && location.y) {
      this._location = location;
      this.setMapPosition();
    }

    return;
  }

  constructor(protected config: ConfigService) {
    this.srid = this.config.getCompany().srid;
    this.defaultX = this.config.getCompany().x;
    this.defaultY = this.config.getCompany().y;
  }

  public ngOnInit(): void {
    if (!this._location) {
      this._location = new Location();
    }
  }

  public ngAfterViewInit(): void {
    var projectionExtent: extent.Extent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
    var projection = new Projection({ code: 'EPSG:' + this.srid, units: 'm', extent: projectionExtent });
    var resolutions = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210];
    var matrixIds = new Array(15);
    for (var z = 0; z < 15; ++z) {
      matrixIds[z] = 'EPSG:' + this.srid + ':' + z;
    }

    const controls = !this.controls ? [] : control.defaults({
      attributionOptions: {
        collapsible: false
      }
    });

    const interactions = !this.controls ? [] : interaction.defaults({});

    this.map = new ol.Map({
      layers: [
        new layer.Tile({
          opacity: 0.7,
          source: new source.WMTS({
            attributions: '&copy; <a href="https://www.kadaster.nl">Kadaster</a>',
            url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
            layer: 'standaard',
            matrixSet: 'EPSG:' + this.srid,
            format: 'image/png',
            projection: projection,
            tileGrid: new WMTSTileGrid({
              origin: extent.getTopLeft(projectionExtent),
              resolutions: resolutions,
              matrixIds: matrixIds
            }),
            style: 'default',
            wrapX: false
          })
        })
      ],
      target: this.mapId,
      controls: controls,
      interactions: interactions,
      view: new ol.View({
        minZoom: 0,
        maxZoom: 15,
        projection: projection,
        center: [this.defaultX, this.defaultY],
        zoom: !this.controls ? 11 : 6 
      })
    });
    
    this.map.on('singleclick', (event) => {
      this.click(event);
    });
    
    setTimeout(() => {
      this.setMapPosition();
    });
  }

  public setMapPosition(): void {
    if (this.map && this._location && this._location.x && this._location.y) {
      console.log(this._location);
      this.setPointer(this._location.x, this._location.y);
    }
  }

  public click(event): void {
    if (!this.clickable) {
      return;
    }

    this._location.x = event.coordinate[0];
    this._location.y = event.coordinate[1];

    this.clicked.emit(this._location);

    setTimeout(() => {
      this.setPointer(event.coordinate[0], event.coordinate[1]);
    });
  }

  public setPointer(x, y): void {
    if (this.pointer) {
      this.map.removeLayer(this.pointer);
    }
    const coordinate = [x, y];
    this.pointer = new layer.Vector({
      source: new source.Vector({
        features: [
          new ol.Feature({
            geometry: new geom.Point(coordinate)
          })
        ]
      })
    });
    this.map.addLayer(this.pointer);
    this.map.getView().animate({ center: coordinate, duration: 200 });
  }
}

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
  public events: EventEmitter<{event: PopupETypes, data?: any}> = new EventEmitter<{event: PopupETypes, data?: any}>();


  private view: ol.View;
  private map: ol.Map;
  private pointer: any;

  private srid: number;
  private defaultX: number;
  private defaultY: number;

  protected _location: Location;

  @Output() clicked: EventEmitter<Location> = new EventEmitter();
  @Input() clickable = true;
  @Input() zoom = false;
  @Input() pan = false;
  @Input() zoomControl = false;
  @Input() currentLocation = false;

  @Input() classes: string = '';

  @Input() set location(location: Location) {
    if (location && location.x && location.y) {
      this._location = location;
      //this.setMapPosition();
    }

    return;
  }

  constructor(protected config: ConfigService) {
    this.srid = this.config.getCompany().srid;
    this.defaultX = this.config.getCompany().x;
    this.defaultY = this.config.getCompany().y;
  }

  public ngOnInit(): void {
    /*this.options.scrollWheelZoom = this.zoom;
    this.options.touchZoom = this.zoom;
    this.options.keyboard = this.zoom;
    this.options.dragging = this.pan;*/

    if (!this._location) {
      this._location = new Location();
    }
  }
  
  public ngAfterViewInit():void {
    var projectionExtent: extent.Extent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
    var projection = new Projection({ code: 'EPSG:' + this.srid, units: 'm', extent: projectionExtent});
    var resolutions = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210];
    var matrixIds = new Array(15);
    for (var z = 0; z < 15; ++z) {
        matrixIds[z] = 'EPSG:' + this.srid + ':' + z;
    }

    this.map = new ol.Map({
      layers: [
          new layer.Tile({
              opacity: 0.7,
              source: new source.WMTS({
                  attributions: '&copy; <a href="https://www.kadaster.nl">Kadaster</a>',
                  url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
                  //layer: 'brtachtergrondkaart',
                  //layer: 'brtachtergrondkaartgrijs',
                  layer: 'brtachtergrondkaartpastel',

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
      target: 'map',
      controls: control.defaults({
          attributionOptions: {
              collapsible: false
          }
      }),
      view: new ol.View({
          minZoom: 0,
          maxZoom: 15,
          projection: projection,
          center: [this.defaultX, this.defaultY],
          zoom: 6
      })
  });
  this.map.on('singleclick', (event) => {
    console.log(event, event.coordinate);
    this.click(event);
  });
    //var fromProjection = new Projection({ code: 'EPSG:28992', units: 'm' });
    //var toProjection = new Projection({ code: "EPSG:4326" });   // Transform from WGS 1984
    //var center = new OpenLayers.LonLat(-1.83, 52.60).transform(fromProjection, toProjection);
    
    //var geometry = new geom.Point([this.defaultLon, this.defaultLat]);
 


        //map.setCenter(position, zoom);
    /*const coordinate = proj.fromLonLat([this.defaultLon, this.defaultLat]);
    this.view = new ol.View({
      center: coordinate,
      zoom: 12
    });

    this.map = new ol.Map({
      layers: [new TileLayer({
        source: new OSM({})
      })],
      target: 'map',
      view: this.view,

      interactions: interaction.defaults({
        doubleClickZoom: this.zoom,
        dragPan: this.pan,
        mouseWheelZoom: this.zoom
      }),

      controls: control.defaults({
        attribution: false,
        zoom: this.zoom,
      })
    });

    this.map.on('singleclick', (event) => {
      this.click(event);
    });*/
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
    this.map.getView().animate({center: coordinate, duration: 200});
  }

  /*public streetMaps =
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: false,
      attribution: '&copy;'
    });

  public center = latLng(this.defaultLat, this.defaultLon);

  protected pointerCurrentLocation = marker(this.center, {
    icon: icon({
      iconUrl: 'assets/images/lokatie_persoon.svg',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    })
  });

  private destinationIcon = icon({
    iconUrl: 'assets/images/lokatie_bestemming.svg',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15] // point from which the popup should open relative to the iconAnchor
  });

  protected pointer = marker(this.center, {
    icon: this.destinationIcon
  });

  public options = {
    layers: [this.streetMaps, this.pointer],
    zoomControl: false,
    zoom: 15,
    minZoom: 0,
    maxZoom: 18,
    center: this.center,
    scrollWheelZoom: false,
    touchZoom: false,
    keyboard: false,
    dragging: false
  };*/

  

  public leafletMapReady(map: any) {
    /*this.map = map;

    if (this.zoomControl) {
      map.addControl(control.zoom({ position: 'topleft' }));
    }

    if (navigator) {
      this.setCurrentLocation();
    }*/
  }

  /*public setCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
      if (!this.currentLocationAdded) {
        marker(currentPosition, {
          icon: icon({
            iconUrl: 'assets/images/lokatie_persoon.svg',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
          })
        }).bindPopup('U bent nu hier!').addTo(this.map);
      }
      this.currentLocationAdded = true;
    });
  }

  public setMapPosition(): void {
    if (this._location) {
      this.center.lat = this._location.latitude;
      this.center.lng = this._location.longitude;
      this.pointer.setLatLng(this.center);
      if (this.map) {
        this.map.panTo(this.center);
      }
    }
  }*/

  //public click(map: any): void {
    /*if (!this.clickable) {
      return;
    }
    this.center.lat = map.latlng.lat;
    this.center.lng = map.latlng.lng;

    this._location.latitude = map.latlng.lat;
    this._location.longitude = map.latlng.lng;
    this.clicked.emit(this._location);

    setTimeout(() => {
      this.setMapPosition();
    }, 100);*/
  //}
}

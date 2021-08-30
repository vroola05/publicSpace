import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as ol from 'ol';
import * as geom from 'ol/geom';
import * as layer from 'ol/layer';
import * as source from 'ol/source';
import * as interaction from 'ol/interaction';
import * as control from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj'

import { IPopup, PopupETypes } from '../../../model/intefaces';
import { Location } from '../../../model/location';

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

  private currentLocationAdded = false;
  private defaultLat = 31.772386;
  private defaultLon = 35.203788;

  protected _location: Location;

  @Output() clicked: EventEmitter<Location> = new EventEmitter();
  @Input() clickable = false;
  @Input() zoom = false;
  @Input() pan = false;
  @Input() zoomControl = false;
  @Input() currentLocation = false;

  @Input() classes: string = '';

  @Input() set location(location: Location) {
    if (location && location.latitude && location.longitude) {
      this._location = location;
      //this.setMapPosition();
    }

    return;
  }

  
  public ngAfterViewInit():void {
    this.view = new ol.View({
      center: proj.fromLonLat([this.defaultLon, this.defaultLat]),
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
    });
  }

  public click(event): void {
    var lonLat = proj.toLonLat(event.coordinate);
    
    if (!this.clickable) {
      return;
    }

    this._location.latitude = lonLat[1];
    this._location.longitude = lonLat[0];

    this.clicked.emit(this._location);

    setTimeout(() => {
      this.setPointer(lonLat[0], lonLat[1]);
    });
  }

  public setPointer(lon, lat): void {
    if (this.pointer) {
      this.map.removeLayer(this.pointer);
    }
    const coordinate = proj.fromLonLat([lon, lat]);
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

  constructor() {
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

  public leafletMapReady(map: any) {
    console.log(map);
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

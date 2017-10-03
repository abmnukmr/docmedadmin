import {Injectable, NgZone} from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation,Geoposition} from '@ionic-native/geolocation';
import {throttle} from "rxjs/operator/throttle";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import "rxjs/add/operator/filter";

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocationProvider {
  lngi: any;

  lat: any = 0;
  lng: any = 0;
  watch: any;

  constructor(private geolocation: Geolocation, public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation) {

    this.startTracking();
  }


  startTracking() {

    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      notificationTitle:"MED7",
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

    });

  }


  stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();


  }



}

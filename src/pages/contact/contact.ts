import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {LocationProvider} from "../../providers/location/location";
import {Http, RequestOptions,Headers} from "@angular/http";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  data:any;
  update:any;
  loading:any;
  items:any;
  filtter:any;
  title:any;

  constructor(public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public Loc:LocationProvider) {

    this.loading = this.loadingCtrl.create({
      content:"wait..."
    });

    this.load(this.Loc.lat,this.Loc.lng)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HosptalListPage');
  }





  load(lati,lngi)
  {

    if(this.data) {

      return new Promise(resolve => {

        this.http.get('https://quiet-ridge-46090.herokuapp.com/hospital/list').map(res => res.json()).subscribe(data => {

          this.data = this.applyHaversine(data,lati,lngi);

          this.data.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          });

          resolve(this.data);
          console.log(this.data)

        });

      });
    }

    return new Promise(resolve => {

      this.http.get('https://quiet-ridge-46090.herokuapp.com/hospital/list').map(res => res.json()).subscribe(data => {

        this.data = this.applyHaversine(data,lati,lngi);

        this.data.sort((locationA, locationB) => {
          return locationA.distance - locationB.distance;
        });

        resolve(this.data);
        console.log(this.data)
      });

    });



  }

  applyHaversine(locations,lati,lngi){

    let usersLocation = {
      lat:lati,
      lng: lngi
    };

    locations.map((location) => {

      let placeLocation = {
        lat: location.lat,
        lng: location.lng,
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'km'
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x){
    return x * Math.PI / 180;

  }


  hide(em){
    this.loading.present();

    this.update = {
      "name":"xxxxxxx",
      "age":"xxxxx",
      "sex":"xxxxx",
      "phone":"xxxxx"
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers:headers});

    this.http.post("https://quiet-ridge-46090.herokuapp.com/hide/hospital/" + em, JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
      this.load(this.Loc.lat,this.Loc.lng);

      this.loading.dismiss()
      //this.navCtrl.push(WalletPage);
    }, err => {
      this.load(this.Loc.lat,this.Loc.lng);
      this.loading.dismiss()
      console.log("Error!:", err);
    });


  }

  show(em){
    this.loading.present();

    this.update = {
      "name":"xxxxxxx",
      "age":"xxxxx",
      "sex":"xxxxx",
      "phone":"xxxxx"
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers:headers});

    this.http.post("https://quiet-ridge-46090.herokuapp.com/show/hospital/" + em, JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
     this.load(this.Loc.lat,this.Loc.lng);

      this.loading.dismiss()
      //this.navCtrl.push(WalletPage);
    }, err => {
     this.load(this.Loc.lat,this.Loc.lng);

      this.loading.dismiss()
      console.log("Error!:", err);
    });

  }



  delete(em){
    this.loading.present();

    this.update = {
      "name":"xxxxxxx",
      "age":"xxxxx",
      "sex":"xxxxx",
      "phone":"xxxxx"
    }
    console.log("updated start");
    var headers = new Headers();
    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers:headers});

    this.http.post("https://quiet-ridge-46090.herokuapp.com/delete/hospital/" + em, JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
      this.load(this.Loc.lat,this.Loc.lng);

      this.loading.dismiss();

      //this.navCtrl.push(WalletPage);
    }, err => {
      this.load(this.Loc.lat,this.Loc.lng);

      this.loading.dismiss();

      console.log("Error!:", err);
    });

  }


  initializeItems(){

    this.items=this.data;

  }


  getItems(ev) {
    //  this.searching = true;
    // Reset items back to all of the items
    this.initializeItems();
    //this.listshow=true;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items



    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        this.filtter=this.title;
        console.log(this.filtter);
        return (item.catagory.toLowerCase().indexOf(val.toLowerCase()) > -1);


      })
    }




  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import {HttpClient} from "@angular/common/http";

/*
  Generated class for the PassadminProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PassadminProvider {

  data:any;
  constructor(public http: Http) {
    console.log('Hello DoctordataProvider Provider');
  }
  getdata(){

    if (this.data) {
      console.log("g");
      // return Promise.resolve(this.data);
      return new Promise(resolve => {


        this.http.get(' https://quiet-ridge-46090.herokuapp.com/admin/pass/log')
          .map(res => res.json())
          .subscribe(data => {
              this.data = data;
              resolve(this.data);
              //console.log(data);
              console.log("reloded");

            },
            err => {
              this.data = null;

              console.log("Oops!");

            }
          );


      });


    }

    return new Promise(resolve => {


      this.http.get('https://quiet-ridge-46090.herokuapp.com/admin/pass/log')
        .map(res => res.json())
        .subscribe(data => {
            this.data = data;
            resolve(this.data);
            //console.log(data);
            console.log("ghdgggg");


          },

          err => {
            //          this.data={"error":"error"};
            console.log("Oops");

            //  return this.errror=2;


          },
          ()=>{
            console.log("Done");
//              errror=2;

            //return this.errror=2;

          }
        );


    });
  }




}

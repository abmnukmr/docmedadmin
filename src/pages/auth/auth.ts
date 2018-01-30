import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {PassadminProvider} from "../../providers/passadmin/passadmin";

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {


  creddata:any
  searching:boolean=true;
  ID:string;
  Password:string;
  constructor(public docdata:PassadminProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }


  laoddata(){
    this.docdata.getdata().then((data)=>{
      this.creddata=data;
      console.log(this.creddata.user + this.creddata.password);
      this.searching=false;

    })
  }



  login(id,pass){
    // console.log(this.ID+"   "+this.Password +"    " + "   "+this.creddata.user +"   "+this.creddata.password)
    if(this.creddata.user ==this.ID && this.creddata.password==this.Password)
    {
      this.navCtrl.setRoot(TabsPage);

    }
    else {
      this.ID="";
      this.Password="";
      alert("Invalid Credentials" )
    }

  }




  ionViewDidEnter(){
    this.laoddata();
  }
}

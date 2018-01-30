import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AyurvedaPage} from "../pages/ayurveda/ayurveda";
import {HomeopathyPage} from "../pages/homeopathy/homeopathy";
import {PathalogyPage} from "../pages/pathalogy/pathalogy";
import {HttpModule} from "@angular/http";
import { LocationProvider } from '../providers/location/location';
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import {Geolocation} from "@ionic-native/geolocation";
import {AuthPage} from "../pages/auth/auth";
import { PassadminProvider } from '../providers/passadmin/passadmin';
import {SearchPipe} from "../pipes/search/search";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AyurvedaPage,
    HomeopathyPage,
    PathalogyPage,
    AuthPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,

    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AyurvedaPage,
    HomeopathyPage,
    PathalogyPage,
    AuthPage
  ],
  providers: [
    StatusBar,
    SplashScreen, BackgroundGeolocation,Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider,
    PassadminProvider
  ]
})
export class AppModule {}

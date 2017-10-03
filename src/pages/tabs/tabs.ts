import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {AyurvedaPage} from "../ayurveda/ayurveda";
import {PathalogyPage} from "../pathalogy/pathalogy";
import {HomeopathyPage} from "../homeopathy/homeopathy";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  tab4Root = AyurvedaPage;
  tab5Root = PathalogyPage;
  tab6Root = HomeopathyPage;

  constructor() {

  }
}

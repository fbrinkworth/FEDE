import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
//import { InAppBrowser } from '@ionic-native/in-app-browser'; 
import { TranslateService } from '@ngx-translate/core';
import { YammerProvider } from '../../providers/yammer/yammer';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  idioms: any[] = [];

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private yammer: YammerProvider, private translateService: TranslateService) {
    this.idioms = [
      {
        value: 'es',
        label: 'Español'
      },
      {
        value: 'en',
        label: 'Ingles'
      },
      {
        value: 'pt',
        label: 'Portugués'
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  choose(lang) {
    this.translateService.use(lang);
  }

  login(){
    this.yammer.yammerLogin();
  }

  signup() {
    this.navCtrl.push(TabsPage, {}, { animate: false });
  }
}

import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, IonicApp } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { InAppBrowser } from '@ionic-native/in-app-browser'; 

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
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public iab: InAppBrowser,) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login() {
    const url =
      'https://www.yammer.com/oauth2/authorize?client_id=VoEeRTnYhY6lRvW6RXbXQ&response_type=code&redirect_uri=' +
      encodeURI('http://localhost:8100/tabs/tab1');

    //here we create iab browser for login page.
    const browser = this.iab.create(url, '_blank', {
      location: 'no',
      zoom: 'no',
      hardwareback: 'no',
      clearcache: 'yes'
    });

    browser.on('loadstart').subscribe(event => {
      //    this.splashScreen.show();
    });

    browser.on('loadstop').subscribe(event => {
      //      this.splashScreen.hide();
      browser.show();
    });

    browser.on('loaderror').subscribe(event => {
      //here we have split our requiring part one.
      var result = event.url.split('code=');
      console.log('Authentication result', result);
      //here we have split our requiring part two.
      window['AuthResult'] = result[1].split('&')[0];
      // Authentication Code stored in local for future purpose.
      // It means get access token and refresh token for sharepoint.
      localStorage.setItem('AuthCode', window['AuthResult']);
      browser.close();
    });

    browser.on('exit').subscribe(
      event => {
        //Below line for checking if closing event
        if (event) {
          if (event.type.toLowerCase() == 'exit') {
            if (
              localStorage.getItem('AuthCode') &&
              localStorage.getItem('AuthCode') == 'cancel'
            ) {
              this.platform.exitApp(); //This line is used for close a app. In case not logged in.
              event.preventDefault();
              return true;
            }
          }
          this.navCtrl.push(TabsPage, {}, { animate: false });
        }
      },
      err => {
        console.log('InAppBrowser Loadstop Event Error: ' + err);
      }
    );
  }

  signup() {
    alert('signup');
    // this.navCtrl.push(Signup);
  }
}

import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { YammerProvider } from '../../providers/yammer/yammer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];

  constructor(public navCtrl: NavController, public app: App, public yammerProvider: YammerProvider) {}
  logout() {
    // Remove API token
    const root = this.app.getRootNav();
    root.popToRoot();
  }
  ionViewDidLoad(){
    this.yammerProvider.getUsers()
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
      },
      (error) =>{
        console.error(error);
      }
    )
  }
}

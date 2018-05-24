import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  subscription: Subscription;
  @ViewChild('content') content: Content

  public contentHeight: number;
  public orientationX: number;
  public orientationY: number;
  public orientationZ: number;

  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion, private platform: Platform) {

  }


  ngOnInit(): void {
    // this.options = {
    //   frequency: 300
    // };
    this.platform.ready().then(() => {
      // Get the device current acceleration
      this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) => {
          this.orientationX = acceleration.x;
          this.orientationY = acceleration.y;
          this.orientationZ = acceleration.z;
        },
        (error: any) => alert(error)
      );
    });


  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      // Watch device acceleration
      this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 })
        .subscribe((acceleration: DeviceMotionAccelerationData) => {
          this.orientationX = acceleration.x;
          this.orientationY = acceleration.y;
          this.orientationZ = acceleration.z;
        },
          (error: any) => alert(error)
        );
    });
  }

  goBottom() {
    console.log(this.content);

    this.content.scrollToBottom(10000);
  }

  ionViewWillUnload() {
    this.subscription.unsubscribe();
  }

}

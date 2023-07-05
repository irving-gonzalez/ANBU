import { Component } from '@angular/core';
import { SignalRService } from '../signal-rservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor(private signalRServiceService: SignalRService) { }

  ngOnInit(): void {
    // 1 - start a connection
    this.signalRServiceService.startConnection().then(() => {
      console.log("connected");
      this.signalRServiceService.addTransferChartDataListener()
      // 2 - register for ALL relay
      // this.signalrService.listenToAllFeeds();

      // // 3 - subscribe to messages received
      // this.signalRServiceService = this.signalRServiceService.AllFeedObservable
      //   .subscribe((res: Feed) => {
      //     this.feed.push(res);
      //   });
    });
  }

  sendMsg(msg: string) {
    this.signalRServiceService.sendMsg(msg)
  }

  ngOnDestroy(): void {
  }
}

import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: any;

  public startConnection() {
    return new Promise((resolve, reject) => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7024/chatHub").build();

      this.hubConnection.start()
        .then(() => {
          console.log("connection established");
          return resolve(true);
        })
        .catch((err: any) => {
          console.log("error occured" + err);
          reject(err);
        });
    });
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('ReceiveMessage', (data: any) => {
      console.log(data);
    });
  }

  public sendMsg(msg: string) {
    console.log('about to send msg')
    this.hubConnection.invoke('SendMessage', 'angularUser', 'test')
      .catch((err: any) => console.error(err));
  }

  constructor() { }
}

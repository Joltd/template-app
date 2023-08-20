import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  message = 'None'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<MainResponse>('/main')
        .subscribe(result => this.message = result.message)
  }

}

interface MainResponse {
  message: string
}

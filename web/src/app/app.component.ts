import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {TypeUtils} from "./common/service/type-utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  message: string = "None"
  version: string = environment.version

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<MainResponse>('/main', TypeUtils.of(MainResponse))
      .subscribe(result => this.message = result.message)
  }

}

class MainResponse {
  message!: string
}

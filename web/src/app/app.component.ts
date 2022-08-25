import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

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
    this.http.get<string>('/main')
      .subscribe(result => this.message = result)
  }

}

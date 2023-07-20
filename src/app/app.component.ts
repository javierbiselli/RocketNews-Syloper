import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "angular-template";
  loading: boolean = true;

  constructor() {}

  ngOnInit() {
    window.onload = () => {
      this.loading = false;
    };
  }
}

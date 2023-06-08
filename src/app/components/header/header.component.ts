import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  currentDate: string = "";

  ngOnInit() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const updateDateTime = () => {
      this.currentDate = new Date().toLocaleDateString("en-US", options);
    };

    updateDateTime();

    setInterval(updateDateTime, 1000);
  }
}

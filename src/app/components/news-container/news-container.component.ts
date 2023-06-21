import { Component, OnInit } from "@angular/core";
import { Article } from "@shared/models";
import { ApiCallService } from "@shared/services";

@Component({
  selector: "app-news-container",
  templateUrl: "./news-container.component.html",
  styleUrls: ["./news-container.component.scss"],
})
export class NewsContainerComponent implements OnInit {
  constructor(private apiCallService: ApiCallService) {}

  apiData: any;
  articles: any;

  ngOnInit() {
    // api call
    this.apiCallService.getData("articles").subscribe((data) => {
      this.apiData = data;
      this.articles = data.results;
      console.log(data.results);
    });
  }

  getDate(rawDate: string) {
    const dateObj: Date = new Date(rawDate);

    const monthNames: Array<string> = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month: string = monthNames[dateObj.getMonth()];
    const day: number = dateObj.getDate();
    const year: number = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
  }
}

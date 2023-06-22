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
  articles: Article[] = [];

  ngOnInit() {
    // api call
    this.apiCallService
      .getData("articles/?limit=9&offset=0")
      .subscribe((data) => {
        this.apiData = data;
        this.articles = data.results;
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
    let hour: number = dateObj.getHours();
    const minute: string = dateObj.getMinutes().toString().padStart(2, "0");
    let period: string = "am";

    if (hour >= 12) {
      period = "pm";
      if (hour > 12) {
        hour -= 12;
      }
    }

    return `${month} ${day}, ${year} | ${hour}:${minute} ${period}`;
  }

  isDesktop(): boolean {
    return window.innerWidth > 1200;
  }

  isFirstElement(array: Article[], element: Article): boolean {
    return array.indexOf(element) === 0;
  }
}

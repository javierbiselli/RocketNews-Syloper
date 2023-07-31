import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Result } from "@shared/models";
import { SearchResultService } from "src/app/services/search-result.service";

@Component({
  selector: "app-search-container",
  templateUrl: "./search-container.component.html",
  styleUrls: ["./search-container.component.scss"],
})
export class SearchContainerComponent implements OnInit {
  searchParam: string = "";
  searchResults: Result[] = [];

  constructor(
    private searchResultService: SearchResultService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.searchParam = params.get("userInput") || "";
      this.searchResults = this.searchResultService.getSearchResults();
    });

    this.searchResultService.searchResults$.subscribe((results) => {
      this.searchResults = results;
    });
  }

  displayLimit: number = 12;

  loadMore() {
    this.displayLimit += 6;
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
}

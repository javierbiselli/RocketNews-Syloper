import { Injectable } from "@angular/core";
import { Result } from "../models/";

@Injectable({
  providedIn: "root",
})
export class SearchResultService {
  constructor() {}

  private searchResults: Result[] = [];

  setSearchResults(results: Result[]) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }
}

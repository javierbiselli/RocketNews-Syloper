import { Injectable } from "@angular/core";
import { Result } from "../models/";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchResultService {
  private searchResultsSubject: BehaviorSubject<Result[]> = new BehaviorSubject<
    Result[]
  >([]);
  public searchResults$ = this.searchResultsSubject.asObservable();

  setSearchResults(results: Result[]) {
    this.searchResultsSubject.next(results);
  }

  getSearchResults() {
    return this.searchResultsSubject.getValue();
  }
}

import { Injectable } from "@angular/core";
import { Post } from "../models/post";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShareDataService {
  constructor() {}

  private selectedPostSource = new BehaviorSubject<Post | undefined>(undefined);
  selectedPost$ = this.selectedPostSource.asObservable();

  setSelectedPost(post: Post) {
    this.selectedPostSource.next(post);
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { Post, Comment, User } from "@shared/models";
import { DataHandlingService } from "src/app/services/data-handling.service";
import { ShareDataService } from "src/app/services/share-data.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
  animations: [
    trigger("commentAnimation", [
      state("open", style({ height: "*" })),
      state("closed", style({ height: "0", display: "none" })),
      transition("open <=> closed", animate("250ms ease-in-out")),
    ]),
  ],
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shareDataService: ShareDataService,
    private dataHandlingService: DataHandlingService
  ) {}

  posts: Post[] = [];
  selectedPost: Post | undefined = undefined;
  comments: Comment[] = [];

  currentUser!: User;

  showPublicity: boolean = true;
  id: number = 0;
  ngOnInit(): void {
    this.dataHandlingService.posts.subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => console.error(err),
    });

    this.dataHandlingService.comments.subscribe({
      next: (comments) => {
        this.comments = comments;
        this.id = this.comments.length + 1;
      },
      error: (err) => console.error(err),
    });
    this.loadCurrentUserFromLocalStorage();
    this.shareDataService.selectedPost$.subscribe((post) => {
      this.selectedPost = post;
    });

    if (this.selectedPost === undefined) {
      this.route.paramMap.subscribe((params) => {
        const postId = String(params.get("id"));
        this.getPostById(postId);
      });
    }

    if (this.selectedPost && this.selectedPost.comments) {
      this.selectedPost.comments.forEach((comment: Comment) => {
        comment.rating = this.mockRating();
      });
    }

    this.sortComments(0);
  }

  loadCurrentUserFromLocalStorage() {
    const currentUserJSON = localStorage.getItem("currentUser");

    if (currentUserJSON) {
      try {
        this.currentUser = JSON.parse(currentUserJSON) as User;
        this.showPublicity = !this.currentUser.isPremium;
      } catch (error) {
        console.error("Error parsing currentUser from localStorage:", error);
      }
    }
  }

  isUserLogged(): boolean {
    if (!this.currentUser) {
      this.router.navigate(["/login"]);
      return true;
    } else {
      return false;
    }
  }

  getPostById(id: string) {
    this.dataHandlingService.getPostById(id).subscribe({
      next: (post) => {
        this.selectedPost = post;
      },
      error: (err) => console.error("Error fetching post by id", err),
    });
  }

  isLiked = false;

  toggleButton(): void {
    if (!this.isUserLogged()) {
      this.isLiked = !this.isLiked;
    }
  }

  commentOpen: boolean = false;
  commentContent: string = "";

  toggleComment() {
    if (!this.isUserLogged()) {
      this.commentOpen = !this.commentOpen;
    }
  }

  private getFormattedDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${month}/${day}/${year}`;
  }

  order: number = 0;

  changeOrder(event: any): void {
    const selectedValue = event.target.value;
    this.sortComments(Number(selectedValue));
  }

  sortComments(order: number): void {
    this.order = order;
    if (this.order === 0) {
      this.selectedPost?.comments.sort((a, b) => {
        if (a.priority && !b.priority) {
          return -1;
        } else if (!a.priority && b.priority) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (this.order === 1) {
      this.selectedPost?.comments.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (this.order === 2) {
      this.selectedPost?.comments.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (this.order === 3) {
      this.selectedPost?.comments.sort((a, b) => b.rating - a.rating);
    }
  }

  pushComment(): void {
    console.log(this.comments);
    if (this.commentContent.length > 0) {
      this.id = this.id + 1;

      const comment: Comment = {
        id: this.id.toString(),
        content: this.commentContent,
        date: this.getFormattedDate(),
        author: this.currentUser,
        rating: 0,
        priority: false,
      };
      this.highLightComment(comment);
      this.dataHandlingService.pushComment(comment);
      this.dataHandlingService.pushCommentToPost(
        this.selectedPost?.id,
        comment
      );
      this.toggleComment();
      this.commentContent = "";
    }
  }

  highLightPost(post: Post): void {
    if (
      this.currentUser.isPremium &&
      post.priority === false &&
      post.author.id === this.currentUser.id
    ) {
      const shouldHighlight = confirm(
        "You can prioritize your post since you are a premium user. Do you want to do it?"
      );

      if (shouldHighlight) {
        post.priority = true;
      } else {
        post.priority = false;
      }
    } else if (
      this.currentUser.isPremium &&
      post.priority === true &&
      post.author.id === this.currentUser.id
    ) {
      const deleteHighlight = confirm(
        "Do you want to stop prioritizing your post?"
      );
      if (deleteHighlight) {
        post.priority = false;
      } else {
        post.priority = true;
      }
    } else {
      post.priority = false;
    }
  }

  deletePost(postId: string) {
    const index = this.posts.findIndex((post) => postId === post.id);

    if (index !== undefined && index !== -1) {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (shouldDelete) {
        this.posts.splice(index, 1);
        this.router.navigate(["/forum"]);
      }
    }
  }

  highLightComment(comment: Comment): void {
    if (this.currentUser.isPremium && comment.priority === false) {
      const shouldHighlight = confirm(
        "You can highlight your comment since you are a premium user. Do you want to do it?"
      );

      if (shouldHighlight) {
        comment.priority = true;
      } else {
        comment.priority = false;
      }
    } else if (this.currentUser.isPremium && comment.priority === true) {
      const deleteHighlight = confirm(
        "Do you want to stop highlighting your comment?"
      );
      if (deleteHighlight) {
        comment.priority = false;
      } else {
        comment.priority = true;
      }
    } else {
      comment.priority = false;
    }
  }

  isDeletable(): boolean {
    if (this.currentUser) {
      return !!this.selectedPost?.comments.some(
        (comment) => comment.author.id === this.currentUser.id
      );
    } else {
      return false;
    }
  }

  deleteComment(commentId: string): void {
    if (this.isDeletable()) {
      const index = this.selectedPost?.comments.findIndex(
        (comment) => comment.id === commentId
      );

      if (index !== undefined && index !== -1) {
        const shouldDelete = window.confirm(
          "Are you sure you want to delete this comment?"
        );

        if (shouldDelete) {
          this.selectedPost?.comments.splice(index, 1);
        }
      }
    }
  }

  mockRating(): number {
    return Math.floor(Math.random() * 21) - 10; // generates number between -10 and 10
  }

  selectedCommentId: string | undefined = undefined;
  selectedButtons: { [commentId: string]: "add" | "subtract" | null } = {};

  rate(comment: Comment, value: number): void {
    if (!this.isUserLogged()) {
      const isSelected =
        this.selectedButtons[comment.id] === (value === 1 ? "add" : "subtract");

      if (isSelected) {
        if (value === 1) {
          comment.rating -= 1;
        } else {
          comment.rating += 1;
        }
        this.selectedButtons[comment.id] = null;
      } else {
        if (this.selectedButtons[comment.id] === "add") {
          comment.rating -= 1;
        } else if (this.selectedButtons[comment.id] === "subtract") {
          comment.rating += 1;
        }
        this.selectedButtons[comment.id] = value === 1 ? "add" : "subtract";
        comment.rating += value;
      }
    }
  }
}

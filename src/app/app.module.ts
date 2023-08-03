// Angular Imports
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// This Module Imports
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { NewsContainerComponent } from "./components/news-container/news-container.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaidServiceComponent } from "./components/paid-service/paid-service.component";
import { ForumComponent } from "./components/forum/forum.component";
import { PostComponent } from "./components/forum/post/post.component";
import { SearchContainerComponent } from "./components/search-container/search-container.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { LoginButtonComponent } from "./components/login-button/login-button.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PostingComponent } from "./components/forum/posting/posting.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsContainerComponent,
    ContactFormComponent,
    PaidServiceComponent,
    ForumComponent,
    PostComponent,
    SearchContainerComponent,
    LoginFormComponent,
    LoginButtonComponent,
    FooterComponent,
    PostingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: "", component: NewsContainerComponent },
        { path: "blogs", component: NewsContainerComponent },
        { path: "reports", component: NewsContainerComponent },
        { path: "contact", component: ContactFormComponent },
        { path: "forum", component: ForumComponent },
        { path: "forum/posting", component: PostingComponent },
        { path: "forum/post/:id", component: PostComponent },
        { path: "search/:userInput", component: SearchContainerComponent },
        { path: "login", component: LoginFormComponent },
      ],
      { scrollPositionRestoration: "enabled" }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

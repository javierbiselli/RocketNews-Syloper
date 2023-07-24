import { Injectable } from "@angular/core";
import { User, Post, Comment } from "../models";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataHandlingService {
  users = new BehaviorSubject<User[]>([
    {
      id: "1",
      name: "Tamarah Veque",
      email: "tveque0@myspace.com",
      password: "pass123",
      isPremium: true,
    },
    {
      id: "2",
      name: "Nady Kusick",
      email: "nkusick1@shop-pro.jp",
      password: "pass123",
      isPremium: true,
    },
    {
      id: "3",
      name: "Corabel Polland",
      email: "cpolland2@etsy.com",
      password: "pass123",
      isPremium: false,
    },
    {
      id: "4",
      name: "Kyle Pember",
      email: "kpember3@mlb.com",
      password: "pass123",
      isPremium: true,
    },
    {
      id: "5",
      name: "Clementius Kerrigan",
      email: "ckerrigan4@so-net.ne.jp",
      password: "pass123",
      isPremium: false,
    },
  ]);
  constructor() {}

  pushUser(user: User): void {
    const currentUsers = this.users.getValue();
    currentUsers.push(user);
    this.users.next(currentUsers);
  }

  // comentarios
  comments = new BehaviorSubject<Comment[]>([
    {
      id: "1",
      content:
        "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      date: "4/6/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "2",
      content:
        "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
      date: "12/12/2022",
      author: this.users.getValue()[2],
    },
    {
      id: "3",
      content: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
      date: "6/29/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "4",
      content:
        "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
      date: "1/16/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "5",
      content:
        "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
      date: "3/23/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "6",
      content:
        "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
      date: "2/3/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "7",
      content:
        "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      date: "7/1/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "8",
      content:
        "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
      date: "7/12/2022",
      author: this.users.getValue()[2],
    },
    {
      id: "9",
      content:
        "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
      date: "7/27/2022",
      author: this.users.getValue()[2],
    },
    {
      id: "10",
      content:
        "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      date: "9/10/2022",
      author: this.users.getValue()[2],
    },
    {
      id: "11",
      content:
        "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      date: "2/23/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "12",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
      date: "12/10/2022",
      author: this.users.getValue()[2],
    },
    {
      id: "13",
      content:
        "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      date: "7/15/2022",
      author: this.users.getValue()[2],
    },
    {
      id: "14",
      content:
        "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      date: "6/1/2023",
      author: this.users.getValue()[2],
    },
    {
      id: "15",
      content:
        "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      date: "4/10/2023",
      author: this.users.getValue()[2],
    },
  ]);

  pushComment(comment: Comment): void {
    const currentComments = this.comments.getValue();
    currentComments.push(comment);
    this.comments.next(currentComments);
  }

  // posteos
  posts = new BehaviorSubject<Post[]>([
    {
      id: "1",
      title: "Upgradable exuding internet solution",
      author: this.users.getValue()[0],
      date: "7/15/2022",
      content:
        "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      comments: [],
      priority: false,
    },
    {
      id: "2",
      title: "Networked bottom-line policy",
      author: this.users.getValue()[1],
      date: "7/15/2022",
      content:
        "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
      comments: [],
      priority: false,
    },
    {
      id: "3",
      title: "Profit-focused 6th generation software",
      author: this.users.getValue()[1],
      date: "7/15/2022",
      content:
        "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
      comments: [],
      priority: true,
    },
    {
      id: "4",
      title: "Operative non-volatile interface",
      author: this.users.getValue()[3],
      date: "7/17/2022",
      content:
        "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
      comments: [this.comments.getValue()[8]],
      priority: false,
    },
    {
      id: "5",
      title: "Diverse zero administration extranet",
      author: this.users.getValue()[1],
      date: "7/18/2022",
      content:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
      comments: [],
      priority: false,
    },
    {
      id: "6",
      title: "Pre-emptive uniform capability",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      comments: [],
      priority: false,
    },
    {
      id: "7",
      title: "Ameliorated clear-thinking superstructure",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
      comments: [],
      priority: false,
    },
    {
      id: "8",
      title: "Reverse-engineered asymmetric product",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      comments: [],
      priority: false,
    },
    {
      id: "9",
      title: "Persevering tangible budgetary management",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
      comments: [],
      priority: true,
    },
    {
      id: "10",
      title: "Advanced 24 hour portal",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      comments: [],
      priority: false,
    },
    {
      id: "11",
      title: "Multi-lateral directional internet solution",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
      comments: [this.comments.getValue()[6], this.comments.getValue()[7]],
      priority: false,
    },
    {
      id: "12",
      title: "Synergistic real-time application",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
      comments: [],
      priority: false,
    },
    {
      id: "13",
      title: "Triple-buffered uniform emulation",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
      comments: [],
      priority: false,
    },
    {
      id: "14",
      title: "Managed methodical attitude",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
      comments: [
        this.comments.getValue()[2],
        this.comments.getValue()[3],
        this.comments.getValue()[4],
        this.comments.getValue()[5],
      ],
      priority: false,
    },
    {
      id: "15",
      title: "Synergized web-enabled methodology",
      author: this.users.getValue()[2],
      date: "7/15/2022",
      content:
        "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      comments: [this.comments.getValue()[0], this.comments.getValue()[1]],
      priority: true,
    },
  ]);

  pushPost(post: Post): void {
    const currentPosts = this.posts.getValue();
    currentPosts.push(post);
    this.posts.next(currentPosts);
  }
}

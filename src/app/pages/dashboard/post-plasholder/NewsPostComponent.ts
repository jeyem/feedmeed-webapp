import { Component, Input } from "@angular/core";
import { Post } from "src/app/@core/utils/NewsService";
@Component({
  selector: "nb-news-post",
  template: `
    <article>
      <h2 class="h5">{{ post.title }}</h2>
      <p>{{ post.text }}</p>
      <a [attr.href]="post.link">Read full article</a>
    </article>
  `
})
export class NewsPostComponent {
  @Input()
  post: Post;
}

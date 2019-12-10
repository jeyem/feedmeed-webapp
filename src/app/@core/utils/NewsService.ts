import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
import { BaseService } from "../BaseService";
const TOTAL_PAGES = 7;

export interface Post {
  title: string;
  link: string;
  creator: string;
  text: string;
}
export class NewsPost {
  limit: number;
  page: number;
  posts: Post[];
}
@Injectable()
export class NewsService {
  constructor(private baseService: BaseService) {}
  load(page: number, pageSize: number): Observable<Post[]> {
    const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;
    return this.baseService.getData<Post[]>("assets/ne.json").pipe(
      map(news => news.splice(startIndex, pageSize)),
      delay(1500)
    );
  }
}

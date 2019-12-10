import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { NewsService } from "src/app/@core/utils/NewsService";

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnDestroy {
  private alive = true;

  constructor(
    private themeService: NbThemeService,
    private newsService: NewsService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {});
  }
  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1
  };
  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1
  };
  pageSize = 10;

  loadNext(cardData) {
    if (cardData.loading) {
      return;
    }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.newsService
      .load(cardData.pageToLoadNext, this.pageSize)
      .subscribe(nextNews => {
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}

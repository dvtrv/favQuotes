class QuotesService {
  constructor(url) {
    this.url = url;
    this.quotes = [];
    this.favoriteQuotesIdx = [];
    this.qurrentQuoteIdx;
  }

  async load() {
    if (this.quotes.length) return;
    this.quotes = await fetch(this.url).then((r) => r.json());
  }

  getRandom() {
    this.qurrentQuoteIdx = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[this.qurrentQuoteIdx];
  }

  toggleFavorite() {
    if (this.qurrentQuoteIdx == null) return;

    const idx = this.favoriteQuotesIdx.indexOf(this.qurrentQuoteIdx);
    if (idx == -1) {
      this.favoriteQuotesIdx.push(this.qurrentQuoteIdx);
    } else {
      this.favoriteQuotesIdx.splice(idx, 1);
    }
  }

  getFavoriteItemHtml() {
    const itemList = [];
    this.favoriteQuotesIdx.forEach((e) => {
      itemList.push(`
    <li class="fav-card">
      <p class="fav-card-quote">"${this.quotes[e].quote}"</p>
      <p class="fav-card-author">— ${this.quotes[e].author}</p>
    </li>`);
    });
    return itemList;
  }
}

class QuotesView {
  constructor() {
    this.quoteEl = document.querySelector('.quote-text');
    this.quoteAuthorEl = document.querySelector('.quote-author');
    this.generateBtn = document.querySelector('.generate-btn');
    this.favoriteBtn = document.querySelector('.favorite-btn');
    this.cardsWrapper = document.querySelector('.cards-wrapper');
  }

  onGenerate(handler) {
    this.generateBtn.addEventListener('click', handler);
  }

  onFavorite(handler) {
    this.favoriteBtn.addEventListener('click', handler);
  }

  showQuote({ quote, author }) {
    this.quoteEl.textContent = quote;
    this.quoteAuthorEl.textContent = `— ${author}`;
  }

  setHidden(isHidden) {
    this.quoteEl.classList.toggle('hide', isHidden);
    this.quoteAuthorEl.classList.toggle('hide', isHidden);
  }

  renderFavorite(listOfcards) {
    this.cardsWrapper.innerHTML = listOfcards.join('');
  }
}

class App {
  constructor() {
    this.service = new QuotesService('./quotes.json');
    this.view = new QuotesView();
    this.view.onFavorite(() => this.handleFavorite());
    this.view.onGenerate(() => this.handleGenerate());
    this.service.load();
  }

  async handleGenerate() {
    await this.service.load();
    this.view.setHidden(true);

    setTimeout(() => {
      const quote = this.service.getRandom();
      this.view.showQuote(quote);
      this.view.setHidden(false);
    }, 400);
  }

  handleFavorite() {
    this.service.toggleFavorite();
    this.view.renderFavorite(this.service.getFavoriteItemHtml());
  }
}

const app = new App();

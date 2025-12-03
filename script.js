const quoteEl = document.querySelector('.quote-text');
const quoteAuthorEl = document.querySelector('.quote-author');
const generateBtn = document.querySelector('.generateBtn');
let quotes = [];

async function loadQuotes() {
  const res = await fetch('./quotes.json');
  quotes = await res.json();
}

function generateRandomQuote() {
  quoteEl.classList.add('hide');
  quoteAuthorEl.classList.add('hide');

  setTimeout(() => {
    console.log(quotes);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const { author, quote } = randomQuote;

    quoteEl.textContent = quote;
    quoteAuthorEl.textContent = `— ${author}`;

    quoteEl.classList.remove('hide');
    quoteAuthorEl.classList.remove('hide');
  }, 400);
}

generateBtn.addEventListener('click', generateRandomQuote);
loadQuotes();

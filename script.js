const quotes = [
  {
    quote: `"The only way to do great work is to love what you do. If you haven't
          found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it"`,
    author: 'Steve Jobs',
  },
  {
    quote: `"You can't just ask customers what they want and then try to give that to them. By the time you get it built, they'll want something new"`,
    author: 'Steve Jobs',
  },
  {
    quote: `"Stay hungry. Stay foolish"`,
    author: 'Steve Jobs',
  },
];

const quoteEl = document.querySelector('.quote-text');
const quoteAuthorEl = document.querySelector('.quote-author');
const generateBtn = document.querySelector('.generateBtn');
// console.log(quoteElement);
// console.log(quoteAuthor);

function generateRandomQuote() {
  // 1. Добавляем класс, чтобы скрыть текущий текст
  quoteEl.classList.add('hide');
  quoteAuthorEl.classList.add('hide');

  // 2. Ждем 400мс (время анимации в CSS), меняем текст и показываем обратно
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const { quote, author } = randomQuote;
    quoteEl.textContent = quote;
    quoteAuthorEl.textContent = `— ${author}`;

    // 3. Убираем класс, текст плавно появляется
    quoteEl.classList.remove('hide');
    quoteAuthorEl.classList.remove('hide');
  }, 400); // Это время должно совпадать с transition в CSS
}

generateBtn.addEventListener('click', generateRandomQuote);
// generateRandomQuote();

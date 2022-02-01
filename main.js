const books = [];

const source = $('#book-template').html();
const template = Handlebars.compile(source);
const $books = $('.books');
const $searchBtn = $('.search');
const $searchInput = $('#search-query');

const addBooks = data => {
  for (const bookObj of data.items) {
    const newBookObj = {
      title: bookObj.volumeInfo.title || null,
      author: bookObj.volumeInfo.authors.toString().replace(',', ', ') || null,
      imageURL: bookObj.volumeInfo.imageLinks ? bookObj.volumeInfo.imageLinks.thumbnail : null,
      isbn: bookObj.volumeInfo.industryIdentifiers ? bookObj.volumeInfo.industryIdentifiers[1].identifier : null,
      pageCount: bookObj.volumeInfo.pageCount || null
    }
    books.push(newBookObj);
  }

  renderBooks();
}

const fetch = query => {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + query,
    dataType: "json",
    success: function(data) {
      addBooks(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
}

$searchBtn.on('click', () => {
  const search = $searchInput.val();
  fetch(search);
});

const renderBooks = () => {
  $books.empty();

  for (const book of books) {
    const newHTML = template(book);
    $books.append(newHTML);
  }
}
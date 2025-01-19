let articles = [];
let currentPage = 1;
const articlesPerPage = 4;

document.getElementById('article-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('image-url').value;

    articles.push({ title, description, imageUrl });
    document.getElementById('article-form').reset();
    displayArticles();
    displayPageNumbers();
});

function displayArticles() {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToDisplay = articles.slice(startIndex, endIndex);

    const newsFeed = document.getElementById('news-feed');
    newsFeed.innerHTML = '';

    articlesToDisplay.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}">` : ''}
        `;
        newsFeed.appendChild(newsItem);
    });
}

function displayPageNumbers() {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const pageNumbers = document.getElementById('page-numbers');
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.classList.add('btn', 'btn-outline-primary');
        pageNumber.innerText = i;
        pageNumber.onclick = function() {
            currentPage = i;
            displayArticles();
        };
        pageNumbers.appendChild(pageNumber);
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayArticles();
    }
}

function nextPage() {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayArticles();
    }
}

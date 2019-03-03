'use strict';

function generateTitleLinks() {
    const links = document.querySelectorAll('.titles span');
    for (let link of links) {
        link.innerHTML = ""
    }
    const articles = document.querySelectorAll('article');
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML;
        const titleLink = document.querySelector('a[href="#' + articleId + '"] span');
        titleLink.innerHTML = articleTitle;
    }
}

generateTitleLinks()

function clickLinkHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles .active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

  /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

  /* get 'href' attribute from the clicked link */
    const attributeId = this.getAttribute('href');
    console.log(attributeId);

  /* find the correct article using the selector (value of 'href' attribute) */
    const chosenArticle = document.querySelector(attributeId);
    console.log(chosenArticle);

  /* add class 'active' to the correct article */
    chosenArticle.classList.add('active');

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', clickLinkHandler);
}
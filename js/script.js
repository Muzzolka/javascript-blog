'use strict';

function generateTitleLinks(detailedSelector='') {
    const links = document.querySelectorAll('.titles span');
    for (let link of links) {
        link.innerHTML = '';
    }
    const articles = document.querySelectorAll('article' + detailedSelector);
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML;
        const titleLink = document.querySelector('a[href="#' + articleId + '"] span');
        titleLink.innerHTML = articleTitle;
    }
}

generateTitleLinks();

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

function generateTags() {
    /*find all articles */
    const articles = document.querySelectorAll('article');
    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find tags wrapper */
        const tagsWrapper = article.querySelector('.list-horizontal');
        console.log(tagsWrapper);
        /* clear wrappers */
        tagsWrapper.innerHTML = '';
        /* make html variable with empty string */
        let htmlVar = '';
        /* get tags from data-tags attribute */
        const dataTags = article.getAttribute('data-tags');
        console.log(dataTags);
        /* split tags into array */
        /* STSRT LOOP: for each tag */
        for (let tag of dataTags.split(' ')){
            console.log(dataTags.split(' '));
            console.log(tag);
            const linkHtml = `<li><a href="#tag-${tag}">` + tag + ' ' + '</a></li>';
            /* generate HTML of the link */
            htmlVar = htmlVar + linkHtml;
            /* add generated code to the html variable*/
        }
        /*END LOPP: for each tag */
        console.log(htmlVar);
        tagsWrapper.innerHTML = htmlVar;
    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP */
    }
}

generateTags();


function tagClickHandler(event){
    event.preventDefault();
    /* prevent default action for this event */

    const clickedElement = this;
    /* make new constant named "clickedElement" and give it the value of "this" */

    const hrefClicked = clickedElement.getAttribute('href');
    console.log(hrefClicked);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const tag = hrefClicked.replace('#tag-', '');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* find all tag links with class active */
    for (let link of activeTagLinks) {
    /* START LOOP: for each active tag link */
        link.classList.remove('active');
        /* remove class active */
    }
    /* END LOOP: for each active tag link */
    const hrefSearched = document.querySelectorAll('a[href="' + hrefClicked + '"]');
    /* find all tag links with "href" attribute equal to the "href" constant */
    for (let href of hrefSearched) {
        /* START LOOP: for each found tag link */
        href.classList.add('active');
      /* add class active */
    }
    /* END LOOP: for each found tag link */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.list-horizontal a');

    for (let link of tagLinks) {
        /* START LOOP: for each link */
        link.addEventListener('click', tagClickHandler);
        /* add tagClickHandler as event listener for that link */
    }
    /* END LOOP: for each link */
}

addClickListenersToTags();

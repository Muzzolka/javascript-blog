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

function calculateTagsParams(tags) {
    const params = { 'max': 0, 'min': 999999}
    for (let tag in tags) {
        params.max = tags[tag] > params.max ? tags[tag] : params.max;
        params.min = tags[tag] < params.min ? tags[tag] : params.min;
    }
    return params
}

function calculateTagClass(tag, params) {
    return Math.floor((tag - params.min)/(params.max - params.min) * 4 + 1);
}

//tag-size

function generateTags() {
    /* empty variable for all Tags */
    let allTags = {};
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
            const linkHTML = `<li><a href="#tag-${tag}">` + tag + '</a></li>';
            /* generate HTML of the link */
            htmlVar = htmlVar + linkHTML;
            /* add generated code to the html variable*/

            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag)){
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
        }
        /*END LOPP: for each tag */
        console.log(htmlVar);
        tagsWrapper.innerHTML = htmlVar;
    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
    console.log('tuuuu: ', allTags);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParam:', tagsParams)
    let allTagsHTML = '';

    for (let tag in allTags) {
        allTagsHTML += `<li><a class="tag-size-${calculateTagClass(allTags[tag], tagsParams)} href="#tag-${tag}">` + tag + '</a></li>';
    }
    console.log(allTagsHTML);
    tagList.innerHTML = allTagsHTML;
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

function generateAuthorLinks() {
    let allAuthors = {};
    for (let author of document.querySelectorAll('.post-author')) {
    /* delete authors from all wrappers */
        author.innerHTML = '';
    }
    for(let article of document.querySelectorAll('article')) {
    /* for each article */
        const author = article.getAttribute('data-author');
        /* take data-author value*/
        const authorLink = `<a href="#tag-${author}">${author}</a>`
        /* create a link with author value */
        console.log(authorLink);
        article.querySelector('.post-author').innerHTML = authorLink;
        /* put a link into acrticle wrapper */
    }
    for (let author of document.querySelectorAll('.post-author a')) {
        author = author.getAttribute('href').replace('#tag-', '');
        if(!allAuthors.hasOwnProperty(author)){
            allAuthors[author] = 1;
        } else {
            allAuthors[author]++;
        }
    }
    let allAuthorsHTML = '';
    for (let author in allAuthors) {
        allAuthorsHTML += `<li><a href="#tag-${author}">` + author + '( ' + allAuthors[author] + ' )</a></li>';
    }
    document.querySelector('.list.authors').innerHTML = allAuthorsHTML;
}

function clickedAuthorLinkHandler() {
    const clickedLink = this;
    for (let author of document.querySelectorAll('.post-authors .active')) {
        author.classList.remove('active');
    }
    /* delete all active classes from authors */
    const href = clickedLink.getAttribute('href');
    /* take href from this */
    const tag = href.replace('#tag-', '');
    /* take tag from this */
    for (let hrefLink of document.querySelectorAll('a[href="' + href + '"]')) {
        hrefLink.classList.add('active');
        console.log(hrefLink);
    }
    /* add active to all hrefs == our href */
    console.log('[data-author~="' + tag + '"]')
    generateTitleLinks('[data-author~="' + tag + '"]')
}

function authorsListener() {
    for (let link of document.querySelectorAll('.post-author a')) {
    /* for every link of author links */
        link.addEventListener('click', clickedAuthorLinkHandler);
    }
}

generateAuthorLinks()

authorsListener();

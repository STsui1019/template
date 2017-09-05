// no appendix -> add appendix
// title in front, no h1 -> add it
// no title in front, h1 -> read and put into frontMatter
// footnote -> footnote list
// break up bib
// if citation, no bib-list -> add citation-list

// if authors, no byline -> add byline

export default function(dom, data) {
  const article = dom.querySelector('d-article');

  let h1 = dom.querySelector('h1');
  if (h1) {
    if (!data.title) {
      data.title = h1.textContent;
    }
  } else {
    if (data.title) {
      h1 = dom.createElement('h1');
      h1.textContent = data.title;
      article.insertBefore(h1, article.firstChild);
    }
    if (data.description) {
      const h2 = dom.createElement('h2');
      h2.textContent = data.description;
      article.insertBefore(h2, h1.nextSibling);
    }
  }

  let byline = dom.querySelector('d-byline');
  if (!byline && data.authors) {
    byline = dom.createElement('d-byline');
    const skipTags = ['H1', 'H2', 'FIGURE'];
    let candidate = h1;
    while (skipTags.indexOf(candidate.tagName) !== -1) {
      candidate = candidate.nextSibling;
    }
    article.insertBefore(byline, candidate);
  }

  let appendix = dom.querySelector('d-appendix');
  if (!appendix) {
    appendix = dom.createElement('d-appendix');
    dom.body.appendChild(appendix);
  }

  let footnoteList = dom.querySelector('d-footnote-list');
  if (!footnoteList) {
    footnoteList = dom.createElement('d-footnote-list');
    appendix.appendChild(footnoteList);
  }

  let citationList = dom.querySelector('d-citation-list');
  if (!citationList) {
    citationList = dom.createElement('d-citation-list');
    appendix.appendChild(citationList);
  }

}
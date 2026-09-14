const journalPosts = document.querySelector('#journal-posts');

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

function formatText(value) {
  return escapeHtml(value || '')
    .replace(/^### (.*)$/gm, '<h4>$1</h4>')
    .replace(/^## (.*)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

function postMarkup(post, index) {
  const image = post.image ? `<img src="${escapeHtml(post.image)}" alt="">` : '';
  const type = escapeHtml(post.category || 'Studio Journal');
  const date = escapeHtml(post.date || '');
  const title = escapeHtml(post.title || 'Untitled post');
  const summary = escapeHtml(post.summary || '');
  const body = formatText(post.body || summary);
  return `<article class="journal-card ${index === 0 ? 'journal-card-featured' : ''}">
    ${image}<p class="journal-type">${type}${date ? ` · ${date}` : ''}</p>
    <h2>${title}</h2><p>${summary}</p>
    <details><summary>Read article <span>→</span></summary><div class="journal-body"><p>${body}</p></div></details>
  </article>`;
}

fetch('content/journal.json')
  .then((response) => {
    if (!response.ok) throw new Error('Journal content could not be loaded.');
    return response.json();
  })
  .then((content) => {
    if (!Array.isArray(content.posts) || content.posts.length === 0) return;
    journalPosts.innerHTML = content.posts.map(postMarkup).join('');
  })
  .catch(() => {
    // The welcome cards remain visible while opening the site as local files.
  });

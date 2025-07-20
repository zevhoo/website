const fs = require('fs');
const path = require('path');

const baseDir = 'posts';

function buildTree(dir, relativePath = '') {
  const entries = fs.readdirSync(dir).sort();
  const children = entries.map(entry => {
    const fullPath = path.join(dir, entry);
    const relPath = path.join(relativePath, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subtree = buildTree(fullPath, relPath);
      return `<li>${entry}\n<ul>${subtree}</ul></li>`;
    } else if (entry.endsWith('.html')) {
      const name = path.parse(entry).name;
      return `<li><a href="${path.join(baseDir, relPath)}">${name}</a></li>`;
    } else {
      return '';
    }
  });

  return children.filter(Boolean).join('\n');
}

const nestedList = `<ul><li>${baseDir}<ul>${buildTree(baseDir)}</ul></li></ul>`;

// Read the template
let template = fs.readFileSync('index.html', 'utf8');

// Inject it into the template
const html = template.replace('{{POST_LIST}}', nestedList);

fs.writeFileSync('index.html', html);

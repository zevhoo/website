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

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>zev blog</title>
  <style>
    body { font-family: monospace; padding: 1em; }
    ul { list-style-type: none; padding-left: 1em; }
    li { padding-left: 0.5em; position: relative; }
  </style>
</head>
<body>
  <h1>zev blog</h1>
  <p>index of posts:</p>
  ${nestedList}
</body>
</html>
`;

fs.writeFileSync('index.html', html);

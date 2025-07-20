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
let template = fs.readFileSync('index.html', html);

// Inject it into the template
const html = template.replace('{{POST_LIST}}', nestedList);

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>zlog</title>
  <style>
    body { font-family: monospace; padding: 1em; }
    a { font-weight: bold; text-decoration: none; color: #ff7800; }
    a:hover { text-decoration: underline; color: #a64e00; }
    ul { list-style-type: none; padding-left: 1em; }
    li { padding-left: 0.5em; position: relative; }
  </style>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>zev blog</h1>
  <p>this site exists as a simple repository of any projects, puzzles or works i want to be in public.
  <br>
  <br>
  index of posts:</p>
  ${nestedList}
</body>
</html>
`;

fs.writeFileSync('index.html', html);

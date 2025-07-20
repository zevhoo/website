const fs = require('fs');
const path = require('path');

const postsDir = './posts';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });

  return results;
}

const files = getHtmlFiles(postsDir);

const links = files.map(file => {
  const relativePath = file.replace(/^\.\/?/, ''); // Remove leading ./ if present
  return `<li><a href="${relativePath}">${relativePath}</a></li>`;
}).join('\n');

const html = `
<!DOCTYPE html>
<html>
<head><title>zev blog</title></head>
<body>
  <h1>zev hoover blog</h1>
  <p>list of posts:</p>
  <ul>
    ${links}
  </ul>
</body>
</html>
`;

fs.writeFileSync('index.html', html);

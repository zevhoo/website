const fs = require('fs');
const path = require('path');

const postDir = './posts';
const files = fs.readdirSync(postDir).filter(f => f.endsWith('.html'));

const listItems = files.map(f =>
  `<li><a href="posts/${f}">${f}</a></li>`
).join('\n');

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>My Blog</title>
</head>
<body>
  <h1>Welcome to My Blog</h1>
  <p>This is a collection of random HTML posts.</p>

  <h2>Posts</h2>
  <ul>
    ${listItems}
  </ul>
</body>
</html>
`;

fs.writeFileSync('index.html', html);

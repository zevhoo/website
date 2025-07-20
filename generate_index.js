const fs = require('fs');
const path = require('path');

const postsDir = './posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.html'));

const links = files.map(f => `<li><a href="posts/${f}">${f}</a></li>`).join('\n');

const html = `
<!DOCTYPE html>
<html>
<head><title>My Posts</title></head>
<body>
  <h1>Welcome to My Site</h1>
  <p>This is an auto-generated list of posts:</p>
  <ul>
    ${links}
  </ul>
</body>
</html>
`;

fs.writeFileSync('index.html', html);

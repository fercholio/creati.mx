const { Client } = require('ssh2');

const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect trailing slashes
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} (.+)/$
  RewriteRule ^ %1 [L,R=301]

  # Clean URLs mapping for HTML files
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}\\.html -f
  RewriteRule ^(.*)$ $1.html [NC,L]
</IfModule>
`;

const conn = new Client();
conn.on('ready', () => {
  const target = '/home/u583627395/domains/creati.mx/public_html/.htaccess';
  const cmd = `cat << 'EOF' > ${target}\n${htaccessContent}\nEOF\necho ".htaccess updated!"`;
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    });
  });
}).connect({
  host: '195.35.33.65',
  port: 65002,
  username: 'u583627395',
  password: 'Uxvx55M9534#CM@',
});

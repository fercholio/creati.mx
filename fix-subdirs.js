const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  const targetDir = '/home/u583627395/domains/creati.mx/public_html';
  const cmd = `
    cd ${targetDir}
    cp showroom.html showroom/index.html
    cp about.html about/index.html
    cp contact.html contact/index.html
    chmod -R 755 showroom about contact _next
    echo "Subdirectories index.html generated and permissions set!"
  `;
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

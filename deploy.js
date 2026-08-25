const { Client } = require('ssh2');
const fs = require('fs');

const zipPath = 'C:\\dev\\creati.mx\\creati-build.zip';
const remoteZip = '/home/u583627395/domains/creati.mx/public_html/creati-build.zip';
const targetDir = '/home/u583627395/domains/creati.mx/public_html';

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Client Connected. Starting SFTP upload...');

  conn.sftp((err, sftp) => {
    if (err) throw err;

    console.log(`Uploading ${zipPath} to ${remoteZip}...`);
    sftp.fastPut(zipPath, remoteZip, {}, (err) => {
      if (err) throw err;
      console.log('✅ Zip file uploaded successfully via SFTP!');

      const cmd = `
        cd ${targetDir}
        # Backup existing files if needed or clean up zip
        unzip -o creati-build.zip
        rm creati-build.zip
        echo "✅ UNZIPPED & DEPLOYED SUCCESSFULLY TO CREATIMX!"
        ls -la
      `;

      conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          console.log(`Deployment process finished with code ${code}`);
          conn.end();
        }).on('data', (data) => {
          console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      });
    });
  });
}).connect({
  host: '195.35.33.65',
  port: 65002,
  username: 'u583627395',
  password: 'Uxvx55M9534#CM@',
  readyTimeout: 30000,
});

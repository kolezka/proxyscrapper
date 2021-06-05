const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const rootDirectory = '/opt/node-apps';
const installationDirectory = '/opt/node-apps/proxyscrapper';

const serviceInstallationDirectory = '/lib/systemd/system'
const serviceFilePath = path.join(serviceInstallationDirectory, 'proxyscrapper.service');

const fileExists = (file) => {
  try {
    fs.existsSync(file);
    return true;
  } catch {
    return false;
  }
}

const dirExists = (dir) => {
  try {
    fs.readdirSync(dir);
    return true;
  } catch {
    return false;
  }
}

// Check if root directory exists
if (!dirExists(rootDirectory)) {
  fs.mkdirSync(rootDirectory);
}

// Remove installation directory 
if (dirExists(installationDirectory)) {
  console.log('Removing old build file')
  fs.rmdirSync(installationDirectory, {
    recursive: true,
  });
}

fs.mkdirSync(installationDirectory);
fs.mkdirSync(path.join(installationDirectory, 'workers'));

execSync('npm run build')

fs.copyFileSync(
  path.join(__dirname, 'dist/proxyscrapper.js'),
  path.join(installationDirectory, 'proxyscrapper.js'),
);

// const workers = fs.readdirSync(path.join(__dirname, 'dist/workers'), {
//   withFileTypes: true,
// })

// for (const worker of workers) {
//   const { name } = worker;
//   console.log('Copying worker', name)
//   fs.copyFileSync(
//     path.join(__dirname, 'dist/workers', name), 
//     path.join(installationDirectory, 'workers', name),
//   )
// }

if (fileExists(serviceFilePath)) {
  console.log('Removing old service definition');
  fs.rmSync(serviceFilePath);
}

fs.copyFileSync(
  path.join(__dirname, 'proxyscrapper.service'),
  serviceFilePath
);

console.log('Reload your daemon `systemctl daemon-reload`')

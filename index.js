#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = process.argv[2] || "backend";

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

execSync('npm init -y', { cwd: targetDir, stdio: 'inherit' });

execSync('npm install express', { cwd: targetDir, stdio: 'inherit' });

const serverJs = `
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
`

fs.writeFileSync(path.join(targetDir, 'server.js'), serverJs.trim());

fs.mkdirSync(path.join(targetDir,'models'));
fs.mkdirSync(path.join(targetDir,'controllers'));
fs.mkdirSync(path.join(targetDir,'routes'));
fs.mkdirSync(path.join(targetDir,'middleware'));

const packageJsonPath = path.join(targetDir, 'package.json');
const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

updatedPackageJson.scripts.start = "node server.js";
updatedPackageJson.scripts.dev = "npx nodemon server.js";

fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson,null,2));

console.log("\n\nNow run:");
console.log(`   cd ${targetDir}`);
console.log("   npm run dev\n");
console.log("Good luck!");
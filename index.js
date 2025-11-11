#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = process.argv[2] || "backend";

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

execSync('npm init -y', { cwd: targetDir, stdio: 'inherit' });

execSync('npm install express dotenv cors', { cwd: targetDir, stdio: 'inherit' });
execSync('npm i -D typescript @types/node @types/express ts-node prettier nodemon', { cwd: targetDir, stdio: 'inherit' });


const prettierRc = 
`{
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "useTabs": false,
    "trailingComma": "es5",
    "printWidth": 100,
    "arrowParens": "always",
    "endOfLine": "auto",
    "bracketSpacing": true,
    "jsxSingleQuote": false,
    "bracketSameLine": false
}
`
const tsConfig = `
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
`
const serverTs = `
import express, { Request, Response } from "express";
import 'dotenv/config';
const app = express();

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
});
`

const env=`
PORT=3000
`

const gitignore = `
node_modules/
.env
.env.local
.env.production
dist/
build/
logs/
*.log
.DS_Store
coverage/
`;

fs.mkdirSync(path.join(targetDir,'src'));
fs.writeFileSync(path.join(targetDir,'src' ,'server.ts'), serverTs.trim());
fs.writeFileSync(path.join(targetDir, '.env'),env.trim());
fs.writeFileSync(path.join(targetDir, '.gitignore'),gitignore.trim());
fs.writeFileSync(path.join(targetDir, 'tsconfig.json'),tsConfig.trim());
fs.writeFileSync(path.join(targetDir, '.prettierrc'),prettierRc.trim());

fs.mkdirSync(path.join(targetDir,'src', 'models'));
fs.mkdirSync(path.join(targetDir,'src', 'controllers'));
fs.mkdirSync(path.join(targetDir,'src', 'routes'));
fs.mkdirSync(path.join(targetDir,'src', 'middleware'));
fs.mkdirSync(path.join(targetDir,'src', 'services'));
fs.mkdirSync(path.join(targetDir,'src', 'utils'));

const packageJsonPath = path.join(targetDir, 'package.json');
const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

updatedPackageJson.scripts.start = "tsc -b && node dist/server.js";
updatedPackageJson.scripts.dev = "nodemon src/server.ts";

fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson,null,2));

console.log("\n\nNow run:");
console.log(`   cd ${targetDir}`);
console.log("   npm run dev\n");
console.log("Good luck!");
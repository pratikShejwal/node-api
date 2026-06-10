#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2];

if (!projectName) {
  console.log("Please provide project name");
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

fs.ensureDirSync(projectPath);

const folders = [
  "src/controllers",
  "src/routes",
  "src/middleware",
  "src/config"
];

folders.forEach(folder => {
  fs.ensureDirSync(path.join(projectPath, folder));
});

fs.writeFileSync(
  path.join(projectPath, "src/app.js"),
`
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.json({
        message:"Server Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(\`Server running on port \${PORT}\`);
});
`
);

fs.writeFileSync(
  path.join(projectPath, ".env"),
  "PORT=5000"
);

fs.writeFileSync(
  path.join(projectPath, ".gitignore"),
`
node_modules
.env
`
);

process.chdir(projectPath);

execSync("npm init -y", {
  stdio: "inherit"
});

execSync(
  "npm install express dotenv cors helmet morgan",
  {
    stdio: "inherit"
  }
);

execSync(
  "npm install -D nodemon",
  {
    stdio: "inherit"
  }
);

const pkg = require(path.join(projectPath, "package.json"));

pkg.scripts = {
  start: "node src/app.js",
  dev: "nodemon src/app.js"
};

fs.writeFileSync(
  path.join(projectPath, "package.json"),
  JSON.stringify(pkg, null, 2)
);

console.log("\nProject created successfully!\n");
console.log(`cd ${projectName}`);
console.log("npm run dev");
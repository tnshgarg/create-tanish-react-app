#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const templateDir = path.join(__dirname, "..", "templates");
const currentDir = process.cwd();

async function copyTemplateFiles() {
  try {
    await fs.copy(templateDir, currentDir);
    console.log("Template files copied successfully!");

    // Install TypeScript and related dependencies
    console.log("Installing TypeScript and dependencies...");
    exec(
      "npm install typescript @types/node @types/react @types/react-dom && npm install -D webpack-cli ts-loader",
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            `Error during TypeScript installation: ${error.message}`
          );
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log("TypeScript and dependencies installed successfully!");
      }
    );
  } catch (err) {
    console.error("Error copying template files:", err);
  }
}

copyTemplateFiles();

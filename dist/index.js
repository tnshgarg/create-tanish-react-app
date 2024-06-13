#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");
const templateDir = path.join(__dirname, "..", "templates");
const currentDir = process.cwd();
function copyTemplateFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs.copy(templateDir, currentDir);
            console.log("Template files copied successfully!");
            // Install TypeScript and related dependencies
            console.log("Installing TypeScript and dependencies...");
            exec("npm install typescript @types/node @types/react @types/react-dom && npm install -D webpack-cli ts-loader", (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error during TypeScript installation: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log("TypeScript and dependencies installed successfully!");
            });
        }
        catch (err) {
            console.error("Error copying template files:", err);
        }
    });
}
copyTemplateFiles();

#!/usr/bin/node

const process = require('process');
const path = require('path');
const fs = require('fs');
//var fse = require('fs-extra');
const child_process = require('child_process');
//const applyFsChangesModule = require('./apply_fs_changes.js');
const execSync = require('child_process').execSync;//

console.log(process.argv); // 0 - node, 1 - this script
console.log('=====================');
if (process.argv.length !== 4){
    console.error("Usage: node <this_script> <path_to_compiled_project_dir> <path_to_target_dir>");
    return;
}
const projectPath = process.argv[2];
const targetPath = process.argv[3];
// вставить проверку существования директорий, пути к которым переданы в аргументах к данному скрипту
var api = fs.readFileSync(path.join(projectPath, 'api'), 'utf8');
api = eval('[' + api + ']');
console.log('*****************');

//var index_html = fs.readFileSync('t/api_native.h', 'utf8');
//var index_html = fs.readFileSync(path.join(projectPath, ''), 'utf8');

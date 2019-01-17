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

// Фрагмент мёртвого кода: пока функции, обеспечивающие API сервера, не генерируются
var api = fs.readFileSync(path.join(projectPath, 'api'), 'utf8');
api = eval('[' + api + ']');
console.log('*****************');

let iconsResourceFile = '';
if (fs.existsSync(path.join(projectPath, 'configfiles', 'favicon.png'))){
    console.log('ICON DETECTED!!');
    // copyFileSync - нет такой функции в NodeJS v.6 => обхожу его использование через системный вызов
    //fs.copyFileSync(path.join(projectPath, 'configfiles', 'favicon.png'), targetPath);//path.join(targetPath, 'favicon.png'));
    execSync('cp  ' + path.join(projectPath, 'configfiles', 'favicon.png') + ' ' + targetPath + '/django_project/static/root_app/');
    iconsResourceFile += '\n<link href="{% static \'root_app/favicon.png\' %}" rel="shortcut icon" type="image/x-icon" />';
}
iconsResourceFile = fs.readFileSync(path.join(targetPath, 'django_project/templates/root_app/index.html'), 'utf8').replace('[ code here: favicon ]', iconsResourceFile);
fs.writeFileSync(path.join(targetPath, 'django_project/templates/root_app/index.html'), iconsResourceFile);

var nm; //gameplayNamesMap;
eval('nm = ' + fs.readFileSync(path.join(projectPath, 'namesMap.json'), 'utf8'));
var gp = fs.readFileSync(path.join(projectPath, 'gameplay.js'), 'utf8');
var o1234 = function(p){console.log(p);};
gp.replace(`${nm.Traliva}.${nm.init}(`, 'o1234(');
//eval(`${}`);
console.log(gp);

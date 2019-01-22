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
var traliva__o1234 = function(p){gp = p;};
gp = gp.replace(new RegExp(`${nm.Traliva}.${nm.init}\\(`, 'g'), 'traliva__o1234(');

eval(`'use strict';
var history = {};
${gp}`);
// Теперь в gp - объект, передаваемый в $Traliva.$init(..).

//console.log('gp:', gp); // теперь должны обойти дерево gp.tree
var tmp = gp[nm.states];
if (tmp)
    tmp = tmp[nm.tree];
console.log('tree:', tmp);

var stack = JSON.parse(JSON.stringify(tmp)),
    t1;
tmp = '';
while (stack.lengh){
    t1 = stack.pop();
    //if ()
}

/*
urlpatterns = [
    path('', views.index_html),
]

''

'book/{NUM}/'
    'book/{NUM}/page/{NUM}'
    'book/{NUM}/contents'
'books/'
'music/{NUM}/'

'auth/'
'auth/login/'
'auth/register/'

'book/{NUM}/auth/'
'book/{NUM}/auth/login'
'book/{NUM}/auth/register/auth/'
    'book/{NUM}/page/{NUM}/auth/'
    'book/{NUM}/page/{NUM}/auth/login/'
    'book/{NUM}/page/{NUM}/auth/register/'
    'book/{NUM}/contents/auth/'
    'book/{NUM}/contents/auth/login/'
    'book/{NUM}/contents/auth/register/'
'books/auth/'
'books/auth/login/'
'books/auth/register/'
'music/{NUM}/auth/'
'music/{NUM}/auth/login/'
'music/{NUM}/auth/register/'
=====================================================================
urlpatterns0 = [
    path('book/{NUM}/', include(urlpatterns1))
    path('books/', views.index_html)
    path('music/{NUM}/', views.index_html)
]
urlpatterns1 = [
    path('page/{NUM}/', views.index_html)
    path('contents', views.index_html)
]
urlpatterns2 = [
    path('auth/', include(urlpatterns3))
]
urlpatterns3 = [
    path('login/', views.index_html)
    path('register/', views.index_html)
]

urlpatterns = [
    path('', views.index_html),
    path('', include),
]

*/

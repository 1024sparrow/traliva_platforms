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
console.log('=========================');
console.log('tree:', tmp);

var stack = JSON.parse(JSON.stringify(tmp)),
    stack_1, stack_2,
    stackStarted,
    t1, t2, t3,
    t4, t5, t6
;
stack_1 = stack.slice();
tmp = '';
for (t1 = 0 ; t1 < stack.length ; ++t1){
    stack[t1]._level = 0;
}
while (stack_1.length){
    t1 = stack_1.shift();
    for (t2 in t1){
        if (t2[0] === '_')
            continue;
        //t1[t2]._stack = JSON.parse(JSON.stringify(stack_1));
        console.log('--:', t2);
        if (t1._prepath === undefined)
            t1._prepath = '';
        console.log(t1._prepath + t2 + '/');
        t1[t2]._paths = [t1._prepath + t2 + '/'];
        if (t1[t2].d){
            for (t3 = 0 ; t3 < t1[t2].d.length ; ++t3){
                t1[t2].d[t3]._prepath = t1._prepath + `${t2}/`;
                //t1[t2].d[t3]._stack = JSON.parse(JSON.stringify(stack_1));
                t1[t2].d[t3]._level = t1._level + 1;
                stack_1.unshift(t1[t2].d[t3]);
            }
        }
    }
}
stack_1 = stack.slice();
console.log('---------------------');
while_1: while (stack_1.length){
    t1 = stack_1.shift();
    for (t2 in t1){
        if (t2[0] === '_')
            continue;
        console.log('--:', t2, ' ---> ', t1[t2]._paths, ', level: ', t1._level);
        stack_2 = stack_1.slice();
        stackStarted = false;
        while_2: while (stack_2.length){
            t4 = stack_2.shift();
            if (!stackStarted){
                if (t4._level > t1._level)
                    ;//continue while_2;
                else
                    stackStarted = true;
            }
            for (t5 in t4){
                if (t5[0] === '_')
                    continue;
                if (stackStarted){
                    console.log(`add ${JSON.stringify(t4[t5]._paths)} to ${JSON.stringify(t1[t2]._paths)}`);
                    t4[t5]._paths = t1[t2]._paths.concat(t4[t5]._paths);
                }
                //t1[t2]._paths = t4[t5]._paths.concat(t4[t5]._paths);
                //console.log('\t\t', t4[t5]._paths);
                if (t4[t5].d){
                    for (t6 = 0 ; t6 < t4[t5].d.length ; ++t6){
                        stack_2.unshift(t4[t5].d[t6]);
                    }
                }
            }
        }
        if (t1[t2].d){
            for (t3 = 0 ; t3 < t1[t2].d.length ; ++t3){
                //t1[t2].d[t3]._prepath = t1._prepath + `${t2}/`;
                //t1[t2].d[t3]._stack = JSON.parse(JSON.stringify(stack_1));
                //t1[t2].d[t3]._level = t1._level + 1;
                stack_1.unshift(t1[t2].d[t3]);
            }
        }
    }
}
console.log('result tree:');
console.log('============');
console.log(JSON.stringify(stack, undefined, 2));
console.log('=========================');

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

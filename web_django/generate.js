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
console.log('tree:\n=====\n', JSON.stringify(tmp, undefined, 2));

var stack = JSON.parse(JSON.stringify(tmp)),
    stack_1, stack_2,
    stackStarted,
    cand, urls,
    t1, t2, t3,
    t4, t5, t6,
    t7, t8, t9,
    t10, t11, t12
;
stack_1 = stack.slice();
tmp = '';
let levelCounter = 0;
for (t1 = 0 ; t1 < stack.length ; ++t1){
    stack[t1]._level = 0;
    stack[t1]._getParent = function(){};
    stack[t1]._paths = [];
    stack[t1]._isRoot = true;
}
while (stack_1.length){
    t1 = stack_1.shift();
    for (t2 in t1){
        if (t2[0] === '_')
            continue;
        console.log('--:', t2);
        t1[t2]._name = t2;
        t1[t2]._paths = [];
        if (t3 = t1._getParent()){
            //console.log('t3 = ', t3);
            t1[t2]._paths.push(t3._paths[0].slice());
        }
        else{
            //console.log('parent is not defined');
            t1[t2]._paths.push([]);
        }
        t1[t2]._paths[0].push({name: t2, node: t1});
        console.log(`paths(${t1[t2]._paths[0].length}):`, t1[t2]._paths[0]);//
        if (t1[t2][nm['d']]){
            for (t3 = 0 ; t3 < t1[t2][nm['d']].length ; ++t3){
                t1[t2][nm['d']][t3]._getParent = (function(p_parent){return function(){return p_parent;};})(t1[t2]);
                t1[t2][nm['d']][t3]._isRoot = true;
                t1[t2][nm['d']][t3]._level = t1._level + 1;
                stack_1.unshift(t1[t2][nm['d']][t3]);
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
        console.log('--', t2);//
        //console.log('--:', t2, ' ---> ', t1[t2]._paths, ', level: ', t1._level);
        stack_2 = stack_1.slice();
        stackStarted = false;
        console.log('************ reseting ***********');
        stackStarted = true;//
        while_2: while (stack_2.length){
            t4 = stack_2.shift();
            console.log('  LEVEL:', t1._level, t4._level);
            /*if (!stackStarted){
                if (t1._level <= t4._level){
                    console.log('passing');
                    continue while_2;
                }
                else
                    stackStarted = true;
            }*/
            //if (t4._level <= t1._level)
            //    continue while_2;
            for (t5 in t4){
                console.log('::', t5);//
                if (t5[0] === '_')
                    continue;
                if (stackStarted){
                    for_6:for (t6 = 0 ; t6 < t1[t2]._paths.length ; ++t6){
                        t7 = [];//nodes
                        t8 = [];//names
                        for (t9 = 0 ; t9 < t1[t2]._paths[t6].length ; ++t9){
                            t10 = t1[t2]._paths[t6][t9];
                            t7.push(t10.node);
                            t8.push(t10.name);
                        }
                        for (t9 = 0 ; t9 < t4[t5]._paths[0].length ; ++t9){
                            t10 = t4[t5]._paths[0][t9];
                            t11 = t7.indexOf(t10.node);
                            if (t11 >= 0){
                                if (t8[t11] !== t10.name){
                                    continue for_6;
                                }
                            }
                        }
                        cand = t1[t2]._paths[t6].concat(t4[t5]._paths[0]);
                        t4[t5]._paths.push(cand);
                    }
                }
                else
                    console.log(`${t5}: not started yet...`);
                //console.log('\t\t', t4[t5]._paths);
                if (t4[t5][nm['d']]){
                    //for (t6 = 0 ; t6 < t4[t5][nm['d']].length ; ++t6){
                    for (t6 = t4[t5][nm['d']].length - 1 ; t6 >= 0  ; --t6){
                        stack_2.unshift(t4[t5][nm['d']][t6]);
                    }
                }
            }
        }
        if (t1[t2][nm['d']]){
            //for (t3 = 0 ; t3 < t1[t2][nm['d']].length ; ++t3){
            for (t3 = t1[t2][nm['d']].length - 1 ; t3 >= 0 ; --t3){
                stack_1.unshift(t1[t2][nm['d']][t3]);
            }
        }
    }
}
console.log('result tree:');
console.log('============');
console.log(JSON.stringify(stack, function(p_key, p_val){
    if (typeof p_val === 'function')
        return '<function>';
    if (p_key === '_paths') // p_value must be instance of Array
        return `<array(${p_val.length})>`;
    return p_val;
}, 2));
//console.log('=========================');

console.log('URLS:');
console.log('=====');
stack_1 = stack.slice();
urls = [];
while (stack_1.length){
    t1 = stack_1.shift();
    ////console.log(t1);
    for (t2 in t1){
        if (t2[0] === '_')
            continue;
        //console.log('--', t2);//
        ////console.log(t1[t2]);
        for (t3 = 0 ; t3 < t1[t2]._paths.length ; ++t3){
            ////console.log(t1[t2]._paths[t3]);
            let cand = '', cand2 = '';
            for (t4 of t1[t2]._paths[t3]){
                cand += t4.name + '/';
            }
            //console.log(cand, '(избыточная форма)');

            t6 = []; // список объектов, которые были упомянуты
            for (t4 = 0 ; t4 < t1[t2]._paths[t3].length ; ++t4){
                t5 = t1[t2]._paths[t3][t4];
                if (t6.indexOf(t5.node) < 0){
                    cand2 += t5.name + '/';
                    t6.push(t5.node);
                }
                else{
                    //console.log('BORIS: ', t5.name);
                }
            }
            //console.log(t1[t2].hasOwnProperty(nm['d']), '\t', cand2);
            urls.push({
                path: cand2,
                obj: t1[t2]
            });
        }
        if (t1[t2][nm['d']]){
            for (t3 = 0 ; t3 < t1[t2][nm['d']].length ; ++t3){
                stack_1.unshift(t1[t2][nm['d']][t3]);
            }
        }
    }
}
console.log('---------');
var urlsFile = '';
for (t1 = 0, t2 = urls.length ; t1 < t2 ; ++t1){
    t3 = urls.shift();
    //t4 = 'qwe' + t3.path;
    t4 = '\n    path(\'' + t3.path + '\', views.index_html),';
    urlsFile += t4;
    urls.push(t4);
}
t1 = path.join(targetPath, 'django_project/root_app/urls.py');
urlsFile = fs.readFileSync(t1, 'utf8').replace('[ code here: urls ]', urlsFile);
fs.writeFileSync(t1, urlsFile);

/*console.log('URLS: ', 'urls');
for (t1 of urls){
    console.log(t1);
}*/


///////////////////////////////////////
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

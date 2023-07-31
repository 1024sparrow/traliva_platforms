#!/bin/bash

function ERROR {
	echo "Ошибка сборки под платформу: $1"
	exit 1
}

echo "Местонахождение скрипита: $0"
echo "Первый параметр: $1" # путь до директории с project
echo "Второй параметр: $2" # путь до директории, в которой нужно нагенерировать исходники проекта

DIR="$(dirname $0)" # путь, где лежит этот скрипт
echo "cp -r \"$DIR\"/t/* \"$2\"/ || ERROR 100"
cp -r "$DIR"/t/* "$2"/ || ERROR 100
#cp -r "$1"/* "$2/django_project/root_app/static"
mkdir -p "$2"/django_project/{static,templates}/root_app

#cp -r "$1"/* "$2"/django_project/static/root_app/
sed "s/#RES#/res/g" "$1"/style.css > "$2"/django_project/static/root_app/style.css || ERROR 200
cp -r "$1"/{gameplay.js,res} "$2"/django_project/static/root_app/ || ERROR 300

mv "$2"/{index.html,robots.txt} "$2"/django_project/templates/root_app/ || ERROR 400

echo "pushd $DIR || ERROR 500"
pushd $DIR || ERROR 500
	echo "node generate.js \"$1\" \"$2\" || ERROR '600 (generate.js)'"
	node generate.js "$1" "$2" || ERROR '600 (generate.js)'
popd # $DIR

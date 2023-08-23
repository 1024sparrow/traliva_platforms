#!/bin/bash

echo "Местонахождение скрипта:  $0"
echo "Первый параметр:          $1" 1>&2 # путь до директории с project
echo "Второй параметр:          $2" 1>&2 # путь до директории, в которой нужно нагенерировать исходники проекта
echo "Текущая директория:       ${PWD}"

readonly SRC_DIR="$(dirname $0)" # путь, где лежит этот скрипт
readonly PROJ_DIR=$1 # Эту директорию модифицировать нельзя. Это директория, чтобы оттуда копировать.
readonly PLATFORM_NAME=$(basename $SRC_DIR)
readonly TARGET_DIR=$2 #"$ROOT/$PLATFORM_NAME"

function ERROR {
	echo "Ошибка сборки под платформу \"$PLATFORM_NAME\": $1"
	exit 1
}

cp -r $SRC_DIR/t/* $TARGET_DIR/ || ERROR $LINENO
#cp -r "$PROJ_DIR"/* "$TARGET_DIR/django_project/root_app/static"
mkdir -p $TARGET_DIR/django_project/{static,templates}/root_app

#cp -r "$1"/* "$2"/django_project/static/root_app/
sed "s/#RES#/res/g" $PROJ_DIR/style.css > $TARGET_DIR/django_project/static/root_app/style.css || ERROR $LINENO
cp -r $PROJ_DIR/{gameplay.js,res} $TARGET_DIR/django_project/static/root_app/ || ERROR 300

mv "$TARGET_DIR"/{index.html,robots.txt} $TARGET_DIR/django_project/templates/root_app/ || ERROR 400

pushd $SRC_DIR || ERROR 500
	echo "node generate.js \"$1\" \"$2\" || ERROR '600 (generate.js)'"
	node generate.js $PROJ_DIR $TARGET_DIR || ERROR '600 (generate.js)'
popd # $SRC_DIR

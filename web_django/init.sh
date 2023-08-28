#!/bin/bash

echo "Местонахождение скрипта:  $0"
echo "Первый параметр:          $1" 1>&2 # --init или --update
echo "Второй параметр:          $2" 1>&2 # путь до директории с project
echo "Третий параметр:          $3" 1>&2 # путь до директории, в которой нужно нагенерировать исходники проекта
echo "Текущая директория:       ${PWD}"

readonly SRC_DIR="$(dirname $0)" # путь, где лежит этот скрипт
readonly PROJ_DIR=$2 # Эту директорию модифицировать нельзя. Это директория, чтобы оттуда копировать.
readonly PLATFORM_NAME=$(basename $SRC_DIR)
readonly TARGET_DIR=$3 #"$ROOT/$PLATFORM_NAME"

function ERROR {
	echo "Ошибка сборки под платформу \"$PLATFORM_NAME\": $2"
	exit 1
}

if [ "$1" == --init ]
then
	cp -r $SRC_DIR/t/* $TARGET_DIR/ || ERROR $LINENO
	#cp -r "$PROJ_DIR"/* "$TARGET_DIR/django_project/root_app/static"
	mkdir -p $TARGET_DIR/django_project/{static,templates}/root_app
	mv "$TARGET_DIR"/{index.html,robots.txt} $TARGET_DIR/django_project/templates/root_app/ || ERROR $LINENO
elif [ "$1" == --update ]
then
	for i in static templates
	do
		[ -d $TARGET_DIR/django_project/$i/root_app ] ||
			ERROR "Директория \"$TARGET_DIR/django_project/$i/root_app\" не найдена"
	done
	for i in api namesMap.json gameplay.js
	do
		[ -f $PROJ_DIR/$i ] ||
			ERROR "Файл \"$PROJ_DIR/$i\" не найден"
	done
	for i in django_project/templates/root_app/index.html django_project/root_app/urls.py django_project/templates/root_app/index.html django_project/templates/root_app/robots.txt
	do
		[ -f $TARGET_DIR/$i ] ||
			ERROR "Файл \"$TARGET_DIR/$i\" не найден"
	done
else
	ERROR 'Некорректный первый параметр скрипту init.sh передан: "--init" или "--update" ожидается'
fi

#cp -r "$2"/* "$3"/django_project/static/root_app/
sed "s/#RES#/res/g" $PROJ_DIR/style.css > $TARGET_DIR/django_project/static/root_app/style.css || ERROR $LINENO
cp -r $PROJ_DIR/{gameplay.js,res} $TARGET_DIR/django_project/static/root_app/ || ERROR $LINENO

pushd $SRC_DIR || ERROR 500
	echo "node generate.js \"$2\" \"$3\" || ERROR '600 (generate.js)'"
	node generate.js $PROJ_DIR $TARGET_DIR || ERROR '600 (generate.js)'
popd # $SRC_DIR

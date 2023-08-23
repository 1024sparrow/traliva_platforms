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

ERROR 'not implemented' # boris here

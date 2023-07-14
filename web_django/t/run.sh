#!/bin/bash

declare virtualEnvActivated=false

function deactivateVirtualEnv {
	if $virtualEnvActivated
	then
		deactivate && echo virtual environment deactivated
	fi
}

function ERROR {
	deactivateVirtualEnv
	echo "Error: $1" >&2
	exit 1
}

pushd $(dirname $0) > /dev/null
	if [[ ! -d venv ]]
	then
		bash init_script.sh || ERROR 'can not initialize virtual environment'
	fi
	trap deactivateVirtualEnv SIGINT SIGTERM
	source venv/bin/activate && virtualEnvActivated=true && echo virtual environment activated || ERROR "Can not activate virtual environment"
	pushd django_project > /dev/null || ERROR 'Directory django_project not found'
		django-admin --version || ERROR 'django-admin not found...'
		./manage.py runserver 0.0.0.0:8080
	popd > /dev/null
	#PLATFORM_BUILD_PATH=static_build && ./manage.py runserver 0.0.0.0:8080
popd > /dev/null

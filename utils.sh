#!/bin/bash

function check_file_exists {
  if [ -f $1 ]; then
    echo 1
  else
    echo 0
  fi
}

function check_directory_exists {
  if [ -d $1 ]; then
    echo 1
  else
    echo 0
  fi
}

function check_port {
  if (nc -z localhost $1); then
    echo 1
  else
    echo 0
  fi
}

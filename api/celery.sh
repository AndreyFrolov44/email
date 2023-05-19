#!/bin/bash

if [[ "${1}" == "celery" ]]; then
  celery --app=tasks.worker:celery worker -l DEBUG
elif [[ "${1}" == "flower" ]]; then
  celery --app=tasks.worker:celery flower
 fi
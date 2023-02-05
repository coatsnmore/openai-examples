#!/bin/bash

source ../.env

curl -H "Content-Type: application/json" -H "Authorization: Bearer ${OPENAI_API_KEY}" -d @completion-request.json https://api.openai.com/v1/completions 
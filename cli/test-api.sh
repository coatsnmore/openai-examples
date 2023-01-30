#!/bin/bash

source ../.env
TOKEN=$OPENAI_API_KEY

curl https://api.openai.com/v1/completions -H "Content-Type: application/json" -H "Authorization: Bearer ${TOKEN}" -d @request.json
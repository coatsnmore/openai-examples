#!/bin/bash

source ../.env

SIMPLE_REQUEST=image=request.json
COMPLEX_REQUEST=complex-image-request.json

B64_IMAGE=$(curl -X POST https://api.openai.com/v1/images/generations \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d @$COMPLEX_REQUEST | jq -r .data[0].b64_json)

RAW_IMAGE_FILE=image.b64
echo $B64_IMAGE >> $RAW_IMAGE_FILE
base64 -d $RAW_IMAGE_FILE >> image.PNG
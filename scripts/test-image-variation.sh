#!/bin/bash

source ../.env

# curl -X POST https://api.openai.com/v1/images/edits \
#   -H "Authorization: Bearer $OPENAI_API_KEY" \
#   -d @test-image-variation.json

curl https://api.openai.com/v1/images/variations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F image='@image.PNG' \
  -F n=2 \
  -F size="512x512"
  
# B64_IMAGE=$(curl -X POST https://api.openai.com/v1/images/edits \
#   -H 'Content-Type: application/json' \
#   -H "Authorization: Bearer $OPENAI_API_KEY" \
#   -d @edit-image.json | jq -r .data[0].b64_json)

# RAW_IMAGE_FILE=edited-image.b64
# echo $B64_IMAGE >> $RAW_IMAGE_FILE
# base64 -d $RAW_IMAGE_FILE >> edited-image.PNG
if [ -d schemas ]
then rm -rf schemas
fi
mkdir schemas
generate(){
    yarn run typescript-json-schema ../types/$1.ts $2 -o schemas/$2.json
}
generate data OriginalCharacterData
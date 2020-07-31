#!/usr/bin/env bash

set -eu

repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_name="origin"
main_branch="master"
target_branch="gh-pages"
build_dir="dist"

cd "$GITHUB_WORKSPACE"

# curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
# sudo apt-get install git-lfs python3-setuptools

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

cd generate
yarn install
yarn build
cd ../frontend
yarn install
yarn build
cd ..
mv frontend/dist ./dist
mv generate/dist/data ./dist/data


cp .gitattributes dist/.gitattributes

cd dist
git init
git checkout --orphan gh-pages
git lfs install
git config user.name "$GITHUB_ACTOR"
git config user.email "${GITHUB_ACTOR}@bots.github.com"
git add .

git commit -m "updated GitHub Pages"
if [ $? -ne 0 ]; then
    echo "nothing to commit"
    exit 0
fi

pwd
git remote add "$remote_name" "$repo_uri" # includes access token
git push --force "$remote_name" "$target_branch"
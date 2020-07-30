#!/usr/bin/env bash

set -eu

repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_name="origin"
main_branch="master"
target_branch="gh-pages"
build_dir="dist"

cd "$GITHUB_WORKSPACE"

curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs python3-setuptools

pip3 install -r requirements.txt
python3 generate

# if [ -d /tmp/dist ]
# then rm -rf /tmp/dist
# fi

cp .gitattributes dist/.gitattributes

# mv dist /tmp/dist
# cd /tmp/dist
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
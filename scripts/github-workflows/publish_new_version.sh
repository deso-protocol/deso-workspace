#!/bin/bash

set -e

# Script used in github actions workflows to publish based on release tag.

# Tags should be formatted in the following way:
# <package-name>/<version-number>
# example: deso-protocol/0.0.1
#
# For a pre-release, use the following format:
# <package-name>/<version-number>-beta.<pre-release-version>
# example: deso-protocol/0.0.1-beta.0
LAST_TAG=$(git describe --tags --abbrev=0)
PACKAGE=$(echo $LAST_TAG | cut -d/ -f1)
NEW_VERSION=$(echo $LAST_TAG | cut -d/ -f2)
NPM_PRERELEASE_TAG=$(echo $NEW_VERSION | cut -d '-' -f 2 | cut -d '.' -f 1)

echo "Preparing to release $PACKAGE@$NEW_VERSION"
echo "Pre-relesae tag: $NPM_PRERELEASE_TAG"

npm ci
cd libs/$PACKAGE
npm version $NEW_VERSION
cd -
npx nx run $PACKAGE:build
cd dist/libs/$PACKAGE

# If the version is a pre-release (beta), publish with the --tag flag.
if [[ $NPM_PRERELEASE_TAG == beta ]]; then
  echo "Publishing pre-release version $NEW_VERSION"
  npm publish --tag $NPM_PRERELEASE_TAG --access public
# if the parsed prelease tag is a number, it's just a regular release.
elif [[ $NPM_PRERELEASE_TAG =~ ^[0-9]+$ ]]; then
  echo "Publishing latest stable version $NEW_VERSION"
  npm publish --access public
else
  echo "Invalid version format for $NEW_VERSION. Please use the following format: <package-name>/<version-number> or <package-name>/<version-number>-beta.<pre-release-version>"
  exit 1
fi

RELEASE_VERSION=$(grep version package.json | awk -F \" '{print $4}')
echo "::notice::New version successfully released: $RELEASE_VERSION"
cd -
git add libs/$PACKAGE/package.json
git commit -m "ci: automated release version $PACKAGE@$RELEASE_VERSION"
git pull --rebase origin main
git push origin HEAD:main

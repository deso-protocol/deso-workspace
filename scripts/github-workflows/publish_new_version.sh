set -e
# Script used in github actions workflows to publish based on release tag.

# Tags should be formatted in the following way:
# <package-name>/<version-number>
# example: deso-protocol/0.0.1
LAST_TAG=`git describe --tags --abbrev=0`
PACKAGE=`echo $LAST_TAG | cut -d/ -f1`
NEW_VERSION=`echo $LAST_TAG | cut -d/ -f2`

echo "Preparing to release $PACKAGE@$NEW_VERSION"
npm ci
cd libs/$PACKAGE
npm version $NEW_VERSION
cd -
npx nx run $PACKAGE:build
cd dist/libs/$PACKAGE
npm publish --access public
RELEASE_VERSION=`grep version package.json | awk -F \" '{print $4}'`
echo "::notice::New version successfully released: $RELEASE_VERSION"
cd -
git add libs/$PACKAGE/package.json
git commit -m "ci: automated release version $PACKAGE@$RELEASE_VERSION"
git push origin HEAD:master

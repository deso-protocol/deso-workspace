## How to publish a new production ready version of a library

1. Click the "Releases" link in the right rail of the repo on github (should take you here https://github.com/deso-protocol/deso-workspace/releases)

2. Click the "Draft a new release" button
3. Click the "Choose a tag" selector.

4. Instead of choosing a previous tag, type in the "find or create a new tag"
   field the lib name plus the new version separated by forward slash: something
   like `deso-protocol/0.7.38` or `identity/0.0.19`. **The version should be
   incremented based on the previous release tag and will be the version number
   used to publish to npm.**

5. Click "Create new tag" just under the input field

6. Add a short title related to the changes in the release

7. Click "Generate release notes" to auto populate the description. You can optionally modify this or
   publish it "as is."

8. Click "Publish Release"

NOTE: To track the status of the publish workflow, you can visit the [Actions tab](https://github.com/deso-protocol/deso-workspace/actions) of the repo. If the action completes without any errors then you should be ready to use the new version published to npm.

## How to publish a new pre-release (beta) version of a library

1. Click the "Releases" link in the right rail of the repo on github (should take you here https://github.com/deso-protocol/deso-workspace/releases)

2. Click the "Draft a new release" button

3. Click the "Choose a tag" selector.

4. Instead of choosing a previous tag, type in the "find or create a new tag"
   field the lib name plus the new version separated by forward slash and add a
   pre-release tag, typically `beta.0`. **Note that you may need to increment the
   beta version if there is an existing pre-release for the latest version.**
   Something like `deso-protocol/0.7.38-beta.0` or `identity/0.0.19-beta.1`.

5. Click "Create new tag" just under the input field

6. Add a short title related to the changes in the release

7. Click "Generate release notes" to auto populate the description. You can optionally modify this or
   publish it "as is."

8. Select the "Set as pre-release" option.

9. Click "Publish Release"

10. Once it is published to npm, to install and use the beta version in a project
    you will need to run `npm i <npm-package-name>@beta`. For example, if we've
    published a beta version of deso-protocol you would need to run `npm i deso-protocol@beta`

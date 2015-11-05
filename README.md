# Maestrano API Tool

## Connec!™ API previewer

## Impac!™ API previewer

### Notes for busy developers

#### Install dependencies
```bash
npm install
bower install
```

#### Run locally
```bash
gulp serve
```

#### Publish an updated version of the tool
```bash
# generate the distribution package
gulp
# add a friendly commit message
git add dist && git commit -m "my awesome feature"
# push to github pages
git subtree push --prefix dist origin gh-pages
```
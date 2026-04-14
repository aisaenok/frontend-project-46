install:
	npm ci

publish: #Publish
	npm publish --dry-run

lint:
	npx eslint .

gendiff-help:
	node bin/gendiff.js -h
install:
	npm ci

publish: #Publish
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm run test:coverage

gendiff-help:
	node bin/gendiff.js -h
release:
	make test
	git add . && git commit -m "$(m)" && git push

test:
	npm run test
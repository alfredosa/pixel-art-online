
run:
	@npm run build && flask run --debug --extra-files templates/index.html:static/js/app.js:static/css/output.css

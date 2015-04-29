var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();
app.listen(process.env.PORT || 5000);

app.get('/', function (req, res, next) {
	superagent.get('https://www.cnodejs.org')
		.end(function (err, sres) {
			if (err) {
				return next(err);
			}
			var $ = cheerio.load(sres.text);
			var items = [];
			items.push({version:'1.0.0'});
			$("a.topic_title").each(function(i, element){
				items.push({
					'href' : $(element).attr('href'),
					'title' : $(element).attr('title')
				});
			});
			res.send(items);
		});
});

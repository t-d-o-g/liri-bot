require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('../config/keys');
var repl = require('repl');


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var r = repl.start('\u{1F916} ');
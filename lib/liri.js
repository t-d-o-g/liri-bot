require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('../config/keys');
var repl = require('repl');


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var arg = process.argv[2]; 


if (arg === 'my-tweets') {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Here are your latest Tweets. What else can I do for you?\n');
    r.displayPrompt();
} else if (arg === 'spotify-this-song') {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Here is your song. What else can I do for you?\n');
    r.displayPrompt();
} else if (arg === 'movie-this') {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Here is your movie stats. What else can I do for you?\n');
    r.displayPrompt();
} else if (arg === 'do-what-it-says') {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Here you go. What else can I do for you?\n');
    r.displayPrompt();
} else if (arg !== undefined) {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log("Sorry I don't know that command, but if you think I should you can open an issue in my repo: https://github.com/t-d-o-g/liri-bot/issues\n");
    r.displayPrompt();
} else {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Hello, I am Liri. Would you like to listen to a song, see movie stats, or get your latest Tweets?\n');
    r.displayPrompt();
}

function myEval(cmd, context, filename, callback) {
    var exitCmds = ['exit', 'quit', 'nothing', 'bye', 'sianara', 'have a nice life, i guess?'];

    for (var i = 0; i < exitCmds.length; i++) {
        if (cmd.toLowerCase().trim() === exitCmds[i]) {
            console.log('\n\u{1F916} OK see you later, bye.');
            process.exit();
        }
    }
    callback(null, cmd);
}

function myWriter(response) {
    var myResponse = ("\n\u{1F916} What else can I do for you?\n");
    return myResponse;
}

r.context['my-tweets'] = (obj) => {
    myWriter();
    return Object.assign(obj, { prop: 'something' });
}

r.context['spotify-this-song'] = (obj) => {
    myWriter();
    return Object.assign(obj, { prop: 'something' });
}

r.context['movie-this'] = (obj) => {
    myWriter();
    return Object.assign(obj, { prop: 'something' });
}

r.context['do-what-it-says'] = (obj) => {
    myWriter();
    return Object.assign(obj, { prop: 'something' });
}
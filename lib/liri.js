require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('../config/keys');
var repl = require('repl');


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var arg1 = process.argv[2]; 
var arg2 = process.argv.splice(3).join(',').replace(/,/g, ' ');
var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});

if (arg1 === 'my-tweets') {
    var params = {screen_name: 'trc2291', count: 20};
    console.log('Here are your latest Tweets. Bye!\n');
    twitter.get('statuses/user_timeline', params, function(err, tweets, response) {
        if (err) {
            console.error(err);
        } else {
            for (var i = 0; i < tweets.length; i++) {
                r.displayPrompt();
                console.log(tweets[i].text);
                if (i === tweets.length-1) {
                    process.exit();
                }
            }
        }
    });
} else if (arg1 === 'spotify-this-song') {
    var params = {type: 'track', query: arg2 || 'robot rock', limit: 1};
    spotify.search(params, function(err, data) {
        if (err) {
            console.error(err);
        } else {
            var song = data.tracks.items[0].name;
            var previewUrl = data.tracks.items[0].preview_url;  
            var album = data.tracks.items[0].album.name;
            var artists = data.tracks.items[0].artists;
            var allArtists = '' 
            for (var i = 0; i < artists.length; i++) {
                if (i === artists.length - 1) {
                    allArtists += artists[i].name;
                } else {
                    allArtists += artists[i].name + ', ';
                }
            }
            console.log(`The song "${song}" by ${allArtists} is on the album "${album}"`);
            r.displayPrompt();
            console.log(`Listen to a clip here: ${previewUrl}\n`);
            r.displayPrompt();
            console.log(`Enjoy!`);
            process.exit();
        }
    })
} else if (arg1 === 'movie-this') {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Here is your movie stats. Bye!\n');
    r.displayPrompt();
} else if (arg1 === 'do-what-it-says') {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Here you go. Bye!\n');
    r.displayPrompt();
} else if (arg1 !== undefined) {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log("Sorry I don't know that command, but if you think I should you can open an issue in my repo: https://github.com/t-d-o-g/liri-bot/issues\n");
    r.displayPrompt();
} else {
    var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});
    console.log('Hello, I am Liri. Would you like to listen to a song, see movie stats, or get your latest Tweets?\n');
    r.displayPrompt();
}

function myEval(cmd, context, filename, callback) {
    var exitCmds = ['exit', 'quit', 'nothing', 'bye'];

    for (var i = 0; i < exitCmds.length; i++) {
        if (cmd.toLowerCase().trim() === exitCmds[i]) {
            console.log('\n\u{1F916} OK see you later, bye.');
            process.exit();
        }
    }

    // console.log(context);
    callback(null, cmd);
}

function myWriter(response) {
    var myResponse = ("\n\u{1F916} What else can I do for you?\n");
    return myResponse;
}

// r.defineCommand('my-tweets', {
//     action() {
//         console.log('\n\u{1F916} Here are your latest Tweets.\n');
//         r.displayPrompt();
//     }
// })

/*
r.context['my-tweets'] = (obj) => {
    console.log("\n\u{1F916} Here are your Tweets."); 
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
*/

// console.log(r.context);
require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('../config/keys');
var repl = require('repl');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var arg1 = process.argv[2]; 
var arg2 = process.argv.splice(3).join(',').replace(/,/g, ' ');
var r = repl.start({prompt: '\u{1F916}  ', eval: myEval, writer: myWriter});

if (arg1 === 'my-tweets') {
    var params = {screen_name: 'trc2291', count: 20};
    botSpeak(`Here are your latest Tweets.\n`);
    twitter.get('statuses/user_timeline', params, function(err, tweets) {
        if (err) {
            botSpeak(`I was not able to find your Tweets.`);
            botSpeak(`Sorry!`, '\r');
        } else {
            for (var i = 0; i < tweets.length; i++) {
                botSpeak(`${tweets[i].created_at}: ${tweets[i].text}`);
            }
            botSpeak(`Bye!`, `\r`);
        }
        process.exit();
    });
} else if (arg1 === 'spotify-this-song') {
    var params = {type: 'track', query: arg2 || 'robot rock', limit: 1};
    spotify.search(params, function(err, data) {
        if (err) {
            botSpeak(`I could not find that song.`);
            botSpeak(`Sorry!`, '\r');
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
            botSpeak(`The song "${song}" by ${allArtists} is on the album "${album}"`);
            if (previewUrl) {
                botSpeak(`Listen to a clip here: ${previewUrl}\n`);
                botSpeak(`Enjoy!`);
            } else {
                botSpeak(`Song preview was not provided.\n`);
                botSpeak(`Sorry!`);
            }
        }
        process.exit();
    })
} else if (arg1 === 'movie-this') {
    if (arg2) {
        var queryUrl = 'http://www.omdbapi.com/?t=' + arg2 + '&y=&plot=short&apikey=trilogy';
    } else {
        var queryUrl = 'http://www.omdbapi.com/?t=' + '2001' + '&y=&plot=short&apikey=trilogy';
    }
    request(queryUrl, function (err, res, body) {
        if (err) {
            botSpeak(`I could not find that movie`);
            botSpeak(`Sorry!`, '\r');
        } else {
            jsonBody = JSON.parse(body);
            if (jsonBody.Response === 'False') {
                botSpeak(`I could not find that movie`);
                botSpeak(`Sorry!`, '\r');
            } else {
                botSpeak(`Here are your movie stats.\n`);
                botSpeak(`Title: ${jsonBody.Title}`);
                botSpeak(`Release year: ${jsonBody.Year}`);
                botSpeak(`Rated: ${jsonBody.Rated}`);
                botSpeak(`Film location: ${jsonBody.Country}`);
                botSpeak(`Film language: ${jsonBody.Language}`);
                botSpeak(`Film plot: ${jsonBody.Plot}`);
                botSpeak(`Actors: ${jsonBody.Actors}`);
                botSpeak(`Bye!`, `\r`);
            }
        }
        process.exit();
    })
    // Needs refactor
} else if (arg1 === 'do-what-it-says') {
    botSpeak('Uhm, ok?\n');
    fs.readFile('data/random.json', 'utf8', function (err, data) {
        if (err) {
            botSpeak(`Entropy seems to have gotten the best of me.`);
            botSpeak(`Sorry!`, '\r');
        } else {
            var json = JSON.parse(data);
            var randNum1 = getRandInt(json.length);
            var randObj = json[randNum1];
            var randKey = Object.keys(randObj);
            var randNum2 = getRandInt(json[randNum1][randKey[0]].length)
            var randQuery = json[randNum1][randKey[0]][randNum2];
            if (randKey[0] === 'my-tweets') {
                var params = {screen_name: 'trc2291', count: 20};
                botSpeak(`Here are your latest Tweets.\n`);
                twitter.get('statuses/user_timeline', params, function(err, tweets) {
                    if (err) {
                        botSpeak(`I was not able to find your Tweets.`);
                        botSpeak(`Sorry!`, '\r');
                    } else {
                        for (var i = 0; i < tweets.length; i++) {
                            botSpeak(`${tweets[i].created_at}: ${tweets[i].text}`);
                        }
                        botSpeak(`Bye!`, `\r`);
                    }
                    process.exit();
                });
            } else if (randKey[0] === 'spotify-this-song') {
                var params = {type: 'track', query: randQuery, limit: 1};
                spotify.search(params, function(err, data) {
                    if (err) {
                        botSpeak(`I could not find that song.`);
                        botSpeak(`Sorry!`, '\r');
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
                        botSpeak(`The song "${song}" by ${allArtists} is on the album "${album}"`);
                        if (previewUrl) {
                            botSpeak(`Listen to a clip here: ${previewUrl}\n`);
                            botSpeak(`Enjoy!`);
                        } else {
                            botSpeak(`Song preview was not provided.\n`);
                            botSpeak(`Sorry!`);
                        }
                    }
                    process.exit();
                })
            } else {
                var queryUrl = 'http://www.omdbapi.com/?t=' + randQuery + '&y=&plot=short&apikey=trilogy';
                request(queryUrl, function (err, res, body) {
                    if (err) {
                        botSpeak(`I could not find that movie`);
                        botSpeak(`Sorry!`, '\r');
                    } else {
                        jsonBody = JSON.parse(body);
                        if (jsonBody.Response === 'False') {
                            botSpeak(`I could not find that movie`);
                            botSpeak(`Sorry!`, '\r');
                        } else {
                            botSpeak(`Here are your movie stats.\n`);
                            botSpeak(`Title: ${jsonBody.Title}`);
                            botSpeak(`Release year: ${jsonBody.Year}`);
                            botSpeak(`Rated: ${jsonBody.Rated}`);
                            botSpeak(`Film location: ${jsonBody.Country}`);
                            botSpeak(`Film language: ${jsonBody.Language}`);
                            botSpeak(`Film plot: ${jsonBody.Plot}`);
                            botSpeak(`Actors: ${jsonBody.Actors}`);
                            botSpeak(`Bye!`, `\r`);
                        }
                    }
                    process.exit();
                })
            }
        }
    });
} else if (arg1 !== undefined) {
    botSpeak(`I don't know that command, but if you think I should you can open an issue here: https://github.com/t-d-o-g/liri-bot/issues`);
    botSpeak(`Sorry!`, '\r');
    process.exit();
} else {
    botSpeak(`Hello, I am Liri. Would you like to listen to a song, see movie stats, or get your latest Tweets?`);
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

    callback(null, cmd);
}

function myWriter(response) {
    var myResponse = ("\n\u{1F916} What else can I do for you?\n");
    return myResponse;
}

function botSpeak(words, beforePrompt) {
    if (beforePrompt) {
        console.log(beforePrompt);
    }
    r.displayPrompt();
    console.log(words);
}

function getRandInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
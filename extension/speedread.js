var speedReadGlobals = {
	index: -1,
	words: null,
	isPlaying: false,
	wordsPerMinute: 700
};
chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			if(true){ // I guess we should check if it's actually from it?
				SpeedRead(request);
			}
		}
);

function SpeedRead(context){
	var html = 
		['<div id="speedread-background">',
		'	<div id="speedread-overlay">',
		'		<style type="text/css">',
		'			#speedread-background{',
		'				width: 100%;',
		'				height: 100%;',
		'			}',
		'			#speedread-overlay{',
		'				left: 0;',
		'				right: 0;',
		'				z-index: 9001;',
		'				height: 350px;',
		'				background-color: rgba(0, 0, 0, .5);',
		'				width: 100%;',
		'				position: fixed;',
		'				margin: 10% auto;',
		'				font-family: "Times New Roman" !important;',
		'				font: normal !important;',
		'			}',
		'			#speedread-main{',
		'				width: 512px;',
		'				margin: 0 auto;',
		'				height: 100%;',
		'				color: black;',
		'				background-color: rgba(255, 255, 255, .9 ) !important;',
		'				border: black 1px solid;',
		'			}',
		'			#speedread-exit-button{',
		'				float: right;',
		'				cursor: pointer;',
		'				padding: 8px 8px 0 0;',
		'			}',
		'			#speedread-current-word{',
		'				font-weight: 500;',
		'				height: 128px;',
		'				width: 256px;',
		'				font-size: 4em;',
		'				text-align: center;',
		'				margin: 0 auto;',
		'				padding-top: 80px;',
		'				vertical-align: middle;',
		'			}',
		'			span.speedread-center-word{',
		'				display: inline-block;',
		'				vertical-align: middle;',
		'			}',
		'			#speedread-control-button{',
		'				width: 64px;',
		'				height: 32px;',
		'				margin: 32px auto 0 auto;',
		'				text-align: center;',
		'				cursor: pointer;',
		'			}',
		'			.speedread-button{',
		'				display: inline-block;',
		'				padding: 6px 12px;',
		'				margin-bottom 0;',
		'				font-size: 14px;',
		'				font-weight: normal;',
		'				line-height: 1.42;',
		'				text-align: center;',
		'				white-space: nowrap;',
		'				vertical-align: middle;',
		'				cursor: pointer;',
		'				background-image: none;',
		'				border: 1px solid transparent;',
		'				border-radius: 4px;',
		'				color: #fff;',
		'				background-color: #428bca;',
		'				background-color: #357edb;',
		'			}',
		'			#speedread-pause, #speedread-replay{',
		'				display: none;',
		'			}',
		'			#speedread-wordcount, #speedread-words-per-minute{',
		'				display: inline-block;',
		'			}',
		'			#speedread-word-rate{',
		'				padding-top: 32px;',
		'				width: 384px;',
		'				text-align: center;',
		'				margin: 0 auto;',
		'				font-size: 1.2em;',
		'			}',
		'		</style>',
		'',
		'		<div id="speedread-main">',
		'			<div id="speedread-exit-button">[x]</div>',
		'			<div id="speedread-current-word"></div>',
		'			<div id="speedread-control-button">',
		'				<button class="speedread-button" id="speedread-play">Play</button>',
		'				<button class="speedread-button" id="speedread-pause">Pause</button>',
		'				<button class="speedread-button" id="speedread-replay">Replay</button>',
		'			</div>',
		'			<div id="speedread-word-rate">',
		'				<div id="speedread-wordcount">500</div> words at',
		'				<div id="speedread-words-per-minute">500</div> words/minute',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'].join("\n");
	var splitregex = /[\s\u2013\u2014-]/
	speedReadGlobals.words = context.info.selectionText.split(splitregex);
	document.getElementsByTagName("body")[0].innerHTML = html + document.getElementsByTagName("body")[0].innerHTML;
	document.getElementById('speedread-current-word').innerHTML = speedReadGlobals.words[++speedReadGlobals.index];
	document.getElementById('speedread-wordcount').innerHTML = speedReadGlobals.words.length;
	Listeners();
}

function Listeners(){
	var playButtonID = 'speedread-play';
	var pauseButtonID = 'speedread-pause';
	var replayButonID = 'speedread-replay';
	document.getElementById(playButtonID).onclick = play;
	document.getElementById(pauseButtonID).onclick = pause;
	document.getElementById(replayButonID).onclick = replay;
	document.getElementById('speedread-exit-button').onclick = closeSR;
	document.getElementById('speedread-words-per-minute').onclick = function(){console.log('pewpew');};
	document.getElementById('speedread-background').onclick = closeSR;
}

// Functions for playing/pausing text

function play(){
	speedReadGlobals.isPlaying = true;
	toggleVisability('speedread-pause');
	setTimeout(incrementWord, minsToMillis());
}

function pause(){
	speedReadGlobals.isPlaying = false;
	toggleVisability('speedread-play');
}

function replay(){
	speedReadGlobals.index = -1;
	play();
}

function toggleVisability(showElement){
	var buttons = document.getElementsByClassName("speedread-button");
	for(var i = buttons.length - 1; i >= 0; i--){
		buttons[i].style.display = 'none';
	}
	document.getElementById(showElement).style.display = 'block';
}

function incrementWord(){
	if(!speedReadGlobals.isPlaying){
		return;
	}
	document.getElementById('speedread-current-word').innerHTML = speedReadGlobals.words[++speedReadGlobals.index];
	if(speedReadGlobals.words.length ===  (speedReadGlobals.index + 1)){
		speedReadGlobals.isPlaying = false;
		toggleVisability("speedread-replay");
	}
	setTimeout(incrementWord, minsToMillis());
}

function minsToMillis(){
	return (60000 / speedReadGlobals.wordsPerMinute);
}

function closeSR(){
	var elem = document.getElementById('speedread-overlay');
	speedReadGlobals.index = -1;
	speedReadGlobals.word = null;
	speedReadGlobals.isPlaying = false;
	elem.parentNode.removeChild(elem);
}

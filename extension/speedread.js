var speedReadGlobals = {
	index: -1,
	words: null,
	isPlaying: false,
	wordsPerMinute: 500
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
		['<style type="text/css">',
		'	body{',
		'		background-color: orange;',
		'	}',
		'',
		'	#overlay{',
		'		height: 288px;',
		'		background-color: rgba(255, 255, 255, 0.5);',
		'		width: 100%;',
		'	}',
		'	#main{',
		'		width: 512px;',
		'		margin: 0 auto;',
		'		height: 100%;',
		'		color: black;',
		'		background-color: rgba(255, 255, 182, 0.3 ) !important;',
		'	}',
		'	#exit-button{',
		'		float: right;',
		'		cursor: pointer;',
		'		padding: 8px 8px 0 0;',
		'	}',
		'	#current-word{',
		'		height: 128px;',
		'		width: 256px;',
		'		font-size: 3em;',
		'		text-align: center;',
		'		margin: 0 auto;',
		'		padding-top: 32px;',
		'		vertical-align: middle;',
		'	}',
		'	span.center-word{',
		'		display: inline-block;',
		'		vertical-align: middle;',
		'	}',
		'	#control-button{',
		'		width: 64px;',
		'		height: 32px;',
		'		margin: 64px auto 0 auto;',
		'		text-align: center;',
		'		cursor: pointer;',
		'	}',
		'	.button{',
		'		display: inline-block;',
		'		padding: 6px 12px;',
		'		margin-bottom 0;',
		'		font-size: 14px;',
		'		font-weight: normal;',
		'		line-height: 1.42;',
		'		text-align: center;',
		'		white-space: nowrap;',
		'		vertical-align: middle;',
		'		cursor: pointer;',
		'		background-image: none;',
		'		border: 1px solid transparent;',
		'		border-radius: 4px;',
		'		color: #fff;',
		'		background-color: #428bca;',
		'		background-color: #357edb;',
		'	}',
		'	#pause{',
		'		display: none;',
		'	}',
		'	#wordcount, #words-per-minute{',
		'		display: inline-block;',
		'	}',
		'	#word-rate{',
		'		padding-top: 32px;',
		'		width: 384px;',
		'		text-align: center;',
		'		margin: 0 auto;',
		'	}',
		'</style>',
		'<div id="overlay">',
		'	<div id="main">',
		'		<div id="exit-button">[x]</div>',
		'		<div id="current-word"></div>',
		'		<div id="control-button">',
		'			<button class="button" id="play">Play</button>',
		'			<button class="button" id="pause">Pause</button>',
		'		</div>',
		'		<div id="word-rate">',
		'			<div id="wordcount">500</div> words at',
		'			<div id="words-per-minute">500</div> words/minute',
		'		</div>',
		'	</div>',
		'</div>'].join("\n");
	speedReadGlobals.words = context.info.selectionText.split(" ");
	document.getElementsByTagName("body")[0].innerHTML = html;
	document.getElementById('current-word').innerHTML = speedReadGlobals.words[++speedReadGlobals.index];
	playListener();
}

function playListener(){
	var playButtonID = 'play';
	document.getElementById(playButtonID).onclick = play;
}

// Functions for playing/pausing text

function play(){
	speedReadGlobals.isPlaying = true;
	setTimeout(incrementWord, minsToMillis());
}

function incrementWord(){
	if(!speedReadGlobals.isPlaying){
		return;
	}
	document.getElementById('current-word').innerHTML = speedReadGlobals.words[++speedReadGlobals.index];
	setTimeout(incrementWord, minsToMillis());
}

function minsToMillis(){
	return (60000 / speedReadGlobals.wordsPerMinute);
}

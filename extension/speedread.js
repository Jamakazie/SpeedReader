chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			console.log(sender.tab);
			if(true){ // I guess we should check if it's actually from it?
				SpeedRead(request);
			}
		}
);

function SpeedRead(context){
	var html = 
		['<style type="text/css">',
		'',
		'	#overlay{',
		'		height: 288px;',
		'		color: white;',
		'		width: 100%;',
		'		opacity: 0.5;',
		'	}',
		'	#main{',
		'		width: 512px;',
		'		margin: 0 auto;',
		'		height: 100%;',
		'		color: black;',
		'		opacity: 1.0;',
		'	}',
		'</style>',
		'<div id="overlay">',
		'	<div id="main"></div>',
		'</div>'].join("\n");
	document.getElementsByTagName('body')[0].innerHTML = html;
	document.getElementById("main").innerHTML = context.info.selectionText;
	console.log(context);
}

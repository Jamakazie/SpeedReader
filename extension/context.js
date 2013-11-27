// javascript that will assist with speed reading

var selection = chrome.contextMenus.create(
		{
			"title": "Speedread",
    			"contexts": ["selection"],
    			onclick: SpeedReadSelection
		});

function SpeedRead(contextInfo){
	SpeedReadSelection(contextInfo);
}

function SpeedReadSelection(contextInfo){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {info: contextInfo}, function(response){
			console.log(response);
		});
	});
}

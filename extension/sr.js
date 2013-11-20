// javascript that will assist with speed reading

var parent = chrome.contextMenus.create(
		{
			"title":"Speed read now!",
    			"onclick": SpeedRead

		});

function SpeedRead(menuItemId){
	console.log(menuItemId);
}

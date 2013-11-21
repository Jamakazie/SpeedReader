console.log('h');
chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			console.log(sender.tab);
			if(true){ // I guess we should check if it's actually from it?
				console.log(request);
				alert('tr');
			}
		}
);
				

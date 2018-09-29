let changeColor = document.getElementById('changeColor');
const urlList = ["http://www.facebook.com", "http://www.google.com", "http://www.reddit.com"];

chrome.storage.sync.get('color', function(data) {
	changeColor.style.backgroundColor = data.color;
	changeColor.setAttribute('value', data.color);
})


changeColor.onclick = function(element) {
	let color = element.target.value;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.body.style.backgroundColor = "' + color + '";'}
		)
	})
	for (let index = 0; index < urlList.length; index++) {
		const element = urlList[index];
		chrome.tabs.create({"url": element});
	}
}

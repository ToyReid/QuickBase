//let openTabs = document.getElementById('openTabs');
const urlList = ["http://www.facebook.com", "http://www.google.com", "http://www.reddit.com"];

function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0) {
		return new Array(width + (/\./.test( number ) ? 2 : 1)).join('0') + number;
	}
	return number + ""; // always return a string
}

function createTabs() {
	// let color = element.target.value;
	var d = new Date();
	var n = d.getDay(); // 6
	var mins = (Math.floor(d.getMinutes() / 30)) * 30;
	var k = n.toString() + "-" + zeroFill(d.getHours(), 2) + ":" + zeroFill(mins, 2);


	// debugger;
	console.log("k = ", k);
	chrome.storage.sync.get(k, function(result) {
		for (var url in result[k]) {
			// debugger;
			console.log(url);
			chrome.tabs.create({"url": url});
		}

		// for (let index = 0; index < urlList.length; index++) {
		// 	debugger;
		// 	// const element = urlList[index];
		// 	// chrome.tabs.create({"url": element});
		// }
	})

	// console.log(typeof(n));
	// // console.log("day = ", n);
	// // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// // 	chrome.tabs.executeScript(
	// // 		tabs[0].id,
	// // 		{code: 'document.body.style.backgroundColor = "' + color + '";'}
	// // 	)
	// // })
}

document.getElementById('openTabs').addEventListener('click', createTabs);
function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0) {
		return new Array(width + (/\./.test( number ) ? 2 : 1)).join('0') + number;
	}
	return number + ""; // always return a string
}

function listCurTabs() {
	var d = new Date();
	var n = d.getDay(); // 6
	var mins = (Math.floor(d.getMinutes() / 30)) * 30;
	var k = n.toString() + "-" + zeroFill(d.getHours(), 2) + ":" + zeroFill(mins, 2);
	//var tabsToOpen = document.getElementById('tabsToOpen');

	chrome.storage.sync.get(k, function(result) {
		var p = document.createElement('p');
		p.style.marginBottom = '-10px';
		for (var url in result[k]) {
			var t = document.createTextNode(url);
			var br = document.createElement('br');
			p.appendChild(t);
			p.appendChild(br);
			//tabsToOpen.appendChild(t);
		}
		document.getElementById('tabsToOpen').appendChild(p);
	})
}

function createTabs() {
	var d = new Date();
	var n = d.getDay(); // 6
	var mins = (Math.floor(d.getMinutes() / 30)) * 30;
	var k = n.toString() + "-" + zeroFill(d.getHours(), 2) + ":" + zeroFill(mins, 2);

	console.log("k = ", k);
	chrome.storage.sync.get(k, function(result) {
		for (var url in result[k]) {
			console.log(url);
			chrome.tabs.create({"url": url});
		}
	})
}

window.addEventListener('DOMContentLoaded', listCurTabs, false);
document.getElementById('openTabs').addEventListener('click', createTabs);
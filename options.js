let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
	for (let item of kButtonColors) {
		let button = document.createElement('button');
		button.style.backgroundColor = item;
		// button.addEventListener('click', function() {
		// 	chrome.storage.sync.set({color: item}, function() {
		// 		console.log('color is ' + item);
		// 	})
		// })
		page.appendChild(button);
	}
}

function addTextBox() {
	var textbox = document.createElement('input');
	textbox.type = 'text';

	var week = document.getElementById('week');
	week.insertBefore(textbox, week[3]);
}

function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0) {
		return new Array(width + (/\./.test( number ) ? 2 : 1)).join('0') + number;
	}
	return number + ""; // always return a string
}

function timeToMin(time) {
	var min = 0;

	min += parseInt(time.substring(3, 5));
	min += 60 * parseInt(time.substring(0, 2));

	return min;
}

function addStringTime(string, min) {
	var stringMin = timeToMin(string);
	stringMin += min;
	
	return zeroFill(Math.floor(stringMin / 60), 2) + ":" + zeroFill(stringMin % 60, 2);
}

function createTime() {
	var day = document.getElementById('days').value;
	var timefrom = document.getElementById('timefrom').value;
	var timeto = document.getElementById('timeto').value;
	var jsonKeys = [];
	var processKeys;
	var week = document.getElementById('week');

	var diff = timeToMin(timeto) - timeToMin(timefrom);

	chrome.storage.sync.clear();

	for (let min = 0; min < diff; min += 30) {
		jsonKeys.push(day + "-" + addStringTime(timefrom, min));
	}

	chrome.storage.sync.get(null, function(result) {
		processKeys = result;
		
		console.log("before: ", JSON.stringify(processKeys));
	
		for (let i = 0; i < jsonKeys.length; i++) {
			//console.log("jsonKeys = ", jsonKeys[i]);
			for (let url = 3; url < week.length - 1; url++) {
				if(processKeys[jsonKeys[i]] === undefined) {
					processKeys[jsonKeys[i]] = {};
				}
				processKeys[jsonKeys[i]][week[url].value] = week[url].value;
			}
		}

		console.log("after: ", JSON.stringify(processKeys));

		chrome.storage.sync.set(processKeys);
	})
}

constructOptions(kButtonColors);
document.getElementById('addSite').addEventListener('click', addTextBox);
document.getElementById('week').onsubmit = createTime;
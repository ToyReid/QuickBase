let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
	for (let item of kButtonColors) {
		let button = document.createElement('button');
		button.style.backgroundColor = item;
		button.addEventListener('click', function() {
			chrome.storage.sync.set({color: item}, function() {
				console.log('color is ' + item);
			})
		})
		page.appendChild(button);
	}
}
/*
//https://developer.chrome.com/extensions/options
function save_options() {
	var color = document.getElementById('color').value;
	var likesColor = document.getElementById('like').checked;
	chrome.storage.sync.set({
		favoriteColor: color,
		likesColor: likesColor
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750)
	})
}

function restore_options(){
	chrome.storage.sync.get({
		favoriteColor: 'red',
		likesColor: true
	}, function(items) {
		document.getElementById('color').value = items.favoriteColor;
		document.getElementById('like').checked = items.likesColor;
	})
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
*/
constructOptions(kButtonColors);


function get(url, callbackSuccess, callbackFailure) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status != 200) {
            if (xhr.status == 200) callbackSuccess(xhr.responseText);
            else callbackFailure(xhr.statusText);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}


function getAllCandidates(callbackSuccess, callbackFailure) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) callbackSuccess(JSON.parse(xhr.responseText));
            else callbackFailure(xhr.statusText);
        }
    };
    xhr.open('GET', 'movies.json', true);
    xhr.send();
}


function getRandomCandidates(count, callbackSuccess, callbackFailure) {
    getAllCandidates(function(data) {
        var indexes = getRandomInts(data.movies.length - 1, count);
        var randomSample = [];
        for(var i = 0; i < indexes.length; i++) {
            randomSample.push(data.movies[indexes[i]]);
        }
        
        callbackSuccess(randomSample);
    }, callbackFailure);
}


function getRandomInts(max, count) {
    var ints = [];
    while (ints.length < count || max <= ints.length) {
        var rnd = Math.floor(Math.random() * (max + 1));
        if (ints.indexOf(rnd) < 0) ints.push(rnd);
    }

    return ints;
}


function saveData(data) {
    var json = getAllSavedData();
    for(prop in data) {
        json[prop] = data[prop];
    }
    localStorage.mtData = JSON.stringify(json);
}


function getAllSavedData() {
    if (localStorage.mtData) {
        return JSON.parse(localStorage.mtData);
    } else {
        return {};
    }
}


function showModal(targetId) {
    var body = document.querySelector('body');
    var overlay = document.createElement('div');
    overlay.setAttribute('style', 'position: fixed; top:0; right:0; bottom:0; left:0; background-color: rgba(0,0,0,0.5); z-index: 98;');
    body.appendChild(overlay);
    var modal = document.querySelector('#' + targetId);
    modal.setAttribute('style', 'position: fixed; margin:auto; z-index: 99; display: block;');
}

function showModalText(textToDisplay) {
    var body = document.querySelector('body');
    var overlay = document.createElement('div');
    overlay.setAttribute('style', 'position: fixed; top:0; right:0; bottom:0; left:0; background-color: rgba(0,0,0,0.5); z-index: 98;');
    body.appendChild(overlay);
    var modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('style', 'position: fixed; margin:auto; z-index: 99; display: block;');
    var p1 = document.createElement('p');
    p1.appendChild(document.createTextNode(textToDisplay));
    modal.appendChild(p1);
    var p2 = document.createElement('p');
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('OK'));
    btn.addEventListener('click', function() { window.location = 'index.html' });
    p2.appendChild(btn);
    modal.appendChild(p2);
    body.appendChild(modal);
}

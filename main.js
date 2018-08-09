var game;
var workers = ['farmers','miners'];
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
}
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
}
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function load() {
    var data = JSON.parse(localStorage.getItem("key"));
    if (!data) {
      game = {
      metallonite : 0,
      food : 200,
      workers : [0,0],
	  workersMax : [3,3]
      };
    }else game = data;
    openTab(event, 'Metallonite');
    initialize();
}

function initialize(){
  document.getElementById('farmers').innerHTML = game.workers[0];
  document.getElementById('metallonite').innerHTML = game.metallonite;
}

function save(){
  try {
      localStorage.setItem("key",JSON.stringify(game));
  } catch (e) {
    alert("To be able to save your game, please use a modern browser");
  }
}

function deleteSave() {
    localStorage.removeItem("key");
}

function metalloniteClick(){
    game.metallonite++;
    initialize();
};

function Hire(number){
    var workerCost = Math.floor(10 * Math.pow(1.1,game.workers[number]));
    if(game.metallonite >= workerCost && game.workersMax[number] > game.workers[number]){               
        game.workers[number]++;                          
    	game.metallonite = game.metallonite - workerCost;
    };  
	initialize();    
};

window.setInterval(function(){
}, 1000);
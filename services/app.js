var world;
var pacman;
var ghost;
var ghost_2;
var ghost_3;
var ghost_4;
var myMusic;
var ghosts;
var UP = 87;
var DOWN = 83;
var LEFT = 65;
var RIGHT = 68;
var UP_name = 'w';
var DOWN_name = 's';
var LEFT_name = 'a';
var RIGHT_name = 'd';
var game_time;
var food_num;
var user_online;
var ghosts_number;
var flag = 1;
var game_begin = false;
var lives = 5;
var coins_locs = [];
var pacman_locs = [];
var ghosts_interval = [];
var checkend_interval = [];
var time_interval;

//SCORE
var score = 0 ;
resetGame();


//DISPLAY WORLD
function displayWorld(){
  var output = '';
  for(var i=0; i<world.length; i++){
      output += "\n<div class='row'>\n"
      for(var j=0; j<world[i].length; j++){
//            BRICKS
          if(world[i][j] == 0)
              output += "<div class='brick'></div>";
          else if(world[i][j] == 1)
              output += "<div class='brick lefttop'></div>";
          else if(world[i][j] == 2)
              output += "<div class='brick righttop'></div>";
          else if(world[i][j] == 3)
              output += "<div class='brick rightbottom'></div>";
          else if(world[i][j] == 4)
              output += "<div class='brick leftbottom'></div>";
          else if(world[i][j] == 5)
              output += "<div class='brick top'></div>";
          else if(world[i][j] == 6)
              output += "<div class='brick right'></div>";
          else if(world[i][j] == 7)
              output += "<div class='brick bottom'></div>";
          else if(world[i][j] == 8)
              output += "<div class='brick left'></div>";
//            DYNAMIC CONTENT
          else if(world[i][j] == 9)
              output += "<div class='empty'></div>"; 
          else if(world[i][j] == 10) 
              output += "<div class='coin'></div>";
          else if(world[i][j] == 11)
              output += "<div class='cherries'></div>";
      }
      output += "\n</div>"
  }
  $('#world').html(output);
}

//DISPLAY PACMAN
function displayPacman(){
  document.getElementById('pacman').style.left = pacman.x*30+"px";
  document.getElementById('pacman').style.top = pacman.y*30+"px";
}

//DISPLAY GHOST
function displayGhost(ghost){
  document.getElementById(ghost[0]).style.left = ghost[1].x*30+"px";
  document.getElementById(ghost[0]).style.top = ghost[1].y*30+"px";
}

//DISPLAY SCORE
function displayScore(){
  document.getElementById('score').innerHTML = score;
}

//PACMAN MOVEMENT
document.onkeydown = function(e){
  if(game_begin) {
  //LEFT
    if((e.keyCode == LEFT) && (world[pacman.y][pacman.x-1]==9 || world[pacman.y][pacman.x-1]==10 || world[pacman.y][pacman.x-1]==11)){
        $('#pacman').removeClass('right');
        $('#pacman').removeClass('up');
        $('#pacman').removeClass('down');
        $('#pacman').addClass('left');
        pacman.x --;
    }
  //RIGHT
    else if((e.keyCode == RIGHT) && (world[pacman.y][pacman.x+1]==9 || world[pacman.y][pacman.x+1]==10 || world[pacman.y][pacman.x+1]==11)){
        $('#pacman').removeClass('left');
        $('#pacman').removeClass('up');
        $('#pacman').removeClass('down');
        $('#pacman').addClass('right');
        pacman.x ++;
    }
  //UP
    else if((e.keyCode == UP) && (world[pacman.y-1][pacman.x]==9 || world[pacman.y-1][pacman.x]==10 || world[pacman.y-1][pacman.x]==11)){
        $('#pacman').removeClass('right');
        $('#pacman').removeClass('up');
        $('#pacman').removeClass('left');
        $('#pacman').addClass('down');
        pacman.y --;
    }
  //DOWN
    else if((e.keyCode == DOWN) && (world[pacman.y+1][pacman.x]==9 || world[pacman.y+1][pacman.x]==10 || world[pacman.y+1][pacman.x]==11)){
        $('#pacman').removeClass('right');
        $('#pacman').removeClass('left');
        $('#pacman').removeClass('down');
        $('#pacman').addClass('up');
        pacman.y ++;
    }    
  //PACMAN SCORING COINS
    if(world[pacman.y][pacman.x] == 10){
        world[pacman.y][pacman.x] = 9;
        score+=5;
        coin_counter--;
        displayWorld();
        displayScore();
    }
  //PACMAN SCORING CHERRIES
    if(world[pacman.y][pacman.x] == 11){
        world[pacman.y][pacman.x] = 9;
        score+=20;
        displayWorld();
        displayScore();
    }
    displayPacman()
    //checkend()
  } 
}


//GHOST MOVEMENT
function getRandom() {
  var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  return random;
}

var currentDirection = 1;

function ghostMove(ghost){
  var newDirection = getRandom();
  
//Left Right New Direction
  if(
      //If it's going right or left and up or down is available
      ((currentDirection == 1 || currentDirection == 2) && (world[ghost[1].y+1][ghost[1].x]==9 || world[ghost[1].y+1][ghost[1].x]==10 || world[ghost[1].y+1][ghost[1].x]==11 || world[ghost[1].y+1][ghost[1].x]==12 || world[ghost[1].y-1][ghost[1].x]==9 || world[ghost[1].y-1][ghost[1].x]==10 || world[ghost[1].y-1][ghost[1].x]==11 || world[ghost[1].y-1][ghost[1].x]==12))
      ||
      //Or if it's going up or down and left or right is available
      ((currentDirection == 3 || currentDirection == 4) && (world[ghost[1].y][ghost[1].x+1]==9 || world[ghost[1].y][ghost[1].x+1]==10 || world[ghost[1].y][ghost[1].x+1]==11 || world[ghost[1].y][ghost[1].x+1]==12 || world[ghost[1].y][ghost[1].x-1]==9 || world[ghost[1].y][ghost[1].x-1]==10 || world[ghost[1].y][ghost[1].x-1]==11 || world[ghost[1].y][ghost[1].x-1]==12))
  ){
      //Check to make sure it won't change direction to it's current direction
      while(newDirection == currentDirection){
          newDirection = getRandom();
      }
      //Change direction to a new direction
      currentDirection = newDirection;
  }
  
  if(currentDirection ==  1 && (world[ghost[1].y][ghost[1].x-1]==9 || world[ghost[1].y][ghost[1].x-1]==10 || world[ghost[1].y][ghost[1].x-1]==11 || world[ghost[1].y][ghost[1].x-1]==12)){
      ghost[1].x --;
//        console.log("move left")
  }else if(currentDirection == 2 && (world[ghost[1].y][ghost[1].x+1]==9 || world[ghost[1].y][ghost[1].x+1]==10 || world[ghost[1].y][ghost[1].x+1]==11 || world[ghost[1].y][ghost[1].x+1]==12)){
//        console.log("move right")
      ghost[1].x ++;
  }else if(currentDirection == 3 && (world[ghost[1].y-1][ghost[1].x]==9 || world[ghost[1].y-1][ghost[1].x]==10 || world[ghost[1].y-1][ghost[1].x]==11 || world[ghost[1].y-1][ghost[1].x]==12)){
//        console.log("move up")
      ghost[1].y --;
  }else if(currentDirection == 4 && (world[ghost[1].y+1][ghost[1].x]==9 || world[ghost[1].y+1][ghost[1].x]==10 || world[ghost[1].y+1][ghost[1].x]==11 || world[ghost[1].y+1][ghost[1].x]==12)){
//        console.log("move down")
      ghost[1].y ++;
  }
  displayGhost(ghost);   
}


//CHECK FOR GAME END
function checkend(ghost){
  if((pacman.x == ghost[1].x) && (pacman.y == ghost[1].y) && lives == 1){
      clearIntervals();
      var modal = document.getElementById("myModal5");
      modal.style.display = "block"; 
  }

  else if ((pacman.x == ghost[1].x) && (pacman.y == ghost[1].y) && lives > 0) {
    clearIntervals();
    lives--;
    document.getElementById("lives").innerHTML = "Lives Left: " + lives
    score = score - 10;
    displayScore();
    resetGameWithoutWorld();
  }
  if(coin_counter == 0)
  {
    var modal = document.getElementById("myModal4");
    modal.style.display = "block";
  }
}


$(document).ready(function(){
  localStorage.setItem('k', 'k');
})


function startGame() {
  clearInterval(time_interval);
  game_begin = true;
  lives = 5;
  resetGame();
  displayWorld();
  displayPacman();
  ghosts.forEach(element => {
      displayGhost(element);
  });
  displayScore();
  
  //myMusic = "music/OnlyMP3.to - Pacman Dubstep Remix-v2a5yMUmcp0-192k-1644089325462.mp3";
  //myMusic.play();

  //GHOST REFRESH
  setIntervals();

  document.getElementById("lives").innerHTML = "Lives Left: " + lives
  document.getElementById("user_online").innerHTML = "Current User: " + user_online
  document.getElementById("controls_up").innerHTML = "Up: " + UP_name;
  document.getElementById("controls_down").innerHTML ="Down: " + DOWN_name;
  document.getElementById("controls_left").innerHTML = "Left: " + LEFT_name;
  document.getElementById("controls_right").innerHTML ="Right: " + RIGHT_name;
  document.getElementById("food_side_settings").innerHTML = "Number Of Food: " + food_num
  document.getElementById("ghosts_side_settings").innerHTML = "Number Of Ghosts: " + ghosts_number
  document.getElementById("time_side_settings").innerHTML = "Game Time: " + game_time 

  time_interval = setInterval(timeInterval, 1000)
}


function Close(_string){
  var modal = document.getElementById(_string);
  modal.style.display = "none";
}


function check() {
    let user_input_username = document.getElementById("login_name").value;
    let user_input_password = document.getElementById("login_password").value;
		let localstorage_password = localStorage.getItem(user_input_username);

		if(localstorage_password == null) {
			alert('username not exist.');
		}
		else if(localstorage_password == user_input_password) {
      user_online = user_input_username

      //document.getElementById('tab2').type = 'radio';
      document.getElementById('play_button').style.verticalAlign = 'middle';
      
			var modal = document.getElementById("myModal3");
      modal.style.display = "block";
		}
    else {
      alert('worng password.');
    }
}

function stringContainsNumber(_string) {
  return /\d/.test(_string);
}

function register() {
  let user_input_username = document.getElementById("username").value;
  let user_input_password = document.getElementById("password").value;
  let user_input_email = document.getElementById("email").value;
  let user_input_birthDate = document.getElementById("birthdate").value;
  let localstorage_password = localStorage.getItem(user_input_username);

  if(user_input_password.length === 0 || user_input_username.length === 0 || user_input_birthDate.length === 0 || user_input_email.length === 0 )
  {
    alert('All fields must be filled');
  }
  else if(user_input_password.length < 6)
  {
    alert('password must contain at least 6 characters');
  }
  else if (stringContainsNumber(user_input_username))
  {
    alert('Your name must contain letters only');
  }

  else if(localstorage_password !== null) {
    alert('username already exist.');
  }
  else {
    localStorage.setItem(user_input_username, user_input_password);
    alert('You have registered successfully.');
    window.location.reload();
  }
}


function configuratons() { 
  game_begin = false;
  var modal = document.getElementById("myModal2");
  modal.style.display = "block";
}


function setUp(event){
  UP = event.keyCode;
  document.getElementById('up').value = event.key;
  UP_name = event.key;
};

function setDown(event){
  DOWN = event.keyCode;
  document.getElementById('down').value = event.key;
  DOWN_name = event.key;
 };


function setLeft(event){
  LEFT = event.keyCode;
  document.getElementById('left').value = event.key;
  LEFT_name = event.key;
};


function setRight(event){
  RIGHT = event.keyCode;
  document.getElementById('right').value = event.key;
  RIGHT_name = event.key;
};


function checkConfigurations(){
  let numFood = document.getElementById("food_num").value;
  let numTime = document.getElementById("time").value;
  let numGhosts = document.getElementById("num_of_ghosts").value;


  if(numFood > 90 || numFood < 50 || numFood == null) {
    alert("Number of food must be between 50-90"); 
  }

  else if(numTime < 60) {
    alert("minimun game time is 60 seconds");
  }

  else if(numGhosts < 1 || numGhosts > 4) {
    alert("Number of ghosts must be between 1-4");
  }

  else {
    food_num = numFood
    coin_counter = food_num;
    game_time = numTime
    ghosts_number = numGhosts
    setGhosts(numGhosts);
    var modal = document.getElementById("myModal2");
    modal.style.display = "none";
    startGame();
  }
};
function Random()
{
    let numGhosts = Math.floor(Math.random() * (4 - 1) ) + 1;
    food_num = Math.floor(Math.random() * (90 - 50) ) + 50
    coin_counter = food_num;
    game_time = Math.floor(Math.random() * (300 - 60) ) + 60;
    ghosts_number = numGhosts
    setGhosts(numGhosts);
    var modal = document.getElementById("myModal2");
    modal.style.display = "none";
    startGame();
};


function setGhosts(num) {
  if (num==1) {
    ghosts = [['ghost', ghost]]
  }

  else if(num==2) {
    ghosts = [['ghost', ghost], ['ghost_2', ghost_2]]
  }

  else if (num==3){
    ghosts = [['ghost', ghost], ['ghost_2', ghost_2], ['ghost_3', ghost_3]]
  }

  else if(num==4) {
    ghosts = [['ghost', ghost], ['ghost_2', ghost_2], ['ghost_3', ghost_3], ['ghost_4', ghost_4]]
  }
}


function checkUser() {
  if (user_online == null) {
    alert("Please login before playing")
  }
  else {
    document.getElementById('tab2').type = 'radio';
    Close("myModal3");
    Close("myModal4");
    Close("myModal5");
    configuratons();
  }
}


function resetGame() {
  clearIntervals();
  clearInterval(time_interval);

  //WORLD
  world = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
    [0, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0 ],
    [0, 10,1, 0, 6, 9, 8, 0, 6, 10,5, 10,8, 0, 6, 9, 8, 0, 2, 10,0 ],
    [0, 10,7, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,7, 10,0 ],
    [0, 10,9, 11,8, 0, 0, 0, 6, 9 ,0, 10,8, 0, 0, 0, 6, 11,9, 10,0 ],
    [0, 10,5, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,5, 10,0 ],
    [0, 10,4, 0, 6, 9, 8, 0, 6, 10,0, 10,8, 0, 6, 9, 8, 0, 3, 10,0 ],
    [0, 10,10,10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,10,10,0 ],
    [0, 10,1, 0, 6, 9, 8, 0, 6, 10,0, 10,8, 0, 6, 9, 8, 0, 2, 10,0 ],
    [0, 10,7, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,7, 10,0 ],
    [0, 10,9, 11,8, 0, 0, 0, 6, 10,0, 10,8, 0, 0, 0, 6, 11,9, 10,0 ],
    [0, 10,5, 10,10,10,10,10,10,10,0, 10,10,10,10,10,10,10,5, 10,0 ],
    [0, 10,4, 0, 6, 9, 8, 0, 6, 10,7, 10,8, 0, 6, 9, 8, 0, 3, 10,0 ],
    [0, 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0 ],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3 ]
  ]

  for(var i=0; i<world.length; i++){
    for(var j=0; j<world[i].length; j++){
      if(world[i][j] == 10) {
        coins_locs.push([i,j]);
      }
    }
  }

  for(var i=0; i<food_num; i++){
    let index = Math.floor(Math.random()*coins_locs.length);
    var item = coins_locs[index];
    world[item[0]][item[1]] = 12;
    coins_locs.splice(index,1);
  }

  for(var i=0; i<world.length; i++){
    for(var j=0; j<world[i].length; j++){
      if(world[i][j] == 10) {
        world[i][j] = 9;
      }

      else if(world[i][j] == 12) {
        world[i][j] = 10;
      }
    }
  }

  score = 0

  for(var i=0; i<world.length; i++){
    for(var j=0; j<world[i].length; j++){
      if (world[i][j] == 9) {
        pacman_locs.push([i,j]);
      }
    }
  }

  let index = Math.floor(Math.random()*pacman_locs.length);
  var item = pacman_locs[index];

   //PACMAN
   pacman = {
    x: item[1],
    y: item[0]
  }

  ghost = {
    x: 19,
    y: 13
  }

  ghost_2 = {
    x: 1,
    y: 13
  }

  ghost_3 = {
    x: 19,
    y: 1
  }

  ghost_4 = {
    x: 1,
    y: 1
  }

  setGhosts(ghosts_number);
}


function resetGameWithoutWorld(){
  clearIntervals();

  let index = Math.floor(Math.random()*pacman_locs.length);
  var item = pacman_locs[index];

   pacman = {
    x: item[1],
    y: item[0]
  }

  ghost = {
    x: 19,
    y: 13
  }

  ghost_2 = {
    x: 1,
    y: 13
  }

  ghost_3 = {
    x: 19,
    y: 1
  }

  ghost_4 = {
    x: 1,
    y: 1
  }
  setGhosts(ghosts_number);
  displayPacman();
  ghosts.forEach(element => {
      displayGhost(element);
  });

  setIntervals();
}


function clearIntervals (){
  for(var i=0; i<checkend_interval.length; i++){
    clearInterval(checkend_interval[i]);
  }
  checkend_interval = [];

  for(var i=0; i<ghosts_interval.length; i++){
    clearInterval(ghosts_interval[i]);
    
  }
  ghosts_interval = [];
  clearInterval(time_interval);
}


function setIntervals() {
  ghosts.forEach(element => {
    ghosts_interval.push(setInterval(ghostMove, 500, element))
  });

  //CHECKEND
  ghosts.forEach(element => {
    checkend_interval.push(setInterval(checkend, 10, element))
  });
}



function timeInterval() {
  if(game_time == 0 || coin_counter == 0) {
    if(score < 100){
      clearInterval(time_interval);
      alert("You are better than " + score + " points!");
      configuratons();
    } 
    else {
      clearInterval(time_interval);
      var modal = document.getElementById("myModal4");
      modal.style.display = "block";
    }
  }
  else {
    game_time--;
    document.getElementById("time_side_settings").innerHTML = "Game Time: " + game_time; 
  }
}










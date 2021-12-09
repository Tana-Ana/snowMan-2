class Game{
    constructor (){
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");
      this.leadeboardTitle = createElement("h2");

      this.leader1 = createElement("h2");
      this.leader2 = createElement("h2");
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }

      start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();
    
        snowMan1Sprite = createSprite(width / 2 - 50, height - 100);
        snowMan1Sprite.addImage("snowMan1", snowMan1);
        snowMan1Sprite.scale = 0.2;
    
        obstacle1g=new Group();
        obstacle2g=new Group();

      
        this.addSprites(obstacle1g, 6, obstacle1, 0.2);

        this.addSprites(obstacle2g, 18, obstacle2, 0.4);

        snowMan2Sprite = createSprite(width / 2 + 100, height - 100);
        snowMan2Sprite.addImage("snowMan2", snowMan2);
        snowMan2Sprite.scale = 0.1;

    
        snowManarr = [snowMan1Sprite, snowMan2Sprite];
      }    

      handleElements() {
        form.hide();
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 40);
    
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);
    
      }    


      play() {
        this.handleElements();
        this.handleResetButton();

       if (obstacle1g. collide(snowManarr[0])||obstacle1g.collide(snowManarr[1])){
         gameState=2
       }

       if (obstacle2g. collide(snowManarr[0])||obstacle2g.collide(snowManarr[1])){
        gameState=2
      }


        Player.getPlayersInfo();
        
        if (allPlayers !== undefined) {
          image(backgroundImg, 0, -height * 2, width, height * 2);
    
         
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;

    
    
            snowManarr[index - 1].position.x = x;
            snowManarr[index - 1].position.y = y;
    
            if (index === player.index) {
              stroke(10);
              fill("red");
              ellipse(x, y, 60, 60);
    
    
              // Changing camera position in y direction
              camera.position.y = snowManarr[index - 1].position.y;
            }
          }
    
          this.handlePlayerControls();
    
          drawSprites();
        }

        
}

addSprites(spriteGroup, numberOfSprites, spriteImage, scale ) {
  for (var i = 0; i < numberOfSprites; i++) {
    var x, y;

    
  
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);
    
    var sprite = createSprite(x, y);
    sprite.addImage("sprite", spriteImage);

    sprite.scale = scale;
    spriteGroup.add(sprite);
  }
}

handleResetButton() {
  this.resetButton.mousePressed(() => {
    database.ref("/").set({
      playerCount: 0,
      gameState: 0,
      players: {},
    });
    window.location.reload();
  });
}


showLeaderboard() {
  var leader1, leader2;
  var players = Object.values(allPlayers);
  if (
    (players[0].rank === 0 && players[1].rank === 0) ||
    players[0].rank === 1
  ) {
    // &emsp;    This tag is used for displaying four spaces.
    leader1 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;

    leader2 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;
  }

  if (players[1].rank === 1) {
    leader1 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;

    leader2 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;
  }

  this.leader1.html(leader1);
  this.leader2.html(leader2);
}


handlePlayerControls() {
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
}
}


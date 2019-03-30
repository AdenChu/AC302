var game = new Phaser.Game(800, 600, Phaser.AUTO, '',
	{preload:preload, create:create, update:update});

var score = 0;
var life = 3;

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

	game.load.image('health', 'assets/firstaid.png')
}

function create() {
	//Create the sky
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'sky');


	platforms = game.add.physicsGroup();
	platforms.enableBody = true;
	//Create the ground
	var ground = platforms.create(0, 550, 'ground');
	ground.scale.setTo(2,2);
	ground.body.immovable = true;
	//create the ledges
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true;
	// Set text style
	var style = {font: "bold 32px Arial", fill: "#fff"}
	// Positioning the score
	scorelabel = game.add.text(300,560, "Score: ", style);
	scoretext = game.add.text(420, 560, score,style);
	scorelabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
	scoretext.setShadow(3,3,'rgba(0,0,0,0.5)',2);
	
	// Positioning the lives
	lifelabel = game.add.text(10,5, "Lives: ", style);
	lifetext = game.add.text(120,5, life,style);
	lifelabel.setShadow(3,3,'rgba(0,0,0,0.5',2);
	lifetext.setShadow(3,3,'rgba(0,0,0,0.5)',2);

	// Creating the player sprite
	player = game.add.sprite(32, 400, 'dude');
	// Animating the player sprite
	player.animations.add('left',[0, 1, 2, 3],10,true);
	// The face forward is already there by default and the 10 is the FPS and the true means the loop
	player.animations.add('right',[5, 6, 7, 8],10,true);
	game.physics.arcade.enable(player);
	// Setting the power for the body bounce
	player.body.bounce.y = 0.2;
	// Setting the power for the gravity
	player.body.gravity.y = 300;
	player.body.colliderWorldBounds = true;

	// Create the enemy
	enemy1 = game.add.sprite(760,20,'baddie');
	// Animate the enemy
	enemy1.animations.add('left',[0,1],10,true);
	// There is no forwards for the enemy
	enemy1.animations.add('left',[2,3],10,true);
	game.physics.arcade.enable(enemy1);
	enemy1.body.bounce.y = 0.2;
	enemy1.body.gravity.y = 500;
	enemy1.body.colliderWorldBounds = true;

	enemy2 = game.add.sprite(10,20,'baddie');
	// Animate the enemy
	enemy2.animations.add('left',[0,1],10,true);
	// There is no forwards for the enemy
	enemy2.animations.add('left',[2,3],10,true);
	game.physics.arcade.enable(enemy2);
	enemy2.body.bounce.y = 0.2;
	enemy2.body.gravity.y = 500;
	enemy2.body.colliderWorldBounds = true;

	// Creating the Stars

	stars = game.add.physicsGroup();
	stars.enableBody = true;
	// We will create 12 stars evenly spaced and we will be making a loop because 12 is a lot of stars
	for(var i=0;i<12;i++){
		var star=stars.create(i*70,0,'star');
		star.body.gravity.y=200;
		star.body.bounce.y=0.5+ Math.random()* 0.2;
	}
	// Creating keyboard entries
	cursors = game.input.keyboard.createCursorKeys();
	//Lesson 10 Creating Health
	healths = game.add.physicsGroup();
	healths.enableBody = true;
}

function update() {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(enemy1, platforms);

	//Lesson 10
	game.physics.arcade.collide(healths, platforms);

	//  Reset players velocity
	player.body.velocity.x=0;
	// Make the player move by keys
	if(cursors.left.isDown){
		// Move left
		player.body.velocity.x=-150;
		player.animations.play('left');
	}

			else if(cursors.right.isDown){
		// Move right
		player.body.velocity.x=150;
		player.animations.play('right');
	}
	else{
		player.animations.stop();
		player.frame=4;
	}

//allow the player to jump if touching ground

	if(cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y=-300;
	}

	game.physics.arcade.overlap(player,stars,collectStar);
	game.physics.arcade.overlap(player,enemy1,loseLife);
	game.physics.arcade.overlap(player,healths, collectHealth)

//What happens at the end of the game
	moveEnemy();

	if(life<=0){
		endGame();
	}

}

//Collect star function which will increase the score by 1 and remove the star

function collectStar(player,star){
	score=score+1;

	scoretext.setText(score);

	star.kill();

//Respawning the star in a random location

	star.reset(Math.floor(Math.random()*750),0)
	if (score % 10 == 0) {
		//create health
		health = healths.create(Math.floor(Math.random()*750),0,'health');
		health.body.gravity.y= 200;
		health.body.bounce.y= 0.2;
	}
}

function collectHealth(player,health){
	life=life+1

	lifetext.setText(life);

	health.kill();
}

//define loseLife

function loseLife(player, enemy, enemy2){

	life=life-1

	lifetext.setText(life);

	enemy.kill();

	enemy.reset(10,20);
}

//Function for the movement of enemy
//These coords for 759 and 405 are x coords and they will make it so that the enemy does not fall off the platform. Velocity is the speed in which it moves.

function moveEnemy(){

	if(enemy1.x>759){
		enemy1.animations.play('left');
		enemy1.body.velocity.x=-120;
	}
	else if(enemy1.x<405){
		enemy1.animations.play('right');
		enemy1.body.velocity.x=120
	}
}
	if(enemy2.x>200){
		enemy2.animations.play('left');
		enemy2.body.velocity.x=-120;
	}
	else if(enemy2.x<21){
		enemy2.animations.play('right');
		enemy2.body.velocity.x=120
	}


//What happens when the player dies. (Scoretext the the score of the game whilst scorelabel are the words for the game)

function endgame(){
	player.kill();
	scorelabel.text="GAME OVER! \n You scored "+score;
	scoretext.visible=false;
	lifelabel.visible=false;
	lifetext.visible=false;

}

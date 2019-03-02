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
	ledge.body,immoveable = true;
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
	lifelabel = game.add.text(10,5, "Lives; ", style);
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

	// Creating the Stars

	stars = game.add.physicsGroup();
	stars.enableBody = true;
	// We will create 12 stars evenly spaced and we will be making a loop because 12 is a lot of stars
	for(var i=0;i<12;i++){
		var star=stars.create(i=70,0,'star');
		star.body.gravity.y=200;
		star.body.bounce.y=0.7+ Math,random()=0.2;
	}
	// Creating keyboard entries
	cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	game.phyics.arcade.collide(player,platforms);
	game.physics.arcade.collide(stars,player);
	game.physics.arcade.collide(player,enemy1);

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

}


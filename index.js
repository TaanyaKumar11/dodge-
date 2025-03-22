//Create variable to be used 
var player
var playerImage
var enemy
var enemyImage
var isGameOver
var backgroundImage


function preload() {
    //this just loads all of the images to be used for characters, background and wtv
    playerImage = loadImage('https://cloud-fcmrsan58-hack-club-bot.vercel.app/0N5uCbDu.png')
    enemyImage = loadImage('https://cloud-4lajub4te-hack-club-bot.vercel.app/0OdL0XPt.png')
    backgroundImage = loadImage('https://cloud-dptjloh1q-hack-club-bot.vercel.app/0aKQOg3G.png')

  }

function setup() {
    //this variable allows you to change the screen based on if the game is running or over based on true or false
    isGameOver = false

    // this creates the canvas and sets its size 
    // was --> createCanvas(250, 250); 
    // we change it because the image size is 256x256
    createCanvas(256, 256); 

    //this creates the sprite, player, and assigns the size 
    // 
    player = createSprite(width / 2, height - (playerImage.height/2), 0, 0)
    player.addImage(playerImage)
    enemy = createSprite(width / 2, 0, 0, 0)
    enemy.addImage(enemyImage)
    enemy.rotationSpeed = 4.0

}

function draw() {
    //this sets the background to be an image or a color 
    //originally background(0, 0, 100) --> to be navy blue 
    //changed to be image 
    background(backgroundImage);

    //this sets the condition for when the game is playing 
    //earlier we made a variable isGameOver to determine whether or not the game is over 
    //we set this variable as false because when the game starts, it is not over lol 
    //because the draw function keeps repeating this loops checks over and over if isGameOver is true or false
    //if the game is over, it repeatedly runs the gameOver() function 
    // if the game is ongoing, it repeatedly runs the actual game
    if (isGameOver) {
        gameOver()
    } else {

        //this checks if the enemy sprite is touching the player sprite  
        //if it is, it makes the game end 
        if (enemy.overlap(player)) {
            isGameOver = true
        }

        //this creates an action 
        //if the user presses their right arrow and the player is not off of the canvas (on the right side), it will move right
        //when checking position, js automatically looks at the center of the sprite 
        //we subtracted the image width so that half of the sprite won't go off the screen 
        if (keyDown(RIGHT_ARROW) && player.position.x < width - playerImage.width / 2) {
            player.position.x += 2
        }
          
        if (keyDown(LEFT_ARROW) && player.position.x > playerImage.width / 2) {
            player.position.x -= 2
        }

        //this moves the enemy down 
        //the draw function is continously repeating 
        //essentially, it is repeatedly moving downwards 
        enemy.position.y = enemy.position.y + 3

        //this checks if the enemy has gone off of the screen 
        //if it has it brings it back to the top of the screen 
        //it does this by changing the position to the top for x and and random place (that is not off of the screen) for y
        if (enemy.position.y > height) {
            enemy.position.y = 0
            //the parenthesis for random sets the range --> (5 from the left of the screen, 5 from the right of the screen )
            enemy.position.x = random(5, width - 5) 
          }

        //we made ths sprites in the beginning, but this makes them appear on the screen 
        drawSprites()
    }
}

//this creates the function for what to do if the game ends 
//it is called if isGameOver returns true 
function gameOver() {
    background(0)
    textAlign(CENTER)
    fill('white')
    text('Game Over!', width / 2, height / 2)
    text('Click anywhere to try again', width / 2, (3 * height) / 4)

}

//this function allows you to retry the game 
//to begin it checks if the game is over, because if you dont do that, it will restart even if you click while the game is running 
//then we change isGameOver to false, because game is no longer over 
//then we reset the positions of the player and enemy sprites so they dont touch 
//if we didnt do this, even though the game would restart, it would start with the sprites touching 
//the draw function would see this and immediately end the game 
function mouseClicked() {
    if (isGameOver) {
      isGameOver = false
      //the player goes to the middle of the screen for x 
      player.position.x = width / 2
      //and the bottom minus half of the size of the sprite --> so it's not halfway off the screen 
      player.position.y = height - (playerImage.height/2)

      //the enemy goes to the middle of the screen for x 
      enemy.position.x = width / 2
      //and to the top of the screen for y 
      enemy.position.y = 0
    }
  }
  
//and thats it! 
/**
 * The snake grows when it eats fruit, and the game ends if the snake hits the walls or itself.
 */
/**
 * This game allows the player to control a snake using the directional arrows.
 */
/**
 * Snake Game in MakeCode Arcade
 */
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    // Prevent moving backwards
    if (direction != 0) {
        direction = 1
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    // Prevent moving backwards
    if (direction != 3) {
        direction = 2
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    // Prevent moving backwards
    if (direction != 2) {
        direction = 3
    }
})
function createFruit () {
    fruit = sprites.create(img`
        . . . . . . 
        . . 5 . . . 
        . . . . . . 
        . . . . . . 
        . . . . . . 
        `, 0)
    fruit.setPosition(Math.randomRange(10, 150), Math.randomRange(10, 110))
}
function moveSnake () {
    head = snake[0]
    // Create new tail segment
    tail = sprites.create(head.image, SpriteKind.Player)
    tail.setPosition(head.x, head.y)
    switch (direction) {
        case 0: tail.y += 10 // Move down
            break;
        case 1: tail.y -= 10 // Move up
            break;
        case 2: tail.x -= 10 // Move left
            break;
        case 3: tail.x += 10 // Move right
            break;
    }
// Check for collision with walls
    if (tail.x < 0 || tail.x > 160 || tail.y < 0 || tail.y > 120) {
        game.over(false, effects.dissolve)
    }
    // Check for collision with itself
    for (let i = 0; i <= snake.length - 1; i++) {
        if (tail.overlapsWith(snake[i]) && i != 0) {
            game.over(false, effects.dissolve)
        }
    }
    snake.unshift(tail)
    // Check if snake eats fruit
    if (tail.overlapsWith(fruit)) {
        score += 1
        // Create new fruit
        createFruit()
    } else {
        // Remove tail
        removed = snake.pop()
        removed.destroy()
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    // Prevent moving backwards
    if (direction != 1) {
        direction = 0
    }
})
let removed: Sprite = null
let score = 0
let tail: Sprite = null
let head: Sprite = null
let fruit: Sprite = null
let snake: Sprite[] = []
let segment: Sprite = null
let direction: number = 0
// Create initial snake
for (let j = 0; j <= 4; j++) {
    segment = sprites.create(img`
        . . 3 . . 
        . . . . . 
        . . . . . 
        . . . . . 
        . . . . . 
        `, 0)
    segment.setPosition(80 - j * 10, 60)
    snake.push(segment)
}
createFruit()
info.setScore(0)
// Countdown for 30 seconds to finish the game
info.startCountdown(30)
game.onUpdateInterval(100, function () {
    moveSnake()
})

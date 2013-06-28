/* global Crafty */
/* Based on the pong example from the Crafty website */
var maxScore = 5
Crafty.init(600 ,300)
Crafty.background('rgb(127,127,127)')
Crafty.scene('menu' ,function () {
  var startButton = Crafty.e('StartButton ,2D ,DOM ,Text ,Mouse')
                    .attr({ x: 200 ,y: 150 ,w: 100 ,h: 20 })
                    .text('Start game')
                    .bind('Click' ,function () {
                      Crafty.scene('pong')
                    })
})

Crafty.scene('pong' ,function () {
  var points = 0
  var leftPaddle = Crafty.e('LeftPaddle ,2D ,DOM ,Color ,Multiway')
                   .color('rgb(255,0,0)')
                   .attr({ x: 20 ,y: 100 ,w: 10 ,h: 100 })
                   .multiway(4 ,{ W: -90 ,S: 90 })
  var rightPaddle = Crafty.e('RightPaddle ,2D ,DOM ,Color ,Multiway')
                    .color('rgb(0,255,0)')
                    .attr({ x: 580 ,y: 100 ,w: 10 ,h: 100 })
                    .multiway(4 ,{ UP_ARROW: -90 ,DOWN_ARROW: 90 })

  var ball = Crafty.e('2D ,DOM ,Color ,Collision')
             .color('rgb(0,0,255)')
             .attr( { x: 300 ,y: 150 ,w: 10 ,h: 10
                    ,dX: Crafty.math.randomInt(2 ,5)
                    ,dY: Crafty.math.randomInt(2 ,5)
                    })
             .bind('EnterFrame' ,function () {
               //hit floor or roof
               if (this.y <= 0 || this.y >= 290) {
                 this.dY *= -1
               }
               function resetBall (ball) {
                 ball.x = 300
                 ball.y = 150
                 ball.dX = (Crafty.math.randomInt(0 ,1) == 0 ? -1 : 1)
                         * Crafty.math.randomInt(points+1 ,points+5)
                 ball.dY = Crafty.math.randomInt(points+1 ,points+5)
               }
               if (this.x > 600) {
                 points++
                 resetBall(this)
                 leftPoints.each(function () {
                   this.text(++this.points + ' Points')
                   if (this.points > maxScore) Crafty.scene('gameover')
                 })
               }
               if (this.x < 10) {
                 points++
                 resetBall(this)
                 rightPoints.each(function () {
                   this.text(++this.points + ' Points')
                   if (this.points > maxScore) Crafty.scene('gameover')
                 })
               }

               this.x += this.dX
               this.y += this.dY
             })
             .onHit('LeftPaddle' ,function () {
               if (this.dX < 0) this.dX *= -1
             })
             .onHit('RightPaddle' ,function () {
               if (this.dX > 0) this.dX *= -1
             })

  var leftPoints = Crafty.e('LeftPoints ,DOM ,2D ,Text')
                   .attr({ x: 20 ,y: 20 ,w: 100 ,h: 20 ,points: 0 })
                   .text('0 Points')
  var rightPoints = Crafty.e('RightPoints ,DOM ,2D ,Text')
                    .attr({ x: 515 ,y: 20 ,w: 100 ,h: 20 ,points: 0 })
                    .text('0 Points')
})

Crafty.scene('gameover' ,function () {
  Crafty.e('DOM ,2D ,Text')
  .attr({ x: 200 ,y: 150 ,w: 100 ,h: 20 ,time: 600})
  .text('Game over')
  .bind('EnterFrame' ,function () {
    this.time--
    if (this.time <= 0) Crafty.scene('menu')
  })
})

Crafty.scene('menu')

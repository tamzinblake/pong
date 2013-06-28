/* global Crafty */
/* Based on the pong example from the Crafty website */
Crafty.init(600 ,300)
Crafty.background('rgb(127,127,127)')

var leftPaddle = Crafty.e("Paddle ,2D ,DOM ,Color ,Multiway")
                 .color('rgb(255,0,0)')
                 .attr({ x: 20 ,y: 100 ,w: 10 ,h: 100 })
                 .multiway(4 ,{ W: -90 ,S: 90 })
var rightPaddle = Crafty.e("Paddle ,2D ,DOM ,Color ,Multiway")
                  .color('rgb(0,255,0)')
                  .attr({ x: 580 ,y: 100 ,w: 10 ,h: 100 })
                  .multiway(4 ,{ UP_ARROW: -90 ,DOWN_ARROW: 90 })

var ball = Crafty.e("2D ,DOM ,Color ,Collision")
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
                       * Crafty.math.randomInt(2 ,5)
               ball.dY = Crafty.math.randomInt(2 ,5)
             }
             if (this.x > 600) {
               resetBall(this)
               leftPoints.each(function () {
                 this.text(++this.points + " Points")
               })
             }
             if (this.x < 10) {
               resetBall(this)
               rightPoints.each(function () {
                 this.text(++this.points + " Points")
               })
             }

             this.x += this.dX
             this.y += this.dY
           })
           .onHit('Paddle' ,function () {
             this.dX *= -1
           })

var leftPoints = Crafty.e("LeftPoints ,DOM ,2D ,Text")
                 .attr({ x: 20 ,y: 20 ,w: 100 ,h: 20 ,points: 0 })
                 .text("0 Points")
var rightPoints = Crafty.e("RightPoints ,DOM ,2D ,Text")
                  .attr({ x: 515 ,y: 20 ,w: 100 ,h: 20 ,points: 0 })
                  .text("0 Points")

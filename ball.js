 var balls = [];

 var Point = function(x, y) {
     this.x = x;
     this.y = y;
 };

 var Browser = function() {
     this.x = $(window).width() - 10;
     this.y = $(window).height() - 10;
 };

 var Ball = function(initPoint) {
     this.bounciness = 1;
     this.teta = 45 * (Math.PI / 180);
     this.vi = 44;
     this.vix = this.vi * Math.cos(this.teta);
     this.viy = this.vi * Math.sin(this.teta);
     this.ax = 0;
     this.ay = 9.8;
     this.invert = 1;
     this.initialPosition = new Point(initPoint.x, initPoint.y);
     this.position = new Point(0, 0);
     this.prevPosition = new Point(initPoint.x, initPoint.y);
     this.view = $("<div>").addClass("dot").css({
         left: initPoint.x,
         top: initPoint.y
     }).appendTo(".pusher");
     this.browser = new Browser();
     this.setTimer(this.bounciness);
     this.frontierGap = 5;
 };

 Ball.prototype.setTimer = function(bounciness) {
     var pTick = this.ticker;
     var tick = 0;
     var ball = this;
     this.ticker = setInterval(function() {
         tick++;
         if (tick === 100) {
             clearInterval(pTick);
         }
         console.log(tick);
         ball.move(tick / 5, bounciness);
         ball.detectCollision();
     }, 25);
 };

 Ball.prototype.updateBounciness = function() {
     this.bounciness = this.bounciness * 0.85;
 };

 Ball.prototype.render = function(x, y) {
     this.view.css({
         left: x,
         top: y
     });
 };

 Ball.prototype.move = function(t, cr) {
     this.prevPosition.x = this.position.x;
     this.prevPosition.y = this.position.y;
     this.position.x = this.initialPosition.x + ((this.vix * t) + (0.5 * this.ax * (Math.pow(t, 2))) / cr) * this.invert;
     this.position.y = this.initialPosition.y - (this.viy * t) + (0.5 * this.ay * (Math.pow(t, 2))) / cr;
     this.render(this.position.x, this.position.y);
 };

 Ball.prototype.detectCollision = function() {

     if (this.position.x > this.browser.x || this.position.x < this.frontierGap) {
         this.initialPosition.x = this.initialPosition.x + 2 * (this.position.x - this.initialPosition.x);
         this.invert *= -1;
     }

     if (this.position.y >= this.browser.y) {
         this.initialPosition.x = this.position.x;
         this.initialPosition.y = this.position.y;
         clearInterval(this.ticker);
         this.updateBounciness();
         this.setTimer(this.bounciness);
     } else if (this.bounciness < 0.1) {
         clearInterval(this.ticker);
     }
 };

 $(document).on("click", ".pusher", function(event) {
     var ball = new Ball(new Point(event.pageX, event.pageY));
     balls.push(ball);
 });

 $(document).keyup(function(event) {
     if (event.keyCode === 27) {
         $('.ui.sidebar').sidebar('toggle');
         $('.ui.checkbox').checkbox();
     }
 });
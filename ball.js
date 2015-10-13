 var balls = [];

 var Point = function(x, y) {
     this.x = x;
     this.y = y;
 };

 var Browser = function() {
     this.x = $(window).width() - 10;
     this.y = $(window).height() - 10;
 };

 var Ball = function(initPoint,velocity,angle,bounciness) {
    //defaults
     this.bounciness = 1;
     this.angle = 45;     
     this.vi = 44;
     this.setConfigurations(velocity,angle,bounciness);
     console.log("bounciness: "+this.bounciness);
     console.log("angle: "+this.angle);
     console.log("vi: "+this.vi);
     this.teta = this.angle * (Math.PI / 180);
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

 Ball.prototype.setConfigurations = function(velocity,angle,bounciness){

    if(velocity.random){
        this.velocity = Math.random() * (50 - 1) + 1;
    } else if(velocity.value !== undefined){
        this.velocity = velocity.value;
    }

    if(angle.random){
        this.angle = Math.random() * (89 - 45) + 45;
    } else if(angle.value !== undefined){
        this.angle = angle.value;
    }

    if(bounciness.random){
        this.bounciness = Math.random() * (1 - 0.1) + 0.1;
    } else if(bounciness.value !== undefined){
        this.bounciness = bounciness.value;
    }

 };

 Ball.prototype.setTimer = function(bounciness) {
     var pTick = this.ticker;
     var tick = 0;
     var ball = this;
     this.ticker = setInterval(function() {
         tick++;    
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
     var velocity = {
        value :$("#velocity input[type='text']").val(),
        random:$("#velocity input[type='checkbox']").is(":checked")
     };

     var angle = {
        value :$("#angle input[type='text']").val(),
        random:$("#angle input[type='checkbox']").is(":checked")
     };

     var bounciness = {
        value :$("#bounciness input[type='text']").val(),
        random:$("#bounciness input[type='checkbox']").is("checked")
     };

     var ball = new Ball(new Point(event.pageX, event.pageY),velocity,angle,bounciness);
     balls.push(ball);
 });

 $(document).on("click", "#mad .crazy", function(event) {
    $('.ui.sidebar').sidebar('toggle');
     var crazyTicker = setInterval(function() {        
        var ball = new Ball(new Point(event.pageX, event.pageY),velocity,angle,bounciness);
        balls.push(ball);
     }, 500);
 });

  $(document).on("click", "#mad .close", function(event) {    
    $('.ui.sidebar').sidebar('toggle');
 });

 $(document).keyup(function(event) {
     if (event.keyCode === 27) {
         $('.ui.sidebar').sidebar('toggle');
         $('.ui.checkbox').checkbox();
     }
 });
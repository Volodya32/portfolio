var level1 = {

    box1: null,
    left: null,
    right: null,
    up: null,

    box2: null,
    fone: null,
    hero: null,
    coin: null,
    hp: 0,
    x: [300, 700, 500, 100, 1100],
    y: [600, 500, 200, 150, 300],
    xC: [150, 1200, 750],
    yC: [100, 250, 450],
    preload: function () {
        game.load.image('fone', 'img/bg_grasslands.png');
        game.load.image('box1', 'img/box2.png');
        game.load.image('box2', 'img/box3.png');
        game.load.image('coin', 'img/hud_coins.png');
        game.load.image('box2', 'img/box3.png');
        game.load.image('right', 'img/arrowRight.png');
        game.load.image('left', 'img/arrowLeft.png');
        game.load.image('up', 'img/arrowUp.png');
        game.load.spritesheet('hero', 'img/greenSprite.png', 100, 100);
        game.load.image('fly', 'img/flyFly2.png');
    },
    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 1400, 800);

        this.fone = game.add.image(0, 0, 'fone');
        this.hero = game.add.sprite(500, 700, 'hero');
        game.physics.arcade.enable(this.hero);

        game.camera.follow(this.hero);
        //game.world.setBounds(0, 0, 1400, 600);

        this.hero.body.collideWorldBounds = true;
        this.hero.body.gravity.y = 300;
        //this.fly = game.add.sprite(0, 0, 'fly');
        this.fly = game.add.group();
        this.fly.enableBody = true;

        for (var i = 0; i < 2; i++) {
            var c = this.fly.create(game.world.randomX, game.world.randomY, 'fly');
            c.body.velocity.setTo(200, 200);
            c.body.bounce.set(1);
            c.body.collideWorldBounds = true;
        }
        this.fone.scale.setTo(2, 3);


        this.box1 = game.add.group();
        this.box1.enableBody = true;

        for (var i = 0; i < this.x.length; i++) {
            var b = this.box1.create(this.x[i], this.y[i], 'box1');
            b.body.immovable = true;
            b.body.collideWorldBounds = true;
        }
        this.coin = game.add.group();
        this.coin.enableBody = true;

        for (var i = 0; i < this.xC.length; i++) {
            var g = this.coin.create(this.xC[i], this.yC[i], 'coin');
            g.body.immovable = true;
            g.body.collideWorldBounds = true;
        }

        this.hero.animations.add('right', [4, 5, 6], 10, true);
        this.hero.animations.add('left', [0, 1, 2, ], 10, true);

        this.left = game.add.sprite(50, 700, 'left');
        this.right = game.add.sprite(150, 700, 'right');
        this.up = game.add.sprite(350, 700, 'up');

        this.left.inputEnabled = true;
        this.right.inputEnabled = true;
        this.up.inputEnabled = true;

        this.left.events.onInputDown.add(this.isDownLeft);
        this.right.events.onInputDown.add(this.isDownRight);
        this.up.events.onInputDown.add(this.isDownUp);

        this.left.events.onInputUp.add(this.stop);
        this.right.events.onInputUp.add(this.stop);

        this.up.fixedToCamera = true;
        this.left.fixedToCamera = true;
        this.right.fixedToCamera = true;



    },
    isDownUp: function () {
        level1.hero.body.velocity.y = -300;

    },

    isDownRight: function () {
        level1.hero.body.velocity.x = 200;
        level1.hero.animations.play('right');
    },

    isDownLeft: function () {
        level1.hero.body.velocity.x = -200;
        level1.hero.animations.play('left');
    },
    stop: function () {
        level1.hero.body.velocity.setTo(0, 0);
        level1.hero.animations.stop();

        level1.hero.frame = 3;
    },

    update: function () {
        game.physics.arcade.collide(this.hero, this.fly, this.take2);
        game.physics.arcade.collide(this.hero, this.coin, this.take);
        game.physics.arcade.collide(this.hero, this.box1);
    },
    take: function (a, b) {
        b.kill();
        level1.hp++;
        if(level1.hp==3){
           alert("You win");
           }
    },
    take2: function (a, b) {
        a.kill();
        game.state.start("lev1");
    }
}

var Jouer = (function(){
    var _jeu;
    var jouer = function(jeu){
        _jeu = jeu;
        _jeu.MAX_ENNEMI = 50;
        _jeu.MAX_AMI = 50;
        _jeu.VIE = 3;
        _jeu.VITESSE = 600;
        _jeu.haut = false;
        _jeu.bas = false;
        _jeu.droite = false;
        _jeu.gauche = false;
        _jeu.sortie = false;
        _jeu.mute = true;
        //_jeu.debug_nav = true;
    }
    
    jouer.prototype = {
        create : function(){
            _jeu.physics.startSystem(Phaser.Physics.ARCADE);
            //Appliquer une gravité dans le jeu
            _jeu.physics.arcade.gravity.y = 700;
            
            _jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            //L'ajout de l'héros dans le jeu
            this.hero = _jeu.add.sprite(148,672, 'hero');
            this.hero.animations.add('attente', 
                    Phaser.Animation.generateFrameNames('idle', 0, 11, '',4),
                                     30, true);
            this.hero.animations.add('nage', 
                    Phaser.Animation.generateFrameNames('nage', 0, 42, '',4),
                                     30, true); 
            
            //L'ajout de l'eau dans le jeu.
            this.fond = _jeu.add.tileSprite(0, 0, 414, 736, 'eau');
            
            // Nombre de vie
            this.nbVie = _jeu.VIE;
            
            //L'ajout de l'image du plan des tuiles.
            this.niveau = _jeu.add.tilemap("carte");
            
            //L'image de base de chaque tuile.
            this.niveau.addTilesetImage("roche");
            
            //Calque surface
            this.couche = {
                "surface":this.niveau.createLayer("surface")
            };
            
            //C'est le milieu de l'image
            this.hero.anchor.setTo(.5,.5);
            //Physique de l'héros
            _jeu.physics.enable(this.hero);
            //L'héros ne peut pas sortir du monde
            this.hero.body.collideWorldBounds = true;
            //this.couche.surface.debug  = true;//pour voir les problèmes de collision
            
            //Ça ajoute une gravité sur l'objet ennemi.  
            this.groupeEnnemis = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
            //Avoir quatre ennemi à la fois.
            this.groupeEnnemis.createMultiple(4, "ennemi");
            //S'il sort du jeu, l'objet ennemi meurt.
            this.groupeEnnemis.setAll("outOfBoundsKill", true);
            //Ça regarde si l'objet ennemi est dans le jeu.
            this.groupeEnnemis.setAll("checkWorldBounds", true);
            // console.log(this.groupeEnnemis.children);
            this.nbEnnemis = _jeu.MAX_ENNEMI;
            //À tout les quatre seconde, aller dans la fonction lanceEnnemi.
            _jeu.time.events.add(Math.random()*Phaser.Timer.SECOND * 4, this.lanceEnnemi, this);
            //Physique de du groupe d'ennemis
            _jeu.physics.enable(this.groupeEnnemis);
            //La gravité du groupe d'ennemis est de 300
            this.groupeEnnemis.gravity = 300;
            _jeu.physics.enable(this.groupeEnnemis, Phaser.Physics.ARCADE);
            
            //Ça ajoute une gravité sur l'objet ami.
            this.groupeAmis = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
            //Avoir quatre ami à la fois.
            this.groupeAmis.createMultiple(4, "ami");
            //S'il sort du jeu, l'objet ami meurt.
            this.groupeAmis.setAll("outOfBoundsKill", true);
            //Ça regarde si l'objet ami est dans le jeu.
            this.groupeAmis.setAll("checkWorldBounds", true);
            //console.log(this.groupeAmis.children);
            this.nbAmis = _jeu.MAX_AMI;
            //À tout les cinq seconde, aller dans la fonction lanceAmi.
            _jeu.time.events.add(Math.random()*Phaser.Timer.SECOND * 5, this.lanceAmi, this);
            //Donne de la gravité au groupe d'amis
             _jeu.physics.enable(this.groupeAmis);
            //La gravité du groupe d'amis est de 300
            this.groupeAmis.gravity = 300;
            _jeu.physics.enable(this.groupeAmis, Phaser.Physics.ARCADE);
            
            //Pour faire fonctionner le bouton
            this.btnDroite = _jeu.add.button(150,600, "btnDroite", null, this);
            //Quand le bouton est presser, _jeu.droite est vrai
            this.btnDroite.events.onInputDown.add(function(){_jeu.droite=true;});
            //Quand le bouton est lâché, _jeu.droite est faux
            this.btnDroite.events.onInputUp.add(function(){_jeu.droite=false;});
            
            //Pour faire fonctionner le bouton
            this.btnGauche = _jeu.add.button(40,600, "btnGauche", null, this);
            //Quand le bouton est presser, _jeu.gauche est vrai
            this.btnGauche.events.onInputDown.add(function(){_jeu.gauche=true;});
            //Quand le bouton est lâché, _jeu.gauche est faux
            this.btnGauche.events.onInputUp.add(function(){_jeu.gauche=false;});
            
            //Pour faire fonctionner le bouton
            this.btnHaut = _jeu.add.button(96, 536, 'btnHaut', null, this);
            //Quand le bouton est presser, _jeu.haut est vrai
            this.btnHaut.events.onInputDown.add(function(){_jeu.haut=true;});
            //Quand le bouton est lâché, _jeu.haut est faux
            this.btnHaut.events.onInputUp.add(function(){_jeu.haut=false;});
            
            //Pour faire fonctionner le bouton
            this.btnBas = _jeu.add.button(96, 656, 'btnBas', null, this);
            //Quand le bouton est presser, _jeu.bas est vrai
            this.btnBas.events.onInputDown.add(function(){_jeu.bas=true;});
            //Quand le bouton est lâché, _jeu.bas est faux
            this.btnBas.events.onInputUp.add(function(){_jeu.bas=false;});
            
            //Pour faire fonctionner le bouton et aller dans la fonction volumeMoins
            this.btnSonB = _jeu.add.button(340, 20, 'btn_sonBas', this.volumeMoins, this);
            //Pour faire fonctionner le bouton et aller dans la fonction volumePlus
            this.btnSon = _jeu.add.button(340, 90, 'btn_son', this.volumePlus, this);
            //Pour faire fonctionner le bouton et aller dans la fonction volumeZero
            this.btnSonM = _jeu.add.button(340, 160, 'btn_sonMute', this.volumeZero, this);
            
            //L'ajout de son pour le jeu.
            this.sonAmbiance = _jeu.add.audio("ambiance");
            this.sonMiam = _jeu.add.audio("miam");
            this.sonOuch = _jeu.add.audio("ouch");
            
            //Le son ambiant se joue en boucle. 
            this.sonAmbiance.loopFull();
            
            this.curseur = _jeu.input.keyboard.createCursorKeys();
           
            //Les images au dessus du reste
            _jeu.world.bringToTop(this.groupeEnnemis);
            _jeu.world.bringToTop(this.hero);
            _jeu.world.bringToTop(this.groupeAmis);
            _jeu.world.bringToTop(this.btnHaut);
            _jeu.world.bringToTop(this.btnBas);
            _jeu.world.bringToTop(this.btnGauche);
            _jeu.world.bringToTop(this.btnDroite);
            
            //Le nombre d'attrape est à zero
            this.nbAttrape = 0;
            //Le texte qui se met sur le jeu.
            var style = {font:"bold 24px arial", fill:"#FFFFFF"};
            this.lblVie = _jeu.add.text(0,0,"Vies restants : ", style);
            this.txtVie = _jeu.add.text(200,0,this.nbVie, style);
            
            //Le texte qui se met sur le jeu.
            this.lblAttrape = _jeu.add.text(0,30,"Barres attrapés : ", style);
            this.txtAttrape = _jeu.add.text(200,30,this.nbAttrape, style);
            
            //Affiche le temps qui s'écoule
            this.tempsRestant = 45;
            this.lblTemps = _jeu.add.text(0, 60, "Temps restant : ", { font: "bold 24px Arial", fill: "#FFFFFF", align: "center" });
            this.txtTemps = _jeu.add.text(190,60 , this.tempsRestant, { font: "bold 24px Arial", fill: "#FFFFFF", align: "center" });
            
            //Le temps qui s'écoule en 45 seconde
            _jeu.time.events.repeat(Phaser.Timer.SECOND * 1, 45, this.afficheTemps, this);
        },
        update : function(){
            //L'imahe de l'eau bouge
            this.fond.tilePosition.y += 1;
            //Met les collision sur le calque surface
            this.niveau.setCollision([1, 4], true, this.couche.surface);
            
            //Les collisions
            _jeu.physics.arcade.collide(this.hero, this.couche.surface);
            _jeu.physics.arcade.collide(this.groupeEnnemis, this.couche.surface, this.direction, null, this);
            _jeu.physics.arcade.collide(this.hero, this.couche.surface, this.direction, null, this);
            _jeu.physics.arcade.collide(this.hero, this.groupeEnnemis, this.mordu, null, this);
            _jeu.physics.arcade.collide(this.hero, this.groupeAmis, this.surAttrape, null, this);
            _jeu.physics.arcade.collide(this.groupeAmis, this.couche.surface, this.direction, null, this);
    
            
            this.hero.body.velocity = new Phaser.Point(0,0);
            
            //Quand _jeu.droite est vrai
            if (_jeu.droite) {
                /*player.scale.x = -1;
                player.body.moveLeft(500);
                player.animations.play('walk');*/
                this.hero.body.velocity.x = _jeu.VITESSE;//Va a droite
            }
            
            //Quand _jeu.gauche est vrai
            if (_jeu.gauche) {
                this.hero.body.velocity.x = -_jeu.VITESSE;//Va a gauche
            }
            
            //Quand _jeu.haut est vrai
            if (_jeu.haut) {
                this.hero.body.velocity.y = -_jeu.VITESSE;//Va en haut
            }
            
            //Quand _jeu.bas est vrai
            if (_jeu.bas) {
                this.hero.body.velocity.y = _jeu.VITESSE;//Va en bas
            }
            
            //Quand l'héros ne bouge pas
            if(this.hero.body.velocity.y != 0||this.hero.body.velocity.x != 0){
                    //Joue l'animation de la nage
                    this.hero.animations.play("nage");
                }else{
                    //Joue l'animation de l'attente
                    this.hero.animations.play("attente");
                }
        },
        surAttrape: function(a,b){
            b.kill();//b est détruit
            this.sonMiam.play();//Joue le son miam.
            this.nbAttrape++;//Le pointage sur le nombre d'ami attrapé augmente.
            this.txtAttrape.text = this.nbAttrape;//Mettre le chiffre au texte.
        },
        lanceEnnemi : function(){
            //Prendre le premier ennemi qui meurt.
            var couteau = this.groupeEnnemis.getFirstDead();
            couteau.revive();//L'ennemi revie.
            couteau.reset();//Remettre l'ennemi à sa condition initial.
            couteau.position.setTo(Phaser.Math.random(40, 380), 10); //La position de l'ennemi est n'importe où dans l'axe des x et à 20 sur l'axe des y.
            
            this.nbEnnemis--;//Le nombre d'ennemi diminue.
            
            if(this.nbEnnemis>0){  //Si l'ennemi est plus grand que zéro.
                //Va dans la fonction lanceEnnemi quand le écoulé est entre 0.5 et cinq seconde.
                _jeu.time.events.add(Phaser.Timer.SECOND * Phaser.Math.random(.5, 5), this.lanceEnnemi, this);        
            } 
        }, 
        direction : function(objet,truc){
            //L'objet va soit à gauche ou à droite
            objet.body.x += 34 * (Math.floor(Math.random()*2) == 1 ? 1 : -1 );//https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
        },
        mordu : function(a,b){
            b.kill();//b est détruit
            this.sonOuch.play();//Joue le son de la douleur.
            this.nbVie--;//Il perd une vie
            this.txtVie.text = this.nbVie;//Mettre le chiffre au texte.
            if(this.nbVie == 0){//Si la vie est à zéro
                this.sonAmbiance.stop();//Arrêter la musique.
                _jeu.state.start("Perdant", true, false, this.nbAttrape); //Le state de perdant s'affiche et le pointage vient avec
            }
        },
        afficheTemps : function(){
            this.txtTemps.text = --this.tempsRestant;//Le temps diminue
            //Quand le temps est à zéro
            if(this.tempsRestant == 0){
                this.sonAmbiance.stop();//Arrêter la musique.
                _jeu.state.start("Gagnant", true, false, this.nbAttrape); //Le state de gagnant s'affiche et le pointage vient avec
            }
        },
        lanceAmi : function(){
            //Prendre le premier ami qui meurt.
            var barre = this.groupeAmis.getFirstDead();
            barre.revive();//L'ami revie.
            barre.reset();//Remettre l'ami à sa condition initial.
           
            barre.position.setTo(Phaser.Math.random(40, 380), 20);//La position de l'ami est n'importe où  entre 40 et 380 dans l'axe des x et à 20 sur l'axe des y.
            barre.position.setTo(Phaser.Math.random(40, 380), 20);//La position de l'ami est n'importe où  entre 40 et 380 dans l'axe des x et à 20 sur l'axe des y.
            
            this.nbAmis--;//Le nombre d'ami diminue.
            
            if(this.nbAmis>0){//Si l'ami est plus grand que zéro.
                //Va dans la fonction lanceAmi quand le écoulé est entre 0.5 et cinq seconde.
                _jeu.time.events.add(Phaser.Timer.SECOND * Phaser.Math.random(.5, 5), this.lanceAmi, this);        
            }
            
        },
        volumeMoins : function(){
            //Les sons ci-dessous sont diminuer
            this.sonAmbiance.volume -= 0.1;
            this.sonMiam.volume -= 0.1;
            this.sonMiam.volume -= 0.1;
            
            //Mettre mute à off
            this.sonAmbiance.mute = false; 
            this.sonMiam.mute = false;
            this.sonOuch.mute = false;
        },
        volumePlus : function(){
            //Les sons ci-dessous sont augmenter
            this.sonAmbiance.volume += 0.1;
            this.sonMiam.volume += 0.1;
            this.sonOuch.volume += 0.1;
            
            //Mettre mute à off
            this.sonAmbiance.mute = false; 
            this.sonMiam.mute = false;
            this.sonOuch.mute = false;
         
        },
        volumeZero : function(){
            if(this.sonAmbiance.mute == true){//Si mute est à on
                //Mettre mute à off
                this.sonAmbiance.mute = false; 
                this.sonMiam.mute = false;
                this.sonOuch.mute = false;
            }else{
                //Mettre mute à on
                this.sonAmbiance.mute = true;
                this.sonMiam.mute = true;
                this.sonOuch.mute = true;
            }
        }
        
    }
    return jouer;
})();









var Gagnant = (function(){
    var _jeu;
    var gagnant = function(jeu){
        _jeu = jeu
    }
    gagnant.prototype = {
        preload: function(){
            //Charger juste les composantes de la page gagnante.
            _jeu.load.image("bouton", "assets/btn_rejouer.png");
            _jeu.load.image("etat_gagnant", "./assets/etat_gagnant.png");
        },
        init : function(pointage){
            //Prendre le pointage du fichier jouer.
            this.pointage = pointage;
        },
        create:function(){
            this.gagnant = _jeu.add.sprite(0,0, "etat_gagnant");
        
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.5,.5);
            
            var style = {font:"bold 40px arial", fill:"#000"};
            var txtPointage = _jeu.add.text(_jeu.width/2,(_jeu.height*1/2.7), "Votre pointage", style);
            var txtPointage2 = _jeu.add.text((_jeu.width/2)-90,(_jeu.height*1/2.5), "est de "+ this.pointage + "/"+ _jeu.MAX_AMI, style);
            txtPointage.anchor = new Phaser.Point(.5,.5);
        },
        demarrerJeu : function(){
            //Afficher la page jouer.
            _jeu.state.start("Jouer");
        }
        
    }
    
    return gagnant;
})()
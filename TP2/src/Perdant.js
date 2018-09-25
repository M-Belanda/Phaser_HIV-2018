var Perdant = (function(){
    var _jeu;
    var perdant = function(jeu){
        _jeu = jeu
    }
    perdant.prototype = {
        preload: function(){
            _jeu.load.image("bouton", "assets/btn_rejouer.png");
            _jeu.load.image("etat_perdant", "assets/etat_perdant.png");
        },
        init : function(pointage){
            this.pointage = pointage;
        },
        create:function(){
            this.perdant = _jeu.add.image(0,0, "etat_perdant");
        
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.5,.5);
            
            var style = {font:"bold 40px arial", fill:"#000"};
            var txtPointage = _jeu.add.text(_jeu.width/2,(_jeu.height*1/3), "Votre pointage", style);
            var txtPointage2 = _jeu.add.text((_jeu.width/2)-90,(_jeu.height*1/2.7), "est de "+ this.pointage + "/"+ _jeu.MAX_AMI, style);
            txtPointage.anchor = new Phaser.Point(.5,.5);
        },
        demarrerJeu : function(){
            _jeu.state.start("Jouer");
        }
        
    }
    
    return perdant;
})()
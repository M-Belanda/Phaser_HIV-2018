var Menu = (function(){
    var _jeu;
    var menu = function(jeu){
        _jeu = jeu
    }
    menu.prototype = {
        create:function(){
            var style = {font:"bold 48px arial", fill:"#000"};
            var txtTitre = _jeu.add.text(_jeu.width/2,(_jeu.height*1/5), "Nager sa vie",style);
            txtTitre.anchor = new Phaser.Point(.5,.5);
            
            var style = {font:"bold 30px arial", fill:"#000"};
            var txtInstruction = _jeu.add.text(_jeu.width/2,(_jeu.height*1/3.5), "Les flèches sont ",style);
            txtInstruction.anchor = new Phaser.Point(.5,.5);
            var txtInstruction2 = _jeu.add.text(_jeu.width/2,(_jeu.height*1/3), "pour le déplacement",style);
            txtInstruction2.anchor = new Phaser.Point(.5,.5);
            var txtInstruction3 = _jeu.add.text(_jeu.width/2,(_jeu.height*1/2.6), " dans l'eau.",style);
            txtInstruction3.anchor = new Phaser.Point(.5,.5);
            
            var txtInstruction4 = _jeu.add.text(_jeu.width/2,(_jeu.height*1/2.4), "Éviter les crocodiles",style);
            txtInstruction4.anchor = new Phaser.Point(.5,.5);
            var txtInstruction5 = _jeu.add.text(_jeu.width/2,(_jeu.height*1/2.2), "et prendre les barres.",style);
            txtInstruction5.anchor = new Phaser.Point(.5,.5);
            
            if(!_jeu.ecranDemarrage.parent){
                _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "ecran_demarrage");
            }
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.5,.5);
           
            //_jeu.state.start("Jouer");  // Démarre le jeu directement - deboggage
        },
        demarrerJeu : function(){
            _jeu.state.start("Jouer");
        }
        
    }
    
    return menu;
})()

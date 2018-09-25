var Demarrage = (function(){
    var _jeu;
    var demarrage = function(jeu){
        _jeu = jeu;
    }
    demarrage.prototype = {
        preload : function(){
            _jeu.load.image("ecran_demarrage", "./assets/etat_menu.png");
            _jeu.load.image("barre_chargement", "./assets/chargement.png");
            _jeu.stage.backgroundColor = "#000000";
            
        },
        create: function(){
            
            _jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            _jeu.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            if(!_jeu.device.desktop){
                _jeu.scale.forceOrientation(false,true);   // Forcer le mode Portrait...
                _jeu.scale.enterIncorrectOrientation.add(this.mauvaiseOrientation, this);
                _jeu.scale.leaveIncorrectOrientation.add(this.bonneOrientation, this);
            }
            
            
            _jeu.state.start("Chargement", false);
        },
        mauvaiseOrientation : function(){
            console.log("mauvaise orientation");
            document.querySelector(".msgRotation").classList.remove("cacher");
            document.querySelector("#jeu").classList.add("cacher");
            _jeu.paused = true;
        },
        bonneOrientation: function(){
            console.log("bonne orientation");
            document.querySelector(".msgRotation").classList.add("cacher");
            document.querySelector("#jeu").classList.remove("cacher");
            _jeu.paused = false;
            if(!_jeu.device.desktop){
                _jeu.scale.refresh();
            }
        }
        
    }
    return demarrage;
})();









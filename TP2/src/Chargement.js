// Source : https://gist.github.com/jdnichollsc/f4f4af1cc6aa697bb274

var Chargement = (function(){
    var _jeu;
    var chargement = function(jeu){
        _jeu = jeu
    }
    chargement.prototype = {
        preload: function(){
            //Charger l'image
            _jeu.load.image("btn_son", "assets/son.png");
            _jeu.load.image("btn_sonBas", "assets/sonBas.png");
            _jeu.load.image("btn_sonMute", "assets/sonMute.png");
            _jeu.load.image("rect", "assets/rect.png");
            _jeu.load.image("bouton", "assets/bouton.png");
            _jeu.load.image('hero', 'assets/hero.png');
            _jeu.load.atlasJSONHash('hero', 'assets/natation.png', 'assets/natation.json');
            _jeu.load.image("ami", "assets/bar.png");
            _jeu.load.image("ennemi", "assets/croc.png");
            _jeu.load.image("eau", "assets/river.jpg");
            _jeu.load.image("btnHaut", "assets/fleche.png");
            _jeu.load.image("btnGauche", "assets/fleche_gauche.png");
            _jeu.load.image("btnDroite", "assets/fleche_droite.png");
            _jeu.load.image("btnBas", "assets/fleche_bas.png");
            //Charger l'audio
            _jeu.load.audio("ambiance", "assets/musique.wav");
            _jeu.load.audio("miam", "assets/mmmh.wav");
            _jeu.load.audio("ouch", "assets/ouch.wav");
            
            _jeu.load.image("roche", "assets/roche.png");
            //Chargement du json
            _jeu.load.tilemap("carte", "assets/eau_map.json", null, Phaser.Tilemap.TILED_JSON);
           
            
            _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "ecran_demarrage");
            _jeu.barreChargement = _jeu.add.sprite (160, 240, "barre_chargement");
            this.load.setPreloadSprite(_jeu.barreChargement);
            
            
        },
        create:function(){
            _jeu.barreChargement.destroy();
            _jeu.state.start("Menu", false);
        }
    }
    
    return chargement;
})()
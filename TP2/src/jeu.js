(function(){
    "use strict";
    var jeu = new Phaser.Game(414,736, Phaser.AUTO, "jeu");
    
    jeu.state.add("Demarrage", Demarrage);
    jeu.state.add("Chargement", Chargement);
    jeu.state.add("Menu", Menu);
    jeu.state.add("Jouer", Jouer);
    jeu.state.add("Gagnant", Gagnant);
    jeu.state.add("Perdant", Perdant);
    
    
    
    jeu.state.start("Demarrage");
    
    
})()
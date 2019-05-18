function Partie() {

    // Création de la grille
    nb_lignes = prompt("Pour commencer la partie, veuillez définir la taille de la grille en indiquant un nombre entre 10 et 26.", 10);
 
    document.getElementsByTagName("header")[0].removeChild(document.getElementById("bouton"));

    
    function CreateGrid(nb_lignes){
        if(nb_lignes <10 || nb_lignes > 26) {
            alert("Veuillez entrer un nombre entre 10 et 26");
        }
        else{
            main = document.getElementById('main');
            div = document.createElement('div');
            div.id = "grille_de_jeu";
            main.appendChild(div);
            table = document.createElement("table");
            div.appendChild(table);
            var tableau = new Array();
            for (i = 0; i <= nb_lignes; i++){
                let trHead = document.createElement('tr');
                table.appendChild(trHead);
                trHead.id = 'trHead'+[i];
                let text_trHead = document.createTextNode([i]);
                trHead1 = document.getElementById("trHead"+[i]);
                trHead1.appendChild(text_trHead);
            }
            for (j = 1; j <= nb_lignes; j++){
                let th = document.createElement('th');
                trHead0= document.getElementById("trHead0");
                trHead0.appendChild(th);
                th.id = 'th'+[j];
                a = String.fromCharCode(j+64);
                let text_th = document.createTextNode(a);
                th1 = document.getElementById("th"+[j]);
                th1.appendChild(text_th);
            }
            for (l = 1; l <= nb_lignes; l++){
                a = String.fromCharCode(l+64);
                for (k = 1; k <= nb_lignes; k++){
                    let td = document.createElement('td');
                    td.id = a+k;
                    trHead = document.getElementById("trHead"+[k])
                    trHead.appendChild(td);
                    var zero = document.createTextNode(0);
                    td.appendChild(zero);
                }
            }
        }
    }
    CreateGrid(nb_lignes);

    // Création du constructeur de l'objet bateaux

    function Bateau(type) {
        this.type = type;
       
        // détermination du type de bateau
        if(type =="porte-avions"){
            taille =5;
            identifiant ='A';
            touche = 0;
        }
        else if(type == "croiseur"){
            taille=4;
            identifiant='B';
            touche = 0;
        }
        else if(type == "contre-torpilleur"){
            taille  = 3;
            identifiant = 'C';
            touche = 0;
        }
        else if(type == "sous-marin"){
            taille = 3;
            identifiant = 'D';
            touche = 0;
        }
        else if(type == 'torpilleur'){
            taille = 2;
            identifiant = 'E';
            touche = 0;
        }

        this.taille = taille;
        this.identifiant = identifiant;
        this.touche = touche;

        // détermination de l'orientation du bateau
        var orientationAleatoire = Math.floor(Math.random()*2);
        if (orientationAleatoire ==0){
            var orientation = 'H';
        }
        else{
            var orientation = 'V';
        }

        this.orientation = orientation;

        // détermination du point de départ de l'implantation du bateau
        
        function DeterminationPointDepart(nb_lignes){
            ligne = Math.floor(Math.random() * nb_lignes) + 1; // ligne precedemment ligneHasard
            chiffreColonneHasard = Math.floor(Math.random() * nb_lignes) + 1;
            colonne = String.fromCharCode(64 + parseInt(chiffreColonneHasard)); //colonne precedemment lettre
            pointDepartTest = colonne+ligne;
            verifCellule = 0;
        
            if(orientation =='H'){
                if(chiffreColonneHasard < taille){
                    for(i=0; i< taille; i ++){
                        if(document.getElementById(String.fromCharCode(64 + parseInt(chiffreColonneHasard) + parseInt(i)) + ligne).innerText != 0){
                            verifCellule++;
                        }
                    }
                    if(verifCellule == 0){
                        pointDepart = pointDepartTest;
                        return pointDepart;
                    }
                    else{
                        DeterminationPointDepart(nb_lignes);
                    }
                }
                else{
                    for(i = 0; i <taille; i ++) {
                        if(document.getElementById(String.fromCharCode(64 + parseInt(chiffreColonneHasard) - parseInt(i)) + ligne).innerText != 0){
                            verifCellule ++;
                        }
                    }
                    if (verifCellule == 0) {
                        pointDepart = pointDepartTest;
                        return pointDepart;
                    }
                    else{
                        DeterminationPointDepart(nb_lignes);
                    }
                }
            }
            else{
                if(ligne < taille){
                    for(i =0; i < taille; i ++){
          
                        if(document.getElementById(colonne + (parseInt(ligne) + parseInt(i))).innerText != 0){
                            verifCellule ++;
                        }
                    }
                    if(verifCellule == 0){
                        pointDepart = pointDepartTest;
                        return pointDepart;
                    }
                    else{
                        DeterminationPointDepart(nb_lignes);
                    }
                }
                else{
                    for(i = 0; i < taille; i ++) {
                   
                        if(document.getElementById(colonne + (parseInt(ligne) - parseInt(i))).innerText != 0){
                            verifCellule ++;
                        }
                    }
                    if (verifCellule == 0) {
                        pointDepart = pointDepartTest;
                        return pointDepart;
                    }
                    else{
                        DeterminationPointDepart(nb_lignes);
                    }
                }

            }
        }

        DeterminationPointDepart(nb_lignes);
        this.pointDepart = pointDepart;
        
        function implantation(nb_lignes){
            if(orientation == 'H'){
                if(chiffreColonneHasard < taille){
                    for(i=0; i < taille; i++){
                        document.getElementById(String.fromCharCode(64 + parseInt(chiffreColonneHasard) + parseInt(i)) + ligne).innerHTML = identifiant;
                    }
                }
                else{
                    for(i = 0; i < taille; i ++){
                        document.getElementById(String.fromCharCode(64 + parseInt(chiffreColonneHasard) - parseInt(i)) + ligne).innerHTML = identifiant;
                    }
                }
            }
            else{
                if(ligne < taille){
                    for(i = 0; i < taille; i++){
                        document.getElementById(colonne + (parseInt(ligne) + parseInt(i))).innerHTML = identifiant;
                    }
                }
                else{
                    for(i = 0; i < taille; i ++){
                        document.getElementById(colonne + (parseInt(ligne) - parseInt(i))).innerHTML = identifiant;
                    }
                }
            }

        }
        implantation();
    }
        

    var porte_avions = new Bateau ("porte-avions");
    var croiseur = new Bateau ('croiseur');
    var contre_torpilleur = new Bateau ("contre-torpilleur");
    var sous_marin = new Bateau ("sous-marin");
    var torpilleur = new Bateau ('torpilleur');
    var compteur_total = 0;
    var compteur_coups=0;
   

     b = 64;
     var cellule = 0;
        for(i = 1; i <= nb_lignes; i++) {
            b++
            for (j = 1; j <= nb_lignes; j ++) {
                a = String.fromCharCode(b);
                cellule = (document.getElementById(a + j));
                //console.log(cellule);
                cellule.addEventListener("click", touche_coule);
            }
        }

    function touche_coule() {
        if (this.innerText == "0"){
            this.id = 'plouf';
            compteur_coups++;
            this.innerHTML = "<img src = './images/splash.png' alt='eclaboussures'/>";
        }
        else if (this.innerText == "A"){
            this.id = "touché";
            porte_avions.touche ++ ;
            compteur_coups++;
            this.innerHTML = "<img src = './images/explosion.png' alt='explosion'/>";
            document.getElementById("porte_avions").innerHTML = '<h3>Porte-avions '+porte_avions.touche+'/'+porte_avions.taille+'</h3><img src="./images/porte_avions_'+porte_avions.touche+'.png" alt="Porte-avions"/>';
            if(porte_avions.touche < porte_avions.taille) {
                compteur_total ++;
            }
            else {
                alert("Porte-avions touché et coulé !");
                compteur_total ++;
            }
        }
        else if (this.innerText == "B"){
            this.id = "touché";
            croiseur.touche ++ ;
            compteur_coups++;
            this.innerHTML = "<img src = './images/explosion.png' alt='explosion'/>";
            document.getElementById("croiseur").innerHTML = '<h3>Croiseur '+croiseur.touche+'/'+croiseur.taille+'</h3><img src="./images/croiseur_'+croiseur.touche+'.png" alt="Porte-avions"/>';
            if(croiseur.touche < croiseur.taille) {
                compteur_total ++;
            }
            else {
                alert("Croiseur touché et coulé !");
                compteur_total ++;
            }
        }
        else if (this.innerText == "C"){
            this.id = "touché";
            compteur_coups++;
            contre_torpilleur.touche ++ ;
            this.innerHTML = "<img src = './images/explosion.png' alt='explosion'/>";
            document.getElementById("contre_torpilleur").innerHTML = '<h3>Contre-torpilleur '+contre_torpilleur.touche+'/'+contre_torpilleur.taille+'</h3><img src="./images/Contre_torpilleur_'+contre_torpilleur.touche+'.png" alt="Contre-torpilleur"/>';
            if(contre_torpilleur.touche < contre_torpilleur.taille) {
                compteur_total ++;
            }
            else {
                alert("Contre-torpilleur touché et coulé !");
                compteur_total ++;
            }
        }
        else if (this.innerText == "D"){
            this.id = "touché";
            compteur_coups++;
            sous_marin.touche ++ ;
            this.innerHTML = "<img src = './images/explosion.png' alt='explosion'/>";
            document.getElementById("sous_marin").innerHTML = '<h3>Sous-marin '+sous_marin.touche+'/'+sous_marin.taille+'</h3><img src="./images/sous_marin_'+sous_marin.touche+'.png" alt="Sous-marin"/>';
            if(sous_marin.touche < sous_marin.taille) {
                compteur_total ++;
            }
            else {
                alert("Sous-marin touché et coulé !");
                compteur_total ++;
            }
        }
        else if (this.innerText == "E"){
            this.id = "touché";
            compteur_coups++;
            torpilleur.touche ++ ;
            this.innerHTML = "<img src = './images/explosion.png' alt='explosion'/>";
            document.getElementById("torpilleur").innerHTML = '<h3>Torpilleur '+torpilleur.touche+'/'+torpilleur.taille+'</h3><img src="./images/torpilleur_'+torpilleur.touche+'.png" alt="Torpilleur"/>';
            if(torpilleur.touche < torpilleur.taille) {
                compteur_total ++;
            }
            else {
                alert("Torpilleur touché et coulé !");
                compteur_total ++;
            }
        }
        document.getElementById("compteur").innerHTML = '<p>Nombre de coups joués : '+compteur_coups+'</p>';
        if (compteur_total == 17) {
            alert("Toute la flotte adverse a été envoyée par le fond ! \nVous avez terminé la partie en "+compteur_coups+" coups.");
            javascript:history.go(0);
        } 
    }
}
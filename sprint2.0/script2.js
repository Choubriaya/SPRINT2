const makeupProducts = [
  { id: "m1", name: "Fond de Teint Mat", shade: "Beige Clair", price: 25.00, image: "foundation1.jpg" },
  { id: "m2", name: "Rouge à Lèvres Velours", shade: "Rouge Intense", price: 18.50, image: "lipstick-red.jpg" },
  { id: "m3", name: "Rouge à Lèvres Velours", shade: "Nude Rosé", price: 18.50, image: "lipstick-nude.jpg" },
  { id: "m4", name: "Mascara Volume", shade: "Noir", price: 15.00, image: "mascara.jpg" },
  { id: "m5", name: "Palette Fards à Paupières", shade: "Automne", price: 35.00, image: "palette.jpg" },
  { id: "m6", name: "Blush Poudre", shade: "Pêche", price: 20.00, image: "blush.jpg" },
  { id: "m7", name: "Set de 5 Pinceaux Pro", shade: "N/A", price: 28.00, image: "brushes.jpg" },
  { id: "m8", name: "Éponge Beauty Blender", shade: "Rose", price: 8.50, image: "blender.jpg" },
  { id: "m9", name: "Trousse de Voyage", shade: "Noir", price: 16.00, image: "bag.jpg" },
  { id: "m10", name: "Recourbe-cils Précision", shade: "Métal", price: 12.00, image: "curler.jpg" }
];

let makeupCart = [
  { id: "m1", name: "Fond de Teint Mat", shade: "Beige Clair", price: 25.00, quantity: 1, image: "foundation1.jpg" },
  { id: "m2", name: "Rouge à Lèvres Velours", shade: "Rouge Intense", price: 18.50, quantity: 2, image: "lipstick-red.jpg" },
  { id: "m7", name: "Set de 5 Pinceaux Pro", shade: "N/A", price: 28.00, quantity: 1, image: "brushes.jpg" },
  { id: "m8", name: "Éponge Beauty Blender", shade: "Rose", price: 8.50, quantity: 2, image: "blender.jpg" }
];

const liste = document.getElementById("liste");
const total = document.getElementById("total");
const ajouter = document.getElementById("ajouter");
const zone = document.getElementById("zone");
const recherche = document.getElementById("recherche");
const resultats = document.getElementById("resultats");

// affichER
function afficherPanier() {
  let contenu = "";
  let montantTotal = 0;
  for (let i = 0; i < makeupCart.length; i++) {
    const produit = makeupCart[i];
    const sousTotal = produit.price * produit.quantity;

    montantTotal = montantTotal + sousTotal;

    contenu +=
      '<div class="produit">' + 
      '<div class="produit-details">' +
      '<img src="image2/' + produit.image + '.jpeg" alt="' + produit.name + '">' +
      '<div>' +
      '<strong>' + produit.name + '</strong>' +
      '<p>Teinte : ' + produit.shade + '</p>' +
      '</div>' +
      '</div>' +

      '<div class="quantite">' + produit.price + 'DH </div>' +

      '<div class="quantite">' +
      '<span>' + sousTotal + ' DH</span>' +
      '<button type="button" class="moins">-</button>' +
      '<span>' + produit.quantity + '</span>' +
      '<button type="button" class="plus">+</button>' +
      '</div>' +
      '</div>';
  }

  liste.innerHTML = contenu;
  total.textContent = montantTotal;

  const moins = liste.querySelectorAll(".moins");
  const plus = liste.querySelectorAll(".plus");

  for (let i = 0; i < makeupCart.length; i++) {

    moins[i].addEventListener("click", function () {
      modifierQuantite(makeupCart[i].id, -1);
    });

    plus[i].addEventListener("click", function () {
      modifierQuantite(makeupCart[i].id, +1);
    });

  }
}
afficherPanier()
function modifierQuantite(idProduit) {
  for (let i = 0; i < makeupCart.length; i++) {
    if (makeupCart[i].id === idProduit) {
      makeupCart[i].quantity++;

      if (makeupCart[i].quantity == 0) {
        makeupCart.splice(i, 1);
      }
      afficherPanier();
      return;
    }
  }
}


function ajouterAuPanier(idProduit) {
  let produitChoisi = null;
  for (let i = 0; i < makeupProducts.length; i++) {
    if (makeupProducts[i].id === idProduit) {
      produitChoisi = makeupProducts[i];
    }
  }
  if (produitChoisi === null) {
    return;
  }
  for (let j = 0; j < makeupCart.length; j++) {
    if (makeupCart[j].id === idProduit) {
      makeupCart[j].quantity++;
      afficherPanier()
      return;
    }
  }
  makeupCart.push({
    id: produitChoisi.id,
    name: produitChoisi.name,
    shade: produitChoisi.shade,
    price: produitChoisi.price,
    image: produitChoisi.image,
    quantity: 1

  });
  afficherPanier();
}

function afficherResultats() {
  let motRecherche = recherche.value.toLowerCase();
  let contenu = "";
  let produitsTrouves = [];

  for (let i = 0; i < makeupProducts.length; i++) {
    let produit = makeupProducts[i];
    let nomEtTeinte = (produit.name + " " + produit.shade).toLowerCase();

    if (nomEtTeinte.search(motRecherche) !== -1) {
      produitsTrouves.push(produit);
      contenu +=
        '<div class="resultat">' +
        '<div class="resultat-details">' +
        '<img src="image2/' + produit.image + '.jpeg" alt="' + produit.name + '">' +
        '<div>' +
        '<strong>' + produit.name + '</strong>' +
        '<p>Teinte : ' + produit.shade + '</p>' +
        '<p>' + produit.price + ' DH</p>' +
        '</div>' +
        '</div>' +
        '<button type="button">Ajouter</button>' +
        '</div>';
    }
  }



  if (produitsTrouves.length === 0) {
    resultats.innerHTML = "<p>Aucun produit trouvé.</p>";
    return;
  }
  resultats.innerHTML = contenu;
  let boutonsAjouter = resultats.querySelectorAll("button");
  for (let j = 0; j < boutonsAjouter.length; j++) {
    boutonsAjouter[j].addEventListener("click", function () {
      ajouterAuPanier(produitsTrouves[j].id);
    });
  }
}
ajouter.addEventListener("click", function () {
  zone.hidden = !zone.hidden;
  if (!zone.hidden) {
    afficherResultats();
    recherche.onclick();
  }
});

recherche.addEventListener("input", afficherResultats);



const boutonPayer =document.getElementById("pay");
const payment =document.querySelector(".paiement");
const checkout =document.querySelector(".panier");
boutonPayer.addEventListener("click",switchToPay);
function switchToPay() {
    if (payment) {
        checkout.style.display = "block";
         payment.style.display ="none";
    } 
    if(checkout){
          checkout.style.display = "none";
        payment.style.display ="block";
    }
}

const regexEmail =/^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
const regexCvv =/^[0-9]{3,4}$/ ;
const regexDateExprire =/^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const regexNumDcarte =/^(?:[0-9]{4}[ -]?){3}[0-9]{1,4}$|[0-9]{13,19}$/ ;

const regexPrenom = /^[A-Za-zÀ-ÿ\s'-]{2,30}$/;
const regexNom = /^[A-Za-zÀ-ÿ\s'-]{2,30}$/;


const emailInput =document.querySelector('input[name="email"]')
const cvvInput =document.querySelector('input[name="cvv]')
const expireInput = document.querySelector('input[name="date"]') ;
const carteInput = document.querySelector('input[name="carte"]') ;

const prenomInput = document.querySelector("#prénom");
const nomInput = document.querySelector("#nom");
const form = document.querySelector("#forme");


form.addEventListener("submit", function(event){
 event.preventDefault();
 let valide =true ; 
 if (!regexEmail.test(emailInput.value.trim())){
  document.querySelector("#errEmail").textContent="E-mail Invalide , réessayer !!!" ;
  emailInput.style.border ="2px solid red"

  valide =false ;
 }else{
  var mssgEm=document.querySelector("#errEmail");
  mssgEm.textContent="Champ valide";
  mssgEm.style.color="green"
  emailInput.style.border ="2px solid green";
 }

 if (!regexNumDcarte.test(carteInput.value.trim())){
  document.querySelector("#errCarte").textContent="Invalide , réessayer !!!" ;
  carteInput.style.border ="2px solid red"
  mssgEm.style.color="red"

  valide =false ;
 }else{
  var mssgEm=document.querySelector("#errCarte");
  mssgEm.textContent="Champ valide";
  mssgEm.style.color="green"
  carteInput.style.border ="2px solid green";
 }

if (!regexCvv.test(cvvInput.value.trim())){
 document.querySelector("#errCvv").textContent="Cvv Invalide , réessayer !!!" ;
 cvvInput.style.border ="2px solid red"
  valide =false ;
 }else{
 var mssgcv= document.querySelector("#errCvv")
 mssgcv.textContent="Champ valide";
 mssgcv.style.color="green"
 cvvInput.style.border ="2px solid green";
 }



if (!regexDateExprire.test(expireInput.value.trim())){
  document.querySelector("#errDate").textContent="Invalide , réessayer !!!" ;
  expireInput.style.border ="2px solid red"
  valide =false ;
 }else{
 let msgdate= document.querySelector("#errDate")
 msgdate.textContent="Champ valide";
 msgdate.style.color="green"
 expireInput.style.color="2px solid green";

 }

 if (!regexPrenom.test(prenomInput.value.trim())){
  document.querySelector("#errPrenom").textContent="Invalide , réessayer !!!" ;
  prenomInput.style.border ="2px solid red"
  valide =false ;
 }else{
 let msgp= document.querySelector("#errPrenom")
 msgp.textContent="Champ valide";
 msgp.style.color="green"
 prenomInput.style.color="2px solid green";

 }

 if (!regexNom.test(nomInput.value.trim())){
  document.querySelector("#errNom").textContent="Invalide , réessayer !!!" ;
  nomInput.style.border ="2px solid red"
  valide =false ;
 }else{
 let msgN= document.querySelector("#errNom")
 msgN.textContent="Champ valide";
 msgN.style.color="green"
 nomInput.style.color="2px solid green";
 }

})


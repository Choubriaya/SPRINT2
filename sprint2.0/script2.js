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
function modifierQuantite(idProduit, ch) {
  for (let i = 0; i < makeupCart.length; i++) {
    if (makeupCart[i].id === idProduit) {
      makeupCart[i].quantity = makeupCart[i].quantity + ch;

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
      makeupCart[j].quantity;
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
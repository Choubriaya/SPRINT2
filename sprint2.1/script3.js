const nom = document.querySelector("#nom")
const prix = document.querySelector("#prix")
const image = document.querySelector("#image")
const type = document.querySelector("#type")
const description = document.getElementById("description")
const suivant1 = document.querySelector("#suivant1")

const suivant2 = document.querySelector("#suivant2")
const stock = document.querySelector("#quantite")
const teinte = document.querySelector("#teinte")
const poids = document.querySelector("#poids")

const etape1 = document.getElementById("etape1")
const etape2 = document.getElementById("etape2")
const etape3 = document.getElementById("etape3")

const precedent1 = document.querySelector("#precedent1")
const precedent2 = document.querySelector("#precedent2")



const bulle1 = document.querySelector("#bulle1")
const bulle2 = document.querySelector("#bulle2")
const bulle3 = document.querySelector("#bulle3")

const txt1 = document.querySelector("#txt1")
const txt2 = document.querySelector("#txt2")
const txt3 = document.querySelector("#txt3")

const ligne1 = document.querySelector("#ligne1")
const ligne2 = document.querySelector("#ligne2")

const recap = document.querySelector("#recapitulatif")
const formulaire = document.querySelector("#formProduit")

const promotion = document.querySelector("#promo")
const datepromo = document.querySelector("#date")
const dateerr = document.querySelector("#date-err")

const nomRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/
const prixRegex = /^[0-9]{2,3}$/
const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
const quantStockRegex = /^(?:[1-9]\d{0,3}|10000)$/
const regexTeinte = /^[A-Za-zÀ-ÿ]+$/
const poidRegex = /^(?:[1-9]\d?|1\d{2}|2[0-4]\d|250)$/
const descrRegex = /^[a-zA-ZÀ-ÿ0-9\s,.'()\/\-:!%]{10,500}$/

let Produits = [];
const listeProduits = document.querySelector("#listeProduits")

suivant1.addEventListener("click", function (event) {
    event.preventDefault()

    let nomValide = check(nom, nomRegex)
    let prixValide = check(prix, prixRegex)
    let imageValide = check(image, urlRegex)
    let descrValide = check(description, descrRegex);

    let typeValide = false
    if (type.value === "") {
        type.nextElementSibling.textContent = "Veuiller choisir un type";
        type.style.border = " 1px solid red";
        type.nextElementSibling.style.color = "red"

    } else {
        typeValide = true
        type.nextElementSibling.textContent = "Champ valide";
        type.style.border = " 1px solid  green";
        type.nextElementSibling.style.color = "green"

    }





    if (nomValide && prixValide && imageValide && descrValide && typeValide) {
        etape1.style.display = "none";
        etape2.style.display = "block";
    }
})

function check(a, b) {
    let message = a.nextElementSibling;

    if (!b.test(a.value.trim())) {
        message.textContent = "Invalide , réessayer !!!";
        a.style.border = "1px solid red"
        message.style.color = "red"
        return false;

    } else {
        message.textContent = "Champ valide";
        message.style.color = "green"
        a.style.border = "1px solid green";
        return true;
    }
}

suivant2.addEventListener("click", function (event) {
    event.preventDefault()

    let quantiteValide = check(stock, quantStockRegex)
    let teinteValide = check(teinte, regexTeinte)
    let poidsValide = check(poids, poidRegex)

    if (quantiteValide && teinteValide && poidsValide) {
        afficherRecap();

        etape2.style.display = "none";
        etape3.style.display = "block";
    }
})
precedent1.addEventListener("click", function () {
    etape2.style.display = "none";
    etape1.style.display = "block";

});

precedent2.addEventListener("click", function () {
    etape3.style.display = "none";
    etape2.style.display = "block";
});


function afficherRecap() {
    recap.innerHTML = '<div id ="details">' +
        '<img class="w-40 h-40 object-cover rounded-xl" src="' + image.value + '" alt="' + nom.value + '">' +
        '<div>' +
        '<strong>' + nom.value + '</strong>' +
        '<p> Type : ' + type.value + '</p>' +
        '<p>Prix : ' + prix.value + 'DH</p>' +
        '<p>Teinte : ' + teinte.value + '</p>' +
        '<p>Quantité : ' + stock.value + ' en stock</p>' +
        '<p>Poids : ' + poids.value + ' g</p>' +
        '<p>Description du produit : ' + description.value + '</p>' +
        '</div>' +
        '</div>';
}
function ajouterProduit() {
    let prixPromo = prix.value
    if (promotion.value !== "") {
        prixPromo = prix.value - (prix.value * parseInt(promotion.value)) / 100;
    }

    let nouveauProduit = {
        nom: nom.value,
        type: type.value,
        prix: prix.value,
        promotion: promotion.value,
        prixReduit: prixPromo,
        stock: stock.value,
        poids: poids.value,
        description: description.value,
        image: image.value,
        promotion: promotion.value,
        datePromo: datepromo.value
    }
    Produits.push(nouveauProduit)
    // afficherRecap()
    afficherProduit()
}

//affichage produit diyal utilisateur 
function afficherProduit() {
    listeProduits.innerHTML = "";
    for (let i = 0; i < Produits.length; i++) {
        console.log(Produits[i].image)
        let carte = '<div class ="bg-white rounded-xl shadow-sm p-5 ">' +
            '<img src="' + Produits[i].image + '"class ="w-full h-40 object-cover rounded-lg mb-4">' +
            '<h3 class ="font-bold text-lg">' + Produits[i].nom + '</h3>' +
            '<p class ="text-gray-500">' + Produits[i].type + '</p>' +
            '<p>Prix : ' + Produits[i].prix + ' DH</p>'

        if (Produits[i].promotion !== "") {
            carte += '<p class="text-green-600">Promotion : ' + Produits[i].promotion + '</p>' +
                '<p class="font-bold text-[#963F6B]" >Prix réduit : ' + Produits[i].prixReduit + ' DH</p>'
        }

        carte += '<p>Stock : ' + Produits[i].stock + '</p>' +
            '<p>Poids : ' + Produits[i].poids + 'g</p>' +
            '<p class="text-gray-500 mt-2">' + Produits[i].description + '</p>' +
            '</div>'


        listeProduits.innerHTML += carte


    }
}




formulaire.addEventListener("submit", function (event) {
    event.preventDefault()
    let todaysdate = new Date()


    let yy = todaysdate.getFullYear();
    let mm = todaysdate.getMonth() + 1;
    let dd = todaysdate.getDate();

    if (mm < 10) {
        mm = "0" + mm
    }
    if (dd < 10) {
        dd = "0" + dd
    }

    let today = yy + "-" + mm + "-" + dd;
    dateerr.textContent = "";
    datepromo.style.border = "1px solid green";
    if (promotion.value !== "" && datepromo.value == "") {
        dateerr.innerHTML = "Veuillez choisir une date limite pour votre promotion !"
        dateerr.style.color = "red"
        datepromo.style.border = "1px solid red"
    } else if (promotion.value !== "" && datepromo.value < today) {
        dateerr.textContent = "La date ne peut pas être dans le passé !";
        dateerr.style.color = "red";
        datepromo.style.border = "1px solid red"
    } else {
        Swal.fire({
            title: "Êtes-vous sûr de vouloir ajouter ce produit ?",
            showCancelButton: true,
            confirmButtonText: "Oui",
            denyButtonText: `Non`
        }).then((result) => {

            if (result.isConfirmed) {
                ajouterProduit()

                Swal.fire({
                    title: "Produit créé !",
                    text: "Votre produit a bien été ajouté.",
                    icon: "success",
                    confirmButtonColor: "#963F6B"
                });

            }
            if (!result.isConfirmed) {
                formulaire.reset();

                etape3.style.display = "none";
                etape1.style.display = "block";
            }
        })
    }
})
console.log(Swal)
const config = {
  categorie: {
    fond : { name: "Fond de teint ", price: 160 },
    rouge: { name: "Rouge à lèvres", price: 120 }
  },
  teinte: {
    nude: { name: "01 Nude", price: 0 },
    rosewood: { name: "02 Rosewood", price: 0 },
    cerise: { name: "03 Cerise", price: 0 }
  },
  fini: {
    mat: { name: "Mat", price: 0 },
    brillant: { name: "Brillant", price: 15 }
  }
};

const lipstick = document.getElementById("op");
const foundation = document.getElementById("opt");
const colors = document.querySelector(".les-teintes");
const colors0 = document.querySelector(".les-teintes0");

const lipstickTitle = document.querySelector(".option2-titre");
const foundationTitle = document.querySelector(".option1-titre");


const totalPrice = document.querySelector(".prix-total p");
const addToCart = document.querySelector(".btn-panier");
const page1 = document.querySelector(".all1");
const page2 = document.querySelector(".all2");
const btnNavi1 = document.getElementById("navi");
const btnNavi2 = document.getElementById("navi2");

const priceFinal = document.querySelector(".price");
const recapRows = document.querySelectorAll(".summary-row");

const recapProduit = recapRows[0].querySelector(".label");
const recapProduitPrix = recapRows[0].querySelector(".value");

const recapTeinte = recapRows[1].querySelector(".label");
const recapTeintePrix = recapRows[1].querySelector(".included");

const recapFini = recapRows[2].querySelector(".label");
const recapFiniPrix = recapRows[2].querySelector(".included");

const recapSubtitle = document.querySelector(".subtitle_one");

addToCart.addEventListener("click", function () {
    page1.style.display = "none";
    page2.style.display = "grid";
});

let selectedConfig = {
  categorie: null,
  teinte: null,
  fini: null
};
// btnNavi1.addEventListener("click", function () {

//     page1.style.display = "block";
//     page2.style.display = "none";
// });

// btnNavi2.addEventListener("click", function () {

//     page1.style.display = "none";
//     page2.style.display = "block";
// });

function updateColors() {
    if (lipstick.checked) {
        lipstickTitle.textContent = "✓ Rouge à lèvres";
        foundationTitle.textContent = "Fond de teint";
        colors.style.display = "flex";
        colors0.style.display ="none"
    } else if (foundation.checked) {
        lipstickTitle.textContent = "Rouge à lèvres";
        foundationTitle.textContent = "✓ Fond de teint";
        colors.style.display = "none";
        colors0.style.display = "flex"
    }
    updatePrice();
}

let finis = document.querySelectorAll('input[name="fini"]');

for (let i = 0; i < finis.length; i++) {
    finis[i].addEventListener("change", updatePrice);
}

let teintes = document.querySelectorAll('input[name="teinte-ral"], input[name="teinte-fdt"]');

for (let i = 0; i < teintes.length; i++) {
    teintes[i].addEventListener("change", updatePrice);
}

lipstick.addEventListener("change", function () {

    if (this.checked) {
        selectedConfig.categorie = {
            name: config.categorie.rouge.name,
            price: config.categorie.rouge.price
        };
    }

    updateColors();
    updatePrice();
});


foundation.addEventListener("change", function () {

    if (this.checked) {
        selectedConfig.categorie = {
            name: config.categorie.fond.name,
            price: config.categorie.fond.price
        };
    }

    updateColors();
    updatePrice();
});
function updatePrice() {
    let total = 0;
    if (lipstick.checked) {
        total = config.categorie.rouge.price;
        recapProduit.textContent = config.categorie.rouge.name;
        recapProduitPrix.textContent = config.categorie.rouge.price + " DH";
    }
    else if (foundation.checked) {
        total = config.categorie.fond.price;
        recapProduit.textContent = config.categorie.fond.name;
        recapProduitPrix.textContent = config.categorie.fond.price + " DH";
    }
    let teinte;
    if (lipstick.checked) {
        teinte = document.querySelector('input[name="teinte-ral"]:checked');
    }
    else if (foundation.checked) {
        teinte = document.querySelector('input[name="teinte-fdt"]:checked');
    }
    if (teinte) {
        recapTeinte.textContent = "Teinte · " + teinte.value;
        recapTeintePrix.textContent = "Inclus";
    }
    const fini = document.querySelector('input[name="fini"]:checked');
    if (fini) {
        if (fini.value === "mat") {
            recapFini.textContent = "Fini · Mat";
            recapFiniPrix.textContent = "Inclus";
        }
        else if (fini.value === "brillant") {
            recapFini.textContent = "Fini · Brillant";
            recapFiniPrix.textContent = "+15,00 DH";
            if (total > 0) {
                total += config.fini.brillant.price;
            }
        }
    }
    totalPrice.textContent = total + " DH";
    priceFinal.textContent = total + " DH";
}

updateColors();

const all = document.querySelectorAll(".card")
let i = 0;

for (let config_key in config) {

    for (let key in config[config_key]) {

        namee = all[i].querySelector("div > span")
        namee.innerHTML = config[config_key][key].name;
       
       i++
    }
}










const config = {
  categorie: {
    fond: { name: "Fond de teint", price: 160 },
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
 
let selectedConfig = {
  categorie: null,
  teinte: null,
  fini: null
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

addToCart.addEventListener("click", function () {
    page1.style.display = "none";
    page2.style.display = "block";
});

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

function updatePrice() {
    let total = 0;

    if (lipstick.checked) {
        total = 120;
    } else if (foundation.checked) {
        total = 160;
    }

    const fini = document.querySelector('input[name="fini"]:checked');

    if (fini && fini.value === "brillant" && total > 0) {
        total += 15;
    }

    totalPrice.textContent = total + " DH";
}
let finis = document.querySelectorAll('input[name="fini"]');

for (let i = 0; i < finis.length; i++) {
    finis[i].addEventListener("change", updatePrice);
}

let teintes = document.querySelectorAll('input[name="teinte-ral"], input[name="teinte-fdt"]');

for (let i = 0; i < teintes.length; i++) {
    teintes[i].addEventListener("change", updatePrice);
}
lipstick.addEventListener("change", updateColors);
foundation.addEventListener("change", updateColors);





updateColors();









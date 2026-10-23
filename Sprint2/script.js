const config = {
    fond : { name: "Fond de teint ", price: 160 },
    rouge: { name: "Rouge à lèvres", price: 120 },
    brillant: { name: "Brillant", price: 15 }
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
const btnNavi1 = document.getElementById("#navi");
const btnNavi2 = document.getElementById("#navi2");
const priceFinal = document.querySelector(".price")

addToCart.addEventListener("click", function () {
    page1.style.display = "none";
    page2.style.display = "block";
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

function updatePrice() {
    let total = 0;

    if (lipstick.checked) {
        total = config.categorie.rouge.price;
    } else if (foundation.checked) {
        total = config.categorie.fond.price;
    }

    const fini = document.querySelector('input[name="fini"]:checked');

    if (fini && fini.value === "brillant" && total > 0) {
        total += config.fini.brillant.price;
    }

    totalPrice.innerHTML = total + " DH";
    priceFinal.innerHTML= total + " DH"
    
    console.log(total);
  
}


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


 for (let i = 0; i < finis.length; i++) {
    finis[i].addEventListener("change", function () {
        if (this.checked) {
            selectedConfig.fini = {
               
            };
        }
        updatePrice();
    });
}

updateColors();

// const all = document.querySelectorAll(".card")
// let i = 0;

// for (let config_key in config) {

//     for (let key in config[config_key]) {

//         namee = all[i].querySelector("div>span")
//         namee.innerHTML = config[config_key][key].name;
       
//        i++
//     }
// }









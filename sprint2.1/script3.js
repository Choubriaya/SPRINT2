const nom =document.querySelector("#nom")
const prix = document.querySelector("#prix")
const image =document.querySelector("#image")
const suivant1 = document.querySelector("#suivant1")

const suivant2 = document.querySelector("#suivant2")
const stock = document.querySelector("#quantite")
const teinte =document.querySelector("#teinte")
const poids =document.querySelector("#poids")

const etape1 = document.getElementById("etape1")
const etape2 = document.getElementById("etape2")
const etape3 = document.getElementById("etape3")

const precedent1 = document.querySelector("#precedent1")
const precedent2 = document.querySelector("#precedent2")



const bulle1 = document.querySelector("#bulle1");
const bulle2 = document.querySelector("#bulle2");
const bulle3 = document.querySelector("#bulle3");

const txt1 = document.querySelector("#txt1");
const txt2 = document.querySelector("#txt2");
const txt3 = document.querySelector("#txt3");

const ligne1 = document.querySelector("#ligne1");
const ligne2 = document.querySelector("#ligne2");



const nomRegex =/^[a-zA-ZÀ-ÿ\s'-]+$/
const prixRegex = /^[0-9]{2,3}$/
const urlRegex =/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
const quantStockRegex =/^(?:[1-9]\d{0,3}|10000)$/
const regexTeinte =/^[A-Za-zÀ-ÿ]+$/
const poidRegex =/^(?:[1-9]\d?|1\d{2}|2[0-4]\d|250)$/


suivant1.addEventListener("click", function(event){
 event.preventDefault()

    let nomValide = check(nom, nomRegex)
    let prixValide = check(prix, prixRegex)
    let imageValide = check(image, urlRegex)

    if (nomValide && prixValide && imageValide) {
       etape1.style.display = "none";
       etape2.style.display = "block";
    }
})

function check(a,b) {
     let message = a.nextElementSibling ;

 if (!b.test(a.value.trim())){
  message.textContent="Invalide , réessayer !!!" ;
  a.style.border ="1px solid red"
  message.style.color="red"
  return false ;

 }else{
  message.textContent="Champ valide";
  message.style.color="green"
  a.style.border ="1px solid green";
  return true;
}}



suivant2.addEventListener("click", function(event){
 event.preventDefault()

    let quantiteValide = check(stock,quantStockRegex)
    let teinteValide = check(teinte,regexTeinte)
    let poidsValide = check(poids,poidRegex)

    if (quantiteValide && teinteValide && poidsValide) {
       etape2.style.display = "none";
       etape3.style.display = "block";
    }
})
precedent1.addEventListener("click", function() {
       etape2.style.display = "none";
       etape1.style.display = "block";

});

precedent2.addEventListener("click", function() {
       etape3.style.display = "none";
       etape2.style.display = "block";
});


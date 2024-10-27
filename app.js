const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from"&&currCode==="NPR"){
           newOption.selected = "selected";
        }
        else if(select.name==="To"&&currCode==="INR"){
           newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);

    });
}

let changeFlag = (element)=>{
    let currCode = element.value;
    let newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}
const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal===""||amountVal<1){
        amount.value = "1";
        amountVal =1;

    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data =  await response.json();
    console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    
   
    
    let finalAmt = rate*amountVal;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});
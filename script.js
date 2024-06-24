const BASE_URL =
  "https://api.exchangerate-api.com/v4/latest";

  const dropdown=document.querySelectorAll(".country select");
  const btn=document.querySelector("button");
    const fromCurr=document.querySelector(".from select");
    const toCurr=document.querySelector(".to select");
    const msg=document.querySelector(".msg");


for (code in countryList){
    console.log(code,countryList[code]);
}

for(let select of dropdown){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("input")
    
    if(amount.value==="" || amount.value<1){
        amount.value=1;
        amount.textContent=1;
    }
    console.log(amount.value);
    console.log(fromCurr.value,toCurr.value);
    // const URL=`${BASE_URL}/${fromCurr.value}`;
    
    const response=await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`);
    console.log(response);
    let data=await response.json();
    const conversionRate=data.rates[toCurr.value];
    console.log(conversionRate);

    msg.textContent=`1 ${fromCurr.value}=${conversionRate} ${toCurr.value}`;

    let finalVal=amount.value*conversionRate;
    amount.value=finalVal;
    // btn.disabled=true;

});
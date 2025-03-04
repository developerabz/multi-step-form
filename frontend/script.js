const subscription = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
  },
  plan: {
    planType: "Arcade",
    price: "$9/mo",
  },
  addOns: []
}

/*
const addOnObj = {
  addOnName: "",
  price: -1
}
*/

const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");

const step1 = document.querySelector(".step-1");
const step2 = document.querySelector(".step-2");
const step3 = document.querySelector(".step-3");
const step4 = document.querySelector(".step-4");
const step5 = document.querySelector(".step-5");

// steps behaviour
const steps = [step1, step2, step3, step4, step5];
steps.slice(1, steps.length).forEach(s => s.style.display = "none");
steps.slice(0, steps.length - 1).forEach(s => {
  const buttons = document.createElement("section");
  buttons.classList.add("buttons");
  const pButton = document.createElement("button");
  pButton.textContent = "Go Back";
  pButton.classList.add("prev");
  const nButton = document.createElement("button");
  nButton.textContent = "Next Step";
  nButton.classList.add("next");
  buttons.appendChild(pButton);
  buttons.appendChild(nButton);
  s.appendChild(buttons);
});

step1.querySelector(".buttons").querySelector(".prev").style.visibility = "hidden";
const submitButton = step4.querySelector(".next")
submitButton.textContent = "Submit";
submitButton.classList.add("submit-button");
const planCards = document.querySelectorAll(".card");
const planCardsArr = Array.from(planCards);


const addOns = document.querySelectorAll(".add-on");
const addOnsArr = Array.from(addOns);


// step 4 behaviour

const planName = document.getElementById("plan-name");
const planAmount = document.getElementById("plan-amount");
const addOnsSummary = document.querySelector(".add-ons-summary");
const totalSummary = document.querySelector(".total-summary")

const [totalName, totalAmount] = totalSummary.querySelectorAll("p");


const createAddOnSummary = (addOnsObj) => {
  const { addOnName, price } = addOnsObj;
  const addOnNode = document.createElement("div");
  addOnNode.classList.add("add-on-summary");
  const pName = document.createElement("p");
  pName.textContent = addOnName;
  const pPrice = document.createElement("p");
  pPrice.textContent = price;
  addOnNode.append(pName, pPrice);
  return addOnNode;
}

const updatePlan = () => {
  const planCard = planCardsArr.find(pC => pC.classList.contains("card-active"));
  const cardTextContainer = planCard.querySelector("div");
  const cardTextH = cardTextContainer.querySelector("h3");
  const cardTextP = cardTextContainer.querySelector("p");
  subscription.plan.planType = cardTextH.textContent;
  subscription.plan.price = cardTextP.textContent;
}

const updateAddOns = () => {
  const selectedAddOns = addOnsArr
    .filter(addOn => addOn.classList.contains("card-active"))
    .map(addOn => {
      const cardTextContainer = addOn.querySelector("div");
      const addOnName = cardTextContainer.querySelector("h3").textContent;
      const price = addOn.querySelectorAll("p")[1].textContent;
      return { addOnName, price }
    });
  subscription.addOns = selectedAddOns;



}

const updateSummary = () => {
  planName.textContent = subscription.plan.planType;
  planAmount.textContent = subscription.plan.price;
  const addOnItems = subscription.addOns.map(addOn => createAddOnSummary(addOn));
  addOnsSummary.replaceChildren(...addOnItems);

  const amounts = [subscription.plan.price, ...subscription.addOns.map(addOn => addOn.price)];
  const period = amounts[0].split("/")[1];
  totalName.textContent = period === "mo" ? "Total (per month)" : "Total (per year)";

  const amountsNum = amounts.reduce((acc, curr) => {
    const amountNum = Number(curr.replace(/\D/g, ''));
    return acc + amountNum

  }, 0);

  totalAmount.textContent = `+$${amountsNum}/${period}`

}


// step 4 behaviour end

const nextState = (item) => {
  step1.style.display = "none";
  step2.style.display = "none";
  step3.style.display = "none";
  step4.style.display = "none";
  step5.style.display = "none";
  one.classList.remove("active");
  two.classList.remove("active");
  three.classList.remove("active");
  four.classList.remove("active");

  switch (item) {
    case "one":
      one.classList.add("active");
      step1.style.display = "flex";
      break;
    case "two":
      step2.style.display = "flex";
      two.classList.add("active");
      break;
    case "three":
      updatePlan();
      step3.style.display = "flex";
      three.classList.add("active");
      break;
    case "four":
      updateAddOns();
      updateSummary();
      step4.style.display = "flex";
      four.classList.add("active");
      break;
    case "five":
      step5.style.display = "flex";

      four.classList.add("active");
      break;
    default:
      break;
  }
}

const changePlan = document.querySelector(".change-plan");
changePlan.addEventListener("click", () => {
  nextState("two");
})
const personalName = document.getElementsByName("name")[0]
const personalEmail = document.getElementsByName("email")[0]
const personalPhone = document.getElementsByName("phone")[0]
const personalForm = document.querySelector("form");
const showNameError = () => {
  personalName.style.border = "1px solid red"
}
const hideNameError = () => {
  personalName.style.border = "1px solid grey"
}
const showEmailError = () => {
  personalEmail.style.border = "1px solid red"
}
const hideEmailError = () => {
  personalEmail.style.border = "1px solid grey"
}
personalName.addEventListener("change", (event) => {
  if (!/^[\w ]+$/.test(event.target.value.trim())) {

    showNameError()
  } else {
    hideNameError()
    subscription.personalInfo.name = event.target.value.trim();
  }
})


personalEmail.addEventListener("change", (event) => {
  if (!/^.+@.+\..+$/.test(event.target.value.trim())) {
    showEmailError()
  } else {
    hideEmailError()
    subscription.personalInfo.email = event.target.value.trim();
  }
})

personalPhone.addEventListener("change", (event) => {

  subscription.personalInfo.phone = event.target.value.trim();
})




const checkRequiredDetails = () => {
  return personalForm.reportValidity();
}

const updateDetails = () => {
  const pName = personalName.value.trim();
  const email = personalEmail.value.trim();
  const phone = personalPhone.value.trim();
  subscription.personalInfo = { name: pName, email, phone };
}



step1.querySelector(".next").addEventListener("click", () => {
  fetch("http://localhost:3000/api/works", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  if (checkRequiredDetails()) {
    updateDetails();

    nextState("two");
  }
});


step2.querySelector(".next").addEventListener("click", () => {
  nextState("three");
});


step3.querySelector(".next").addEventListener("click", () => {
  nextState("four");
});


step4.querySelector(".next").addEventListener("click", () => {
  nextState("five");
});

step2.querySelector(".prev").addEventListener("click", () => {
  nextState("one");
});


step3.querySelector(".prev").addEventListener("click", () => {
  nextState("two");
});


step4.querySelector(".prev").addEventListener("click", () => {
  nextState("three");
});

// yearly and monthly behaviour
const timeSwitch = document.querySelector(".time-period").querySelector("span");
const timeSwitchCircle = timeSwitch.querySelector("span");


const handleMonthlySwitch = (planCard) => {
  const cardTextContainer = planCard.querySelector("div");
  const cardTextH = cardTextContainer.querySelector("h3");
  const cardTextP = cardTextContainer.querySelector("p");
  cardTextContainer.removeChild(cardTextP);
  switch (cardTextH.textContent) {
    case "Arcade":
      cardTextP.textContent = "$9/mo";
      break;
    case "Advanced":
      cardTextP.textContent = "$12/mo";
      break;
    case "Pro":
      cardTextP.textContent = "$15/mo";
      break;

    default:
      break;
  }

  const savingsText = cardTextContainer.querySelector(".blue-text");
  if (savingsText) {
    cardTextContainer.removeChild(savingsText);
  }

  cardTextContainer.appendChild(cardTextP);
}

const handleYearlySwitch = (planCard) => {
  const cardTextContainer = planCard.querySelector("div");
  const cardTextH = cardTextContainer.querySelector("h3");
  const cardTextP = cardTextContainer.querySelector("p");
  cardTextContainer.removeChild(cardTextP);
  switch (cardTextH.textContent) {
    case "Arcade":
      cardTextP.textContent = "$90/yr";
      break;
    case "Advanced":
      cardTextP.textContent = "$120/yr";
      break;
    case "Pro":
      cardTextP.textContent = "$150/yr";
      break;

    default:
      break;
  }
  cardTextContainer.appendChild(cardTextP);
  const savingsText = document.createElement("p");
  savingsText.classList.add("blue-text");
  savingsText.textContent = "2 months free";
  cardTextContainer.appendChild(savingsText);


}

const handleAddOnMonthlySwitch = (addOn) => {
  const cardTextContainer = addOn.querySelector("div");
  const cardTextH = cardTextContainer.querySelector("h3");
  const cardTextP = addOn.querySelectorAll("p")[1];
  addOn.removeChild(cardTextP);
  switch (cardTextH.textContent) {
    case "Online service":
      cardTextP.textContent = "+$1/mo";
      break;
    case "Larger storage":
      cardTextP.textContent = "+$2/mo";
      break;
    case "Customizable profile":
      cardTextP.textContent = "+$2/mo";
      break;

    default:
      break;
  }

  addOn.appendChild(cardTextP);
}


const handleAddOnYearlySwitch = (addOn) => {
  const cardTextContainer = addOn.querySelector("div");
  const cardTextH = cardTextContainer.querySelector("h3");
  const cardTextP = addOn.querySelectorAll("p")[1];
  addOn.removeChild(cardTextP);
  switch (cardTextH.textContent) {
    case "Online service":
      cardTextP.textContent = "+$10/yr";
      break;
    case "Larger storage":
      cardTextP.textContent = "+$20/yr";
      break;
    case "Customizable profile":
      cardTextP.textContent = "+$20/yr";
      break;

    default:
      break;
  }

  addOn.appendChild(cardTextP);
}

const handleTimeSwitch = () => {
  timeSwitchCircle.classList.toggle("yearly-switch");
  planCards.forEach(planCard => {
    if (timeSwitchCircle.classList.contains("yearly-switch")) {
      handleYearlySwitch(planCard);
    } else {
      handleMonthlySwitch(planCard);
    }
  });

  addOns.forEach(addOn => {
    if (timeSwitchCircle.classList.contains("yearly-switch")) {
      handleAddOnYearlySwitch(addOn)
    } else {
      handleAddOnMonthlySwitch(addOn)
    }
  })



}


timeSwitch.addEventListener("click", handleTimeSwitch);

// plan selection behavior 
planCards.forEach(planCard => {
  planCard.addEventListener("click", () => {
    planCardsArr
      .filter(pC => pC.classList.contains("card-active"))
      .forEach(pC => {
        pC.classList.remove("card-active")

      });

    planCard.classList.add("card-active");
  })
})

// check box add on behaviour

addOns.forEach(addOn => {
  addOn.addEventListener("click", () => {
    const checkBox = addOn.querySelector("input");
    checkBox.checked = checkBox.checked ? false : true;
    const isChecked = checkBox.checked;
    if (isChecked) {
      addOn.classList.add("card-active")
    } else {
      addOn.classList.remove("card-active")
    }

  })
})



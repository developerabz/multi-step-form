const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");

const step1 = document.querySelector(".step-1");
const step2 = document.querySelector(".step-2");
const step3 = document.querySelector(".step-3");
const step4 = document.querySelector(".step-4");
const step5 = document.querySelector(".step-5");

const steps = [step1, step2, step3, step4, step5];
steps.slice(1, steps.length).forEach(s => s.style.display = "none");
steps.slice(0, steps.length - 1).forEach(s => {
  const buttons = document.createElement("section");
  buttons.classList.add("buttons");
  const pButton = document.createElement("button");
  pButton.textContent = "Previous Step";
  pButton.classList.add("prev");
  const nButton = document.createElement("button");
  nButton.textContent = "Next Step";
  nButton.classList.add("next");
  buttons.appendChild(pButton);
  buttons.appendChild(nButton);
  s.appendChild(buttons);
});

step1.querySelector(".buttons").removeChild(document.querySelector(".prev"));
step4.querySelector(".next").textContent = "Submit";

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
      step3.style.display = "flex";
      three.classList.add("active");
      break;
    case "four":
      step4.style.display = "flex";
      four.classList.add("active");
      break;
    case "five":
      step5.style.display = "flex";
      break;
    default:
      break;
  }
}


step1.querySelector(".next").addEventListener("click", () => {
  nextState("two");
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

const timeSwitch = document.querySelector(".time-period").querySelector("span");
const timeSwitchCircle = timeSwitch.querySelector("span");
const planCards = document.querySelectorAll(".card");

const handleMonthlySwitch = (planCard) => {
  const cardTextContainer = planCard.querySelector("div");
  const cardTextH = cardTextContainer.querySelector("h3");
  const cardTextP = cardTextContainer.querySelector("p");
  cardTextContainer.removeChild(cardTextP);
  console.log(cardTextH.textContent === "Arcade")
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

const handleTimeSwitch = () => {
  timeSwitchCircle.classList.toggle("yearly-switch");
  planCards.forEach(planCard => {
    if (timeSwitchCircle.classList.contains("yearly-switch")) {
      handleYearlySwitch(planCard);
    } else {
      handleMonthlySwitch(planCard);
    }
  })



}


timeSwitch.addEventListener("click", handleTimeSwitch);

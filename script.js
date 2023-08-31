// alert("Hello World!");

// create an active class that changes the color
// of the circle when it is pressed

let array = ["one", "two", "three", "four", "five"];
for (const arr of array) {
    console.log(arr);
}



// const prevButton = document.querySelector(".prev");
// const nextButton = document.querySelector(".next");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");

let step1 = document.querySelector(".step-1");
let step2 = document.querySelector(".step-2");
let step3 = document.querySelector(".step-3");
let step4 = document.querySelector(".step-4");
let step5 = document.querySelector(".step-5");
step2.style.display = "none";
step3.style.display = "none";
step4.style.display = "none";
step5.style.display = "none";
// prevButton.style.display = "none";

const steps = [step1, step2, step3, step4];
// step1.appendChild(buttons);
// step2.appendChild(buttons);
// step3.appendChild(buttons);
// step4.appendChild(buttons);
steps.forEach(s => {
    const buttons = document.createElement("section");
    // buttons.textContent = "none";
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
// step1 = document.querySelector(".step-1");
// step2 = document.querySelector(".step-2");
// step3 = document.querySelector(".step-3");
// step4 = document.querySelector(".step-4");
// step5 = document.querySelector(".step-5");
console.log("does it" + step1.querySelector("section"));
steps.forEach(s => console.log(s));
// console.log(buttons);
// step1.querySelector(".buttons").appendChild(nButton);
step1.querySelector(".buttons").removeChild(document.querySelector(".prev"));

// step1.querySelector(".buttons").removeChild(document.querySelector(".prev"));

// step1.querySelector(".buttons").removeChild(document.querySelector(".prev"));
const nextState = (item) => {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "none";
    step4.style.display = "none";
    step5.style.display = "none";
    // prevButton.style.display = "none";
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
            // prevButton.style.display = "block";
            step2.style.display = "flex";
            two.classList.add("active");
            break;
        case "three":
            // prevButton.style.display = "block";
            step3.style.display = "flex";
            three.classList.add("active");

            break;
        case "four":
            // prevButton.style.display = "block";
            step4.style.display = "flex";
            four.classList.add("active");

            break;
        case "five":
            // nextButton.style.display = "none";
            step5.style.display = "flex";

            break;
     
        default:
            break;
    }
}  
let count = 0;
// nextButton.addEventListener("click", () => {
//     count++;
//     if (count < array.length) {
        
//         nextState(array[count]);
//     }

// });
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
// prevButton.addEventListener("click", () => {

//     count--;
//     if (count >= 0) {
        
//         nextState(array[count]);
//     }

// });
// alert("Hello World!");

// create an active class that changes the color
// of the circle when it is pressed

let array = ["one", "two", "three", "four"];
for (arr in array) {
    console.log(array[arr]);
}

const nextButton = document.querySelector("button");
const one = document.querySelector(".one");
const step1 = document.querySelector(".step-1");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");

const step2 = document.querySelector(".step-2");
const step3 = document.querySelector(".step-3");
const step4 = document.querySelector(".step-4");
const step5 = document.querySelector(".step-5");
step2.style.display = "none";
step3.style.display = "none";
step4.style.display = "none";
step5.style.display = "none";

nextButton.addEventListener("click", () => {
    // array.forEach(value => {

    if (one.classList.contains("active")) {
        one.classList.toggle("active");
        two.classList.toggle("active");
        step1.style.display = "none";
        step2.style.display = "block";
    } else if (two.classList.contains("active")) {
        two.classList.toggle("active");
        three.classList.toggle("active");
        step2.style.display = "none";
        step3.style.display = "block";
    } else if (three.classList.contains("active")) {
        three.classList.toggle("active");
        four.classList.toggle("active");
        step3.style.display = "none";
        step4.style.display = "block";
        nextButton.textContent = "Submit";
    } else if (four.classList.contains("active")) {
        // four.classList.toggle("active");
        // one.classList.toggle("active");
        nextButton.style.display = "none";
        step4.style.display = "none";
        step5.style.display = "block";
    } 

    
    
    // });
    
});
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
nextButton.addEventListener("click", () => {
    // array.forEach(value => {

    if (one.classList.contains("active")) {
        one.classList.toggle("active");
        two.classList.toggle("active");
        step1.style.display = "none";
    } else if (two.classList.contains("active")) {
        two.classList.toggle("active");
        three.classList.toggle("active");
    } else if (three.classList.contains("active")) {
        three.classList.toggle("active");
        four.classList.toggle("active");
    } else if (four.classList.contains("active")) {
        four.classList.toggle("active");
        one.classList.toggle("active");
        step1.style.display = "block";
    } 

    
    
    // });
    
});
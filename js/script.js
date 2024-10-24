const initSliderGirlCode = () => {
    const slideButtons = document.querySelectorAll(".girlcode-slider-wrapper .slide-button");
    const imageList = document.querySelector(".girlcode-image-list");


    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id ==="prev-slide" ? -1 : 1;
            const scrollAmount = (imageList.clientWidth+35) * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });
}

const initSliderHope = () => {
    const slideButtons = document.querySelectorAll(".hope-slider-wrapper .slide-button");
    const imageList = document.querySelector(".hope-image-list");


    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id ==="prev-slide-2" ? -1 : 1;
            const scrollAmount = (imageList.clientWidth+35) * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });
}

const initSliderCodeHers = () => {
    const slideButtons = document.querySelectorAll(".codehers-slider-wrapper .slide-button");
    const imageList = document.querySelector(".codehers-image-list");


    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id ==="prev-slide-3" ? -1 : 1;
            const scrollAmount = (imageList.clientWidth+35) * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });
}

const initSliderHackathon = () => {
    const slideButtons = document.querySelectorAll(".hackathon-slider-wrapper .slide-button");
    const imageList = document.querySelector(".hackathon-image-list");


    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id ==="prev-slide-4" ? -1 : 1;
            const scrollAmount = (imageList.clientWidth+35) * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });
}

window.addEventListener("load", initSliderGirlCode);
window.addEventListener("load", initSliderHope);
window.addEventListener("load", initSliderCodeHers);
window.addEventListener("load", initSliderHackathon);
"use strict"
//global array
let _cars = [];

//Getting data from JSON file
async function loadData(){
    let jsonData = await fetch('cars.json').then(res => res.json()).catch(error => console.log(error));
    console.log(jsonData);
    _cars = jsonData.data;

    appendCars(_cars);
}

loadData();

//Display all cars
function appendCars(cars){
    let htmlTemplate = "";
    for (let car of cars) {
        htmlTemplate +=`
        <article class="car-content">
            <a href="#${car.initials.brand}/${car.title}" onclick="appendDetails(${car.ID})">${getImageSource(car, car.title)}</a>
            <div class="main-info">
                <h2 class="car-brand">${car.initials.brand}</h2>
                <p class="car-model">${car.title}</p>
                <p class="car-price"><i class="fas fa-dollar-sign"></i> ${car.initials.price} DKK</p>

                <a href="#${car.initials.brand}/${car.title}" onclick="appendDetails(${car.ID})" class="more">More details</a>
            </div>
        </article>`
    }
    document.querySelector(".container").innerHTML += htmlTemplate;
}

//Show first image or nothing
let getImageSource = (car, label) => (car.images) ? `<img src="${car.images[0]}" alt="${label}">` : '' ;

//Display details info about clicked car
function appendDetails(carId){
    console.log(carId);
    
    let specificCarDetails = "";
    for (let car of _cars) {
        if(car.ID === carId){
            specificCarDetails = car;
        }
    }
    console.log(specificCarDetails.title);
    let mainFeatureData = (exactData, label) => (exactData.data && exactData.after) ? label + exactData.data + exactData.after : (exactData.data) ? label + exactData.data : '' ;
    let initialsData = (exactData, label) => (exactData) ? label + exactData : '' ;

    let htmlDetailsTemplate = "";
    htmlDetailsTemplate += `
    <article class="details-info">
        <div class="main-info">
            <div class="images">${showImg(specificCarDetails.images)}</div>
            <div class="initials-container">
                <div class="brand-model">
                    <h2 class="car-brand details-header">${specificCarDetails.initials.brand}</h2>
                    <p class="car-model details-model">${specificCarDetails.title}</p>
                    <span><p class="car-model details-variant">${initialsData(specificCarDetails.initials.variant, 'Variant: ')}</p></span>
                    <p class="car-model">${initialsData(specificCarDetails.initials.segment, 'Segment: ')}</p>
                    <p class="car-price details-price">${initialsData(specificCarDetails.initials.price, '<i class="fas fa-dollar-sign"></i> ')} DKK</p>
                </div>
                <p class="car-model details-desc">${specificCarDetails.description}</p>
                
            </div>
        </div>
        <div class="feature-container">
            <h3>Main features</h3>
            <div class="main-feature">
                <p class="car-model">${mainFeatureData(specificCarDetails.main.Rækkevide, 'Range: ')}</p>
                <p class="car-model">${mainFeatureData(specificCarDetails.main.Batteri, 'Battery: ')}</p>
                <p class="car-model">${mainFeatureData(specificCarDetails.main.Garanti, 'Garanti: ')}</p>
                <p class="car-model">${mainFeatureData(specificCarDetails.main["0 - 100 Km/t"], '0-100 km/h: ')}</p>
                <p class="car-model">${mainFeatureData(specificCarDetails.main.Vægt, 'Weight: ')}</p>
            </div>
            <h3>Extra features</h3>
            <div class="extra-feature">
                <p class="car-model">${initialsData(specificCarDetails.extra["Træk på krog"], 'Træk på krog: ')}</p>
                <p class="car-model">${initialsData(specificCarDetails.extra["Maksimum hastighed"], 'Maksimum hastighed: ')}</p>
                <p class="car-model">${initialsData(specificCarDetails.extra.Opladning, 'Opladning: ')}</p>
                <p class="car-model">${initialsData(specificCarDetails.extra["Opladning (hurtig)"], 'Opladning (hurtig): ')}</p>
                
            </div>
        </div>
    </article>
    `
    
    document.querySelector(".container").style.display = "none";
    document.querySelector(".main-header").innerHTML = "<h1 class='back' onclick='backToList()'><i class='fas fa-angle-left'></i> Go back</h1>";
    document.querySelector(".details").innerHTML = htmlDetailsTemplate;
    document.querySelector(".details").style.display = "flex";
}

function showImg(images){
     console.log(images);
     console.log("uploaded");
     if (images){
        let htmlImgTemplate = "";
        for (let image of images) {
            htmlImgTemplate += `
            <img src="${image}" alt="img">`  
        }
        return htmlImgTemplate;
     }  else {
         return "";
     }  
};

//Back to homepage
function backToList(){
    document.querySelector(".details").style.display = "none";
    document.querySelector(".container").style.display = "flex";
    document.querySelector(".main-header").innerHTML = "<h1>Check our electrical cars</h1>";
    console.log("click");
}
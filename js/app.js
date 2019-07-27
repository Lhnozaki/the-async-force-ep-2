"use strict";

// add event listener to button
document
  .querySelector("#requestResourceButton")
  .addEventListener("click", getData);

// Selector
let selectVal = document.querySelector("#resourceType");

// Content container
let contentContainer = document.querySelector("#contentContainer");

// getData function for event listener
function getData(e) {
  contentContainer.innerHTML = "";
  let number = document.querySelector(`input[type="text"]`).value;

  const XHR = new XMLHttpRequest();

  let val = "";

  let errorMessage = document.createElement("h2");
  errorMessage.style.color = "red";

  if (number === "" || number === undefined) {
    errorMessage.innerHTML = "Please enter a number value in the input field";
    contentContainer.appendChild(errorMessage);
    console.log("error");
  } else if (selectVal.value === "people") {
    XHR.open("GET", `https://swapi.co/api/people/${number}`, true);
    val = selectVal.value;
  } else if (selectVal.value === "planets") {
    XHR.open("GET", `https://swapi.co/api/planets/${number}`, true);
    val = selectVal.value;
  } else if (selectVal.value === "starships") {
    XHR.open("GET", `https://swapi.co/api/starships/${number}`, true);
    val = selectVal.value;
  }

  XHR.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let name = response.name;
      let gender = response.gender;
      let species = response.species;
      let terrain = response.terrain;
      let population = response.population;
      let films = response.films;
      let manufacturer = response.manufacturer;
      let starship_class = response.starship_class;

      if (val === "people") {
        let characterName = document.createElement("h2");
        characterName.innerHTML = name;
        contentContainer.appendChild(characterName);

        let characterGender = document.createElement("p");
        characterGender.innerHTML = gender;
        contentContainer.appendChild(characterGender);

        const speciesXHR = new XMLHttpRequest();
        speciesXHR.addEventListener("load", getSpecies);
        speciesXHR.open("GET", species, true);
        speciesXHR.send();

        function getSpecies() {
          let species = JSON.parse(this.responseText).name;
          let displaySpecies = document.createElement("p");
          displaySpecies.innerHTML = species;
          contentContainer.appendChild(displaySpecies);
        }
      } else if (val === "planets") {
        let planetName = document.createElement("h2");
        planetName.innerHTML = name;
        contentContainer.appendChild(planetName);

        let planetTerrain = document.createElement("p");
        planetTerrain.innerHTML = terrain;
        contentContainer.appendChild(planetTerrain);

        let planetPopulation = document.createElement("p");
        planetPopulation.innerHTML = population;
        contentContainer.appendChild(planetPopulation);

        let filmUL = document.createElement("ul");
        contentContainer.appendChild(filmUL);

        films.forEach(function(e) {
          const filmsXHR = new XMLHttpRequest();
          filmsXHR.open("GET", e, true);
          filmsXHR.addEventListener("load", function() {
            let filmName = JSON.parse(this.responseText).title;
            let filmList = document.createElement("li");
            filmList.innerHTML = filmName;
            filmUL.appendChild(filmList);
          });
          filmsXHR.send();
        });
      } else if (val === "starships") {
        let starshipName = document.createElement("h2");
        starshipName.innerHTML = name;
        contentContainer.appendChild(starshipName);

        let starshipManufacturer = document.createElement("p");
        starshipManufacturer.innerHTML = manufacturer;
        contentContainer.appendChild(starshipManufacturer);

        let starshipClass = document.createElement("p");
        starshipClass.innerHTML = starship_class;
        contentContainer.appendChild(starshipClass);

        let filmUL = document.createElement("ul");
        contentContainer.appendChild(filmUL);

        films.forEach(function(e) {
          const filmsXHR = new XMLHttpRequest();
          filmsXHR.open("GET", e, true);
          filmsXHR.addEventListener("load", function() {
            let filmName = JSON.parse(this.responseText).title;
            let filmList = document.createElement("li");
            filmList.innerHTML = filmName;
            filmUL.appendChild(filmList);
          });
          filmsXHR.send();
        });
        console.log(starship_class);
      }
    }

    if (this.status === 404) {
      errorMessage.innerHTML = `404: Not Found. index "${number}" does not exist`;
      contentContainer.appendChild(errorMessage);
    }
  };

  XHR.send();

  e.preventDefault();
}

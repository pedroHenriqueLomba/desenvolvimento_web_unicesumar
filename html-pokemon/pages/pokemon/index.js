function changePageTitle(title) {
  document.title = title;
}

function generateInfoSection(fotosData, pokemonName) {
  const h2 = document.createElement("h2");
  h2.id = "info-pokemon-label";
  h2.textContent = `Informações sobre ${pokemonName}`;

  const img = document.querySelector("img");
  img.src = fotosData.front_default;
  img.alt = `Imagem do pokemon ${pokemonName}`;

  let fotos = Object.keys(fotosData).map((foto, index) => {
    if (typeof fotosData[foto] === "string") {
      return fotosData[foto];
    }
  });

  fotos = fotos.filter((foto) => {
    return foto !== undefined;
  });

  console.log(fotos);

  const fotoPokemon = document.getElementById("fotoPokemon");
  let currentPhotoIndex = 0;
  fotoPokemon.addEventListener("click", () => {
    img.src = fotos[currentPhotoIndex];
    img.alt = `Imagem do pokemon ${pokemonName}`;

    currentPhotoIndex = (currentPhotoIndex + 1) % fotos.length;
    img.src = fotos[currentPhotoIndex];
  });

  const section = document.querySelector("#info-pokemon");

  section.appendChild(h2);
  section.appendChild(img);
}

async function getPokemonData(name) {
  // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  //   .then((fetchData) => {
  //     return fetchData.json()
  //   })
  //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
  //   .catch((error) => console.error(error))

  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const jsonData = await data.json();

    generateInfoSection(jsonData.sprites, name);
  } catch (error) {
    console.error(error);
  }
}

function getSearchParams() {
  // Early return -> Caso location search, não faz nada.
  if (!location.search) {
    return;
  }

  // URLSearchParams é uma classe que facilita a manipulação de query strings
  const urlSearchParams = new URLSearchParams(location.search);

  // Pegando o valor do parâmetro name
  const pokemonName = urlSearchParams.get("name");

  changePageTitle(`Pagina do ${pokemonName}`);
  getPokemonData(pokemonName);
}

document.addEventListener("DOMContentLoaded", function () {
  getSearchParams();
});

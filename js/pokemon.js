const contenedor = document.querySelector(".pokemon__card");
const coloresTipos = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  ground: "#E2BF65",
  bug: "#A6B91A",
};

fetch("https://pokeapi.co/api/v2/pokemon")
  .then(response => response.json())
  .then(data => {
    data.results.forEach(pokemon => {
      const card = document.createElement("div");

      card.classList.add("pokemon__details");

      card.innerHTML = `
        <div class="pokemon__info">
          <h2>${pokemon.name}</h2>
          <button class="btn-ver-mas">Ver más</button>
        </div>
        <div class="pokemon__detail"></div>
      `;

      const boton = card.querySelector(".btn-ver-mas");
      const detailDiv = card.querySelector(".pokemon__detail");

      boton.addEventListener("click", async () => {
        if (detailDiv.innerHTML !== "") {
          detailDiv.innerHTML = "";
          return;
        }

        const res = await fetch(pokemon.url);
        const character = await res.json();

        const tipo = character.types[0].type.name;

        card.style.backgroundColor = coloresTipos[tipo] || "#ffffff";

        detailDiv.innerHTML = `
          <img src="${character.sprites.front_default}" />
          <p><strong>Altura:</strong> ${character.height}</p>
          <p><strong>Peso:</strong> ${character.weight}</p>
          <p><strong>Tipos:</strong> ${character.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> ${character.abilities.map(a => a.ability.name).join(", ")}</p>
        `;
      });
      contenedor.appendChild(card);
    });
  })
  
 .catch(error => console.error(error));

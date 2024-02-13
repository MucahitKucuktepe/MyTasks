const predefinedColors = ["#FF5733", "#33FF57", "#5733FF"];
let selectedColorIndex = 0;
let selectedItem = null;

const fetchData = async () => {
  const endpoint = "https://countries.trevorblades.com/graphql";
  const query = `
    query {
      countries {
        name
        capital
        languages{
            name
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    // Yanıtın JSON formatına çevrilmesi
    const { data } = await response.json();

    selectedItem = data.countries?.length > 0 ? data.countries[9] : null;
    console.log(selectedItem);
    renderList(data.countries)
  } catch (error) {
    console.log(error);
  }
};
fetchData();

function renderList(countries) {
  const countryList = document.getElementById("countryList");
  countryList.innerHTML = "";
  console.log(countries);
  countries?.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.name;
    listItem.style.backgroundColor =
      selectedItem && selectedItem.id === item.id
        ? predefinedColors[selectedColorIndex]
        : "white";

    listItem.addEventListener("click", () => handleItemClick(item));
    countryList.appendChild(listItem);
  });
}

function handleItemClick(item) {
  selectedItem = item;
  selectedColorIndex = (selectedColorIndex + 1) % predefinedColors.length;
  renderList();
}

document.getElementById("searchInput").addEventListener("input", fetchData);

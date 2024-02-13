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
        awsRegion
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
    country = data?.countries;
    renderList(data.countries);
  } catch (error) {
    console.log(error);
  }
};
fetchData();

const renderList = (countries) => {
  const countryList = document.getElementById("countryList");
  countryList.textContent = `${selectedItem.name}, capital: ${selectedItem?.capital}, awsRegion: ${selectedItem.awsRegion}`;
  console.log();
  console.log(countries);
  countries?.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name}, capital: ${item?.capital}, awsRegion: ${item.awsRegion}`;
    listItem.style.backgroundColor =
      selectedItem && selectedItem.id === item.id
        ? predefinedColors[selectedColorIndex]
        : "green";

    listItem.addEventListener("click", () => handleItemClick(item));
    countryList.appendChild(listItem);
  });
};

function handleItemClick(item) {
  selectedItem = item;
  selectedColorIndex = (selectedColorIndex + 1) % predefinedColors.length;
  renderList();
}

const search = document.getElementById("searchInput");
search.addEventListener("input", (e) => {
  console.log(e.target.value);
  const value = e.target.value.toLowerCase();
  console.log(country);
  const newArr=country.filter((item)=>item.name.toLowerCase().includes(value))
  console.log(newArr)
});

const fetchWainWrightData = async () => {
    const response =await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json")
    const jsonData = await response.json();
    wainwrightData = jsonData;
    createWainwrightsList(wainwrightData);

}


const filterWainwrights = (filterValue) => {
    // Filter the Wainwrights data based on the filter value
    const filteredWainwrights = wainwrightData.filter(wainwright => {
        // Check if the name of the Wainwright includes the filter value (case-insensitive)
        return wainwright.name.toLowerCase().includes(filterValue.toLowerCase());
    });

    // Call a function to update the displayed list of Wainwrights with the filtered data
    createWainwrightsList(filteredWainwrights);
}


const createWainwrightsList = (wainwrights) => {
    const wainwrightsList = document.getElementById('wainwrights-list');
    wainwrightsList.innerHTML = ''; 

    wainwrights.forEach(wainwright => {
        const listItem = document.createElement('li');

        const nameElement = document.createElement('h2');
        nameElement.textContent = wainwright.name;

        const heightElement = document.createElement('p');
        heightElement.textContent = `Height: ${wainwright.heightMetres}m (${wainwright.heightFeet}ft)`;

        const areaElement = document.createElement('p');
        areaElement.textContent = `Area: ${wainwright.area.areaName}`;

        listItem.appendChild(nameElement);
        listItem.appendChild(heightElement);
        listItem.appendChild(areaElement);

        wainwrightsList.appendChild(listItem);
    });
}


const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputValue = document.getElementById('filterInput').value;
    filterWainwrights(inputValue);
}

const filterForm = document.getElementById('filterForm');
filterForm.addEventListener('submit', handleFormSubmit);

// Fetch Wainwright data when the page loads
fetchWainWrightData();

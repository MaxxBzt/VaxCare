const countries = [
    "🇺🇸 United States",
    "🇨🇳 China",
    "🇯🇵 Japan",
    "🇩🇪 Germany",
    "🇮🇳 India",
    "🇬🇧 United Kingdom",
    "🇫🇷 France",
    "🇮🇹 Italy",
    "🇧🇷 Brazil",
    "🇨🇦 Canada",
    "🇷🇺 Russia",
    "🇦🇺 Australia",
    "🇪🇸 Spain",
    "🇰🇷 South Korea",
    "🇳🇱 Netherlands",
    "🇲🇽 Mexico",
    "🇮🇩 Indonesia",
    "🇸🇦 Saudi Arabia",
    "🇹🇷 Turkey",
    "🇨🇭 Switzerland"
];


function filterCountries() {
    const input = document.getElementById('country-input').value.toLowerCase();
    const dropdown = document.getElementById('country-dropdown');
    dropdown.innerHTML = '';

    const filteredCountries = countries.filter(country => country.toLowerCase().includes(input));

    if (filteredCountries.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    filteredCountries.forEach(country => {
        const option = document.createElement('div');
        option.textContent = country;
        option.classList.add('country-option');
        option.addEventListener('click', () => {
            document.getElementById('country-input').value = country;
            dropdown.style.display = 'none';
        });
        dropdown.appendChild(option);
    });

    dropdown.style.display = 'block';
}

function search() {
    const searchTerm = document.getElementById('country-input').value.toLowerCase();
    console.log('Searching for:', searchTerm);
}

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('country-dropdown');
    const input = document.getElementById('country-input');
    if (!dropdown.contains(event.target) && event.target !== input) {
        dropdown.style.display = 'none';
    }
});
/* Autor: Yahor Dziamyanenka | Nr indeksu: 77143 */

const themeBtn = document.getElementById('theme-button');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('green-theme');
    document.body.classList.toggle('red-theme');
});

const toggleBtn = document.getElementById('toggle-section-button');
const sectionToToggle = document.getElementById('projekty');

toggleBtn.addEventListener('click', () => {
    if (sectionToToggle.style.display === 'none') {
        sectionToToggle.style.display = 'block';
        toggleBtn.textContent = 'Ukryj Projekty';
    } else {
        sectionToToggle.style.display = 'none';
        toggleBtn.textContent = 'Pokaż Projekty';
    }
});
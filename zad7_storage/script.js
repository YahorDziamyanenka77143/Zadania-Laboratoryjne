/* Autor: Yahor Dziamyanenka | Nr indeksu: 77143 */
//Zadanie 4
document.getElementById('theme-button').addEventListener('click', () => {
    document.body.classList.toggle('green-theme');
    document.body.classList.toggle('red-theme');
});

document.getElementById('toggle-section-button').addEventListener('click', function() {
    const section = document.getElementById('projekty');
    if (section.style.display === 'none') {
        section.style.display = 'block';
        this.textContent = 'Ukryj Projekty';
    } else {
        section.style.display = 'none';
        this.textContent = 'Pokaż Projekty';
    }
});

//Zadanie 5
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const nameRegex = /^([^0-9]*)$/;

    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.getElementById('successMsg').style.display = 'none';

    const checks = [
        { id: 'firstName', msg: 'Imię jest wymagane i nie może zawierać cyfr' },
        { id: 'lastName', msg: 'Nazwisko jest wymagane i nie może zawierać cyfr' }
    ];

    checks.forEach(check => {
        const val = document.getElementById(check.id).value.trim();
        if (val === '' || !nameRegex.test(val)) {
            document.getElementById(check.id + 'Error').textContent = check.msg;
            isValid = false;
        }
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value)) {
        document.getElementById('emailError').textContent = 'Podaj poprawny adres e-mail';
        isValid = false;
    }

    if (document.getElementById('message').value.trim() === '') {
        document.getElementById('messageError').textContent = 'Wiadomość nie może być pusta';
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMsg').style.display = 'block';
        this.reset();
    }
});

//Zadanie 6
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd sieci lub brak pliku JSON');
            }
            return response.json();
        })
        .then(data => {
            const skillsList = document.getElementById('skills-list');
            const projectsList = document.getElementById('projects-list');

            // umiejetnosci
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.innerHTML = skill; // innerHTML zachowuje tagi <strong>
                skillsList.appendChild(li);
            });

            // projekty
            data.projects.forEach(project => {
                const li = document.createElement('li');
                li.innerHTML = project;
                projectsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Błąd podczas pobierania danych z JSON:', error);
        });
});
// --- Zadanie 7: Local Storage ---
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

// Pobieranie notatek z LocalStorage
function getNotes() {
    const notes = localStorage.getItem('cv_notes');
    return notes ? JSON.parse(notes) : [];
}

// Zapisywanie do LocalStorage
function saveNotes(notes) {
    localStorage.setItem('cv_notes', JSON.stringify(notes));
}

// Wyświetlanie notatek
function renderNotes() {
    notesList.innerHTML = '';
    const notes = getNotes();
    
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;
        
        // Przycisk usuwania
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteNote(index);
        
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

// Zadanie 7
addNoteBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (text !== '') {
        const notes = getNotes();
        notes.push(text); 
        saveNotes(notes); 
        noteInput.value = ''; 
        renderNotes();   
    }
});

// Obsługa usuwania elementu
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1); 
    saveNotes(notes);  
    renderNotes();    
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotes(); 
});
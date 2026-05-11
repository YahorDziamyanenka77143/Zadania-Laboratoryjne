/* Autor: Yahor Dziamyanenka | Nr indeksu: 77143 */

// ZADANIE 4
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

//ZADANIE 5 i 8
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const nameRegex = /^([^0-9]*)$/;

    // Resetowanie błędów
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.getElementById('successMsg').style.display = 'none';

    // Walidacja Imienia и Nazwiska 
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

    // Walidacja Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value)) {
        document.getElementById('emailError').textContent = 'Podaj poprawny adres e-mail';
        isValid = false;
    }

    // Walidacja Wiadomości
    if (document.getElementById('message').value.trim() === '') {
        document.getElementById('messageError').textContent = 'Wiadomość nie może być pusta';
        isValid = false;
    }

    if (isValid) {
        const endpoint = 'https://webhook.site/4175c255-d8f9-4576-af1c-307c2627b075'; 
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = endpoint;
        tempForm.target = '_blank'; 

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

       
        for (const key in formData) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = formData[key];
            tempForm.appendChild(input);
        }

        document.body.appendChild(tempForm);
        tempForm.submit(); 
        document.body.removeChild(tempForm);

        const successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';
        successMsg.textContent = 'Dane zostały wysłane do serwera (POST)!';
        this.reset();
    }
});

//ZADANIE 6
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Błąd JSON');
            return response.json();
        })
        .then(data => {
            const skillsList = document.getElementById('skills-list');
            const projectsList = document.getElementById('projects-list');

            if(skillsList) {
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.innerHTML = skill;
                    skillsList.appendChild(li);
                });
            }

            if(projectsList) {
                data.projects.forEach(project => {
                    const li = document.createElement('li');
                    li.innerHTML = project;
                    projectsList.appendChild(li);
                });
            }
        })
        .catch(err => console.error('Błąd JSON:', err));
});

//ZADANIE 7
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

function getNotes() {
    const notes = localStorage.getItem('cv_notes');
    return notes ? JSON.parse(notes) : [];
}

function renderNotes() {
    if(!notesList) return;
    notesList.innerHTML = '';
    getNotes().forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;
        const btn = document.createElement('button');
        btn.textContent = 'Usuń';
        btn.className = 'delete-btn';
        btn.onclick = () => {
            const notes = getNotes();
            notes.splice(index, 1);
            localStorage.setItem('cv_notes', JSON.stringify(notes));
            renderNotes();
        };
        li.appendChild(btn);
        notesList.appendChild(li);
    });
}

if(addNoteBtn) {
    addNoteBtn.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text !== '') {
            const notes = getNotes();
            notes.push(text);
            localStorage.setItem('cv_notes', JSON.stringify(notes));
            noteInput.value = '';
            renderNotes();
        }
    });
}

document.addEventListener('DOMContentLoaded', renderNotes);
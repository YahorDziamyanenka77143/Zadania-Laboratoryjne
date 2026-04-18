/* Autor: Yahor Dziamyanenka | Nr indeksu: 77143 */
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
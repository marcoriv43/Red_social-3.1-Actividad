function VerificarContraseña() {
    const password = document.querySelector('input[name="password"]').value;
    const password1 = document.querySelector('input[name="password1"]').value;
    if (password !== password1) {
        alert("La contraseña debe coincidir");
        return false;
    }
    return true;
}

document.querySelectorAll('input[name="password1"]:not([name="email"])').forEach(input => {
    input.addEventListener('change', VerificarContraseña);
});
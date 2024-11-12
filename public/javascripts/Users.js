const parametro = new URLSearchParams(window.location.search);
const alerta = parametro.get('alert');

if (alerta!==null) {
    alert(alerta);
}
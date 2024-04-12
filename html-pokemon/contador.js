let infoAcesso = localStorage.getItem("infoAcesso");

if (infoAcesso) {
  infoAcesso = JSON.parse(infoAcesso);
  infoAcesso.contador++;
  infoAcesso.ultimaVisita = new Date();
  localStorage.setItem("infoAcesso", JSON.stringify(infoAcesso));
} else {
  infoAcesso = configuraPrimeiroAcesso(infoAcesso);
}

document.getElementById("vezesVisitada").innerHTML =
  infoAcesso.contador === 1 ? "1 vez" : `${infoAcesso.contador} vezes`;
document.getElementById("ultimaVisita").innerHTML = Intl.DateTimeFormat(
  "pt-BR",
  {
    dateStyle: "short",
    timeStyle: "short",
  }
).format(infoAcesso.ultimaVisita);

function configuraPrimeiroAcesso(infoAcesso) {
  infoAcesso = { contador: 1, ultimaVisita: new Date() };
  localStorage.setItem("infoAcesso", JSON.stringify(infoAcesso));
  return infoAcesso;
}

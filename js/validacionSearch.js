let form = document.querySelector("#form");
let inp = document.querySelector("#validar");
form.addEventListener("submit",function (e) {
    e.preventDefault();
    let valor = inp.value
    
    console.log(valor.length);
    
    if (valor.length < 4) {
        alert("introducir al menos 3 caracteres")
    }else{
        this.submit()
    }
})
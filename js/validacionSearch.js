let form = document.querySelector(".form");
let inp = document.querySelector("#query");
form.addEventListener("submit",function (e) {
    e.preventDefault();
    let valor = inp.value
    
    
    if (valor.length < 3) {
        alert()
    }else{
        this.submit()
    }
})
const mask = {
    time(value) {
        return value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1h$2")
    },

    date(value) {
        return value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d{1})/, "$1/$2")
            .replace(/^(\d{2})[/](\d{2})(\d{1})/, "$1/$2/$3")
    }
}
    
var inputs = document.querySelectorAll(".input")
var errSpan = document.querySelectorAll(".errorSpan")

function setError(i, texto){
    inputs[i].style.backgroundColor = "rgb(255, 170, 170)"
    inputs[i].style.border = "1px solid rgb(255, 0, 0)"
    
    errSpan[i].innerHTML = texto
    errSpan[i].style.display = "block"
}

function removeError(i){
    inputs[i].style.backgroundColor = "#fff"
    inputs[i].style.border = "none"
    
    errSpan[i].innerHTML = ""
    errSpan[i].style.display = "none"
}

function validarNome() {
    if (inputs[0].value.length < 1){
        setError(0, "Minimo de 1 caracter")
        return false
    }
    else {
        removeError(0)
        return true
    }
}

function validarDiretor() {
    if (inputs[1].value.length < 3){
        setError(1, "Minimo de 3 caracter")
        return false
    }
    else {
        removeError(1)
        return true
    }
}

function validarEditora() {
    if (inputs[2].value.length < 3){
        setError(2, "Minimo de 3 caracter")
        return false
    }
    else {
        removeError(2)
        return true
    }
}

function validarLancamento() {
    var date = inputs[3]
    date.value = mask.date(date.value)
    
    if (date.value.length < 8){
        setError(3, "Digite uma data válida")
        return false
    }
    else {
        removeError(3)
        return true
    }

}

function validarDuracao() {
    var time = inputs[5]
    time.value = mask.time(time.value)

    if (time.value.length < 5){
        setError(5, "Digite um tempo válido")
        return false
    }
    else {
        removeError(5)
        return true
    }
}

function adicionarFilme() {
    if(validarNome() && validarDiretor() && validarEditora() && validarLancamento() && validarDuracao()) {
        const FILME = {
            id: "",
            nome: "",
            diretor: "",
            editora: "",
            lancamento: "",
            genero: "",
            duracao: "",
        }

        FILME.nome = inputs[0].value
        FILME.diretor = inputs[1].value
        FILME.editora = inputs[2].value
        FILME.lancamento = inputs[3].value
        FILME.genero = inputs[4].value
        FILME.duracao = inputs[5].value
        
        axios.post("http://localhost:3333/filmes", FILME).then(() => {
            console.log("Sucesso!")
        }).catch((err) => {
            console.log("ERRO:" + err)
        })
    }
    else {
        console.log("FORM INVALIDO")
    }
}

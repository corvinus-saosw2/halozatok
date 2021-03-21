
window.onload = function () {

    let hova = document.getElementById("dv");
    hova.innerHTML = "";
    hova.classList.add("melle");

    for (var s = 0; s < 10; s++) {

        let sor = document.createElement("div");
        hova.appendChild(sor);

        let gomb = document.createElement("button");
        sor.appendChild(gomb);
        gomb.innerText = s + 1;
        gomb.classList.add("doboz");
        gomb.style.backgroundColor = `rgb(${255 / (s + 1)},0,0)`;
        gomb.style.color = "aqua";
    }


    let psc = document.getElementById("pascal");


    

    var faktoriális = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktoriális(n - 1)
        }
    }

    for (var sor = 0; sor < 10; sor++) {
        let sdiv = document.createElement("div");
        psc.appendChild(sdiv);
        sdiv.classList.add("melle");


        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            let ebtn = document.createElement("button");
            sdiv.appendChild(ebtn);
            ebtn.innerText = faktoriális(sor) / faktoriális(oszlop) * faktoriális(sor - oszlop);


        }
    }



    



       

    }






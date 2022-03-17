let body = document.querySelector("body");
let headers = [
    "Čas",
    "Činnosti učitele",
    "Činnosti žáků",
    "Komentáře a otázky"
];

let inputs = [

];

function createTable(max = 45) {
    let table = document.createElement("table");
    body.append(table);

    headers.forEach(header => {
        let th = document.createElement("th");
        th.innerHTML = header;
        table.append(th);
    });

    for(let x = 0; x <= max; x+=5) {
        let row = document.createElement("tr");
        for(let y = 0; y < 4; y++) {
            let col = document.createElement("td");
            if(y > 0){
                let input = document.createElement("input");
                input.type = "text";
                input.id = x + "-" + (y-1);
                inputs.push(input);
                col.append(input);
            } else {
                let label = document.createElement("label");
                label.innerHTML = x;
                col.append(label);
            }         
            row.append(col);
        }
        table.append(row);
    }
}

function createInput(id, labelText = id, type = "text") {

    let block = document.createElement("div");
    block.className = "block";

    let label = document.createElement("label");
    label.innerHTML = labelText;

    let input = document.createElement("input");
    input.type = type;
    input.id = id;

    inputs.push(input);

    block.append(label);
    block.append(input);
    body.append(block);

    return input;
}

function save() {
    let json = "{";
    inputs.forEach(element => {
        let property = "\"" + element.id + "\"";
        let value = "\"" + element.value + "\"";
        //console.log(property + ":" + value);
        json += property + ":" + value;
        json += ",";
        //console.log(element);
    });
    json = json.slice(0, -1) + "}";
    //console.log(json);    
    let blob = new Blob([json], {type :"application/json"});
    let a = document.createElement("a");
    a.download = "entry_" + document.getElementById("entry").value + ".json";
    a.href = window.URL.createObjectURL(blob);
    a.click();
}

function space(size = 1) {
    for(let x = 0; x < size; x++) {
        body.append(document.createElement("br"));
    }
}

function reset() {
    inputs.forEach(input => {
        input.value = "";
    });
}

createInput("entry", "Číslo záznamu", "number").value = 1;

space();

createInput("date", "Datum", "date").valueAsDate = new Date();
createInput("class", "Třída");
createInput("hour", "Hodina", "number");
createInput("students", "Přítomno žáků", "number");
createInput("subject", "Vyučovaný předmět");
createInput("teacher", "Jméno vyučujícího");
createInput("theme", "Téma");
createInput("goal", "Cíle hodiny");

space(3);

createTable();

space(3);

createInput("interesting", "Konkrétní situace nebo výroky z hodiny, které Vás zaujaly (citujte):");
createInput("good", "Co na hodině oceňuji:");
createInput("bad", "Co mohlo být jinak:");
createInput("flow", "Rozbor hodiny - průběh a výstupy:");

space(2);

createInput("questions", "Otázky a nejasnosti:");
createInput("suggestions", "Doporučení a návrhy");

space(4);
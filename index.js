const charge = document.querySelectorAll(".charge-btn");

let fineTotal = 0
let csTotal = 0
let jailTotal = 0

// Converts fine string into an int
function getFine(amt) {
    if (isNaN(parseInt(amt.substr(1,2)))) {
        fineAmt = 0
    } else {
        fineAmt = parseInt(amt.substr(1, amt.indexOf(" ")));
    }
    return fineAmt
}

// Converts cs string into int
function getCS(comServ) {
    if (comServ == 0) {
        csAmt = 0
    } else {
        csAmt = parseInt(comServ.substr(0, comServ.indexOf(" ")));
    }
    return csAmt
}

// Converts jail string into int
function getJail(jailTime) {
    if (jailTime == 0) {
        jailAmt = 0
    } else {
        jailAmt = parseInt(jailTime.substr(0, jailTime.indexOf(" ")));
    }
    return jailAmt
}

let j = 0

//Click button and it does stuff
for (i = 0; i < charge.length; i++) {
    charge[i].addEventListener("click", function() {
        // Selects CS String
        if(this.querySelector(".cs")!= null) {
            comServ = (this.querySelector(".cs").innerHTML); 
        } else {
            comServ = 0
        }

        csAmt = getCS(comServ); 

        //Selects Jail String
        if(this.querySelector(".jail") != null) {
            jailTime = (this.querySelector(".jail").innerHTML);
        } else {
            jailTime = 0
        }
        jailAmt = getJail(jailTime);


        // Selects Fine String
        const amt = (this.querySelector(".fine").innerHTML);
        
        fineAmt = getFine(amt)

        csTotal += csAmt
        jailTotal += jailAmt
        fineTotal += fineAmt

        //Adds table rows
        j++
        const table = document.getElementById("table");
        const newRow = table.insertRow(j);

        const violationCell = newRow.insertCell(0)
        const csCell = newRow.insertCell(1)
        const jailCell = newRow.insertCell(2)
        const fineCell = newRow.insertCell(3)
        const deleteCell = newRow.insertCell(4)

        violationCell.innerHTML = this.querySelector(".violation").innerHTML
        csCell.innerHTML = csAmt
        jailCell.innerHTML = jailAmt
        fineCell.innerHTML = "$"+fineAmt
        deleteCell.innerHTML = 'x'

        violationCell.classList.add('violationCell');
        csCell.classList.add('csCell');
        jailCell.classList.add('jailCell');
        fineCell.classList.add('fineCell');
        deleteCell.classList.add('deleteCell');

        const totalcs = document.getElementById("totalcs");
        totalcs.textContent = csTotal + " Tasks"
        
        const totalMonths = document.getElementById("totalMonths");
        totalMonths.textContent = jailTotal + " Months"

        const totalFine = document.getElementById("totalFine");
        totalFine.textContent = "$" + fineTotal

        x()
    });
}


// function to remove rows from table
function x(){
    for(i = 1; i < table.rows.length; i ++) {
        del = table.rows[i].cells[4]
        del.onclick = function() {
            vCell = this.parentElement 

            // Removes cs from total
            csValue = vCell.querySelector('.csCell').innerHTML
            csValue = parseInt(csValue)
            csTotal -= csValue
            totalcs.textContent = csTotal + " Tasks"

            // Removes jail from total
            jailValue = vCell.querySelector('.jailCell').innerHTML
            jailValue = parseInt(jailValue)
            jailTotal -= jailValue
            totalMonths.textContent = jailTotal + " Months"

            // Removes fine from total
            fineValue = vCell.querySelector('.fineCell').innerHTML
            fineValue = fineValue.substr(1, fineValue.length)
            fineTotal -= fineValue
            totalFine.textContent = "$" + fineTotal

            table.deleteRow(vCell.rowIndex)
            j--
        }
    }
}

// Clears everything from table
const clear = document.querySelector(".clear");

clear.addEventListener("click", function(){
    for (i = 0; i < table.rows.length + 1; i++) {
        table.deleteRow(1)
        i = 1

        csTotal = 0
        jailTotal = 0
        fineTotal = 0

        totalcs.textContent = csTotal + " Tasks"
        totalMonths.textContent = jailTotal + " Months"
        totalFine.textContent = "$" + fineTotal

        j--
    }
})

// Copies to clipboard
const copy = document.querySelector('.copy');
const newText = document.createElement('textarea');
document.body.appendChild(newText);

let chargeText = 'Charges: \n'
let chargeArr = []

function arrCount(arr, value) {
    count = 0 
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == value && arr[i].length == value.length) {
            count++
        }
    }
    return count    
}

function subStrParam(count){
    if (count > 9) {
        return 5
    } else {
        return 4
    }
}

function chargeMultiplier(charge) {
    chargeArr.push(charge);
    
    
    if (chargeText.indexOf('\n' + charge) >=0 ){

        arrCount(chargeArr, charge);
        repeatedCharge = charge
        s = subStrParam(count)

        multiCharge = chargeText.substr(chargeText.indexOf('\n' + repeatedCharge), repeatedCharge.length + s); 

        chargeText = chargeText.replace(multiCharge, '\n' + repeatedCharge + ' x' + count);
        
    } else {
        chargeText = chargeText + (charge) + ' x1' + '\n'
    }
    chargeText = chargeText.replace('&gt;', '>')
}

function time(cs, prison) {
    if (prison > 0) {
        prison = prison + cs/2
        return prison + ' Months'
    } else if (cs > 0) {
        return cs + ' Tasks'
    } else {
        return 0
    }
}

copy.onclick = function() {
    for (i = 1; i < table.rows.length; i++) {
        chargeMultiplier(table.rows[i].cells[0].innerHTML);
    }

    sentence = time(csTotal,jailTotal)
    finalText = chargeText + '\nFine: $' + fineTotal + '\n\nSentence: ' + sentence


    newText.value = finalText
    
    newText.select()
    document.execCommand('copy');

    chargeArr =[]
    multiCharge =''
    chargeText ='Charges: \n'
    newText.value = ''
}



// Hides elements when using seach bar
const searchBar = document.forms['search'].querySelector('input');

const violations = document.getElementsByClassName('violation')
const headers = document.getElementsByTagName('h3')
const headers2 = document.getElementsByTagName('h2')
const lines = document.getElementsByTagName('hr')
const padding = document.getElementsByClassName('container-fluid')


searchBar.addEventListener('keyup', function(event){

    const term = event.target.value.toLowerCase();

    Array.from(padding).forEach(function(container) {
        if(term) {
            container.style.paddingTop = '0'
            container.style.paddingBottom ='0'
        } else {
            container.style.paddingTop = '1%'
            container.style.paddingBottom = '1%'
        }
    })

    Array.from(headers).forEach(function(header) {
        if(term) {
            header.style.display ='none'
        } else {
            header.style.display ='block'
        }
    })

    Array.from(headers2).forEach(function(header) {
        if(term) {
            header.style.display ='none'
        } else {
            header.style.display ='block'
        }
    })

    Array.from(lines).forEach(function(line) {
        if(term) {
            line.style.display ='none'
        } else {
            line.style.display ='block'
        }
    })

    const violations = document.getElementsByClassName('violation')

    Array.from(violations).forEach(function(violation){
        const title = violation.textContent;
        if(title.toLowerCase().indexOf(term) != -1){
            violation.parentElement.parentElement.style.display = 'block'
        } else {
            violation.parentElement.parentElement.style.display = 'none'
            
        }
    })
})


// Clears the search bar
const input = document.querySelector('input')

input.onfocus = function(){
    this.value = ''

    Array.from(violations).forEach(function(violation){
        violation.parentElement.parentElement.style.display = 'block'
    })

    Array.from(padding).forEach(function(container) {
        container.style.paddingTop = '1%'
        container.style.paddingBottom = '1%'
    })

    Array.from(headers).forEach(function(header) {
        header.style.display ='block'
    })

    Array.from(headers2).forEach(function(header) {
        header.style.display ='block'
    })

    Array.from(lines).forEach(function(line) {
        line.style.display = 'block'
    })
} 
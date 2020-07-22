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

function getAddOn (addOnTime) {
    if (addOnTime == 0) {
        addAmt = 0
    } else {
        addAmt = parseInt(addOnTime.substr(1, addOnTime.length));
    }
    return addAmt
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


        //Selects Addon String
        if(this.querySelector(".addon") != null) {
            addOnTime = (this.querySelector('.addon').innerHTML);
        } else {
            addOnTime = 0
        }

        addOnAmt = getAddOn(addOnTime)

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

        const attemptCell = newRow.insertCell(0);
        const violationCell = newRow.insertCell(1);
        const addOnCell = newRow.insertCell(2);
        const gunCell = newRow.insertCell(3)        
        const csCell = newRow.insertCell(4);
        const jailCell = newRow.insertCell(5);
        const fineCell = newRow.insertCell(6);
        const xCell = newRow.insertCell(7);

        attemptCell.innerHTML = '<input type="checkbox" class="attempted"></input>'
        violationCell.innerHTML = this.querySelector(".violation").innerHTML

        if(this.querySelector('.not-lenient')) {
            violationCell.classList.add('notlenient-font')
        }

        addOnCell.innerHTML = `<input type="checkbox" class="addonCharge" value="${addOnAmt}" value2="${csAmt}" value3="${jailAmt}"></input>`

        if(this.classList.contains("revoke")) {
            gunCell.innerHTML = "Revoke"
        } else {
            gunCell.innerHTML = "Keep"
        }

        if(this.classList.contains("use-revoke")) {
            gunCell.innerHTML = "Revoke If Used"
        }
        
        if(this.classList.contains("aiding") || this.classList.contains("judge") || this.classList.contains("warden") || this.classList.contains("hold") || this.classList.contains("deport")) {
            for (i = 0; i < 3; i++) {
                newRow.deleteCell(4);
            } if(this.classList.contains("aiding")) {
                aidingCell = newRow.insertCell(4);
                aidingCell.setAttribute('colspan', 3);
                aidingCell.innerHTML = "100% Time/Fine of Associated Charge"
            } else if(this.classList.contains("judge")) {
                judgeCell = newRow.insertCell(4);
                judgeCell.setAttribute('colspan', 3);
                judgeCell.innerHTML = "Sentencing at Discretion of Judge"
            } else if(this.classList.contains("warden")) {
                wardenCell = newRow.insertCell(4);
                wardenCell.setAttribute('colspan',3);
                wardenCell.innerHTML = "Sentencing at Discretion of Warden"
            } else if(this.classList.contains("hold")) {
                holdCell = newRow.insertCell(4);
                holdCell.setAttribute('colspan', 3);
                holdCell.innerHTML = "Hold Until Trial"
            } else if(this.classList.contains("deport")) {
                deportCell = newRow.insertCell(4);
                deportCell.setAttribute('colspan', 3);
                deportCell.innerHTML = "Permanent Deportation"
            }
        } else {
            csCell.innerHTML = csAmt
            jailCell.innerHTML = jailAmt
            fineCell.innerHTML = "$"+fineAmt
        }
        
        xCell.innerHTML = 'x'

        
        addOnCell.classList.add('addOnCell');
        violationCell.classList.add('violationCell');
        attemptCell.classList.add('attemptCell');
        gunCell.classList.add('gunCell')
        csCell.classList.add('csCell');
        jailCell.classList.add('jailCell');
        fineCell.classList.add('fineCell');
        xCell.classList.add('xCell');
        

        const totalcs = document.getElementById("totalcs");
        totalcs.textContent = csTotal + " Tasks"
        
        const totalMonths = document.getElementById("totalMonths");
        totalMonths.textContent = jailTotal + " Months"

        const totalFine = document.getElementById("totalFine");
        totalFine.textContent = "$" + fineTotal

        x()
        addAtt()
        addOnCharge()
    });
}


//function to create add on charge
function addOnCharge() {
    for(i = 1; i < table.rows.length; i++){
        addOn = table.rows[i].cells[2].firstChild
        
        addOn.onchange = function() {
            adCell = this.parentElement.parentElement

            if (this.checked) {
                if(adCell.querySelector('.csCell') != null) {
                    addOnCS = adCell.querySelector('.csCell').innerHTML
                    addOnJail = adCell.querySelector('.jailCell').innerHTML
                    attempt = adCell.querySelector('.attempted')
                    
                    addOnValue = this.getAttribute("value")
                    csValue = this.getAttribute("value2")
                    jailValue = this.getAttribute("value3")
                    
                    if (attempt.checked && addOnCS != 0) {
                        adCell.querySelector('.csCell').innerHTML = addOnValue/2
                        csTotal -= (csValue-addOnValue)/2
                        totalcs.textContent = csTotal + " Tasks"
                    } else if (attempt.checked == false && addOnCS != 0) {
                        adCell.querySelector('.csCell').innerHTML = addOnValue
                        csTotal -= (csValue-addOnValue)
                        totalcs.textContent = csTotal + " Tasks"    
                    } else if (attempt.checked && addOnJail != 0) {
                        adCell.querySelector('.jailCell').innerHTML = addOnValue/2
                        jailTotal -= (jailValue-addOnValue)/2
                        totalMonths.textContent = jailTotal + " Months"
                    } else {
                        adCell.querySelector('.jailCell').innerHTML = addOnValue
                        jailTotal -= (jailValue-addOnValue)
                        totalMonths.textContent = jailTotal + " Months"
                    }
                }
            //updates the table when unchecking
            } else {
                if(adCell.querySelector('.csCell') != null) {
                    addOnCS = adCell.querySelector('.csCell').innerHTML
                    addOnJail = adCell.querySelector('.jailCell').innerHTML
                    attempt = adCell.querySelector('.attempted')
                    
                    addOnValue = this.getAttribute("value")
                    csValue = this.getAttribute("value2")
                    jailValue = this.getAttribute("value3")
    
                    if (attempt.checked && addOnCS != 0) {
                        adCell.querySelector('.csCell').innerHTML = csValue/2
                        csTotal += (csValue-addOnValue)/2
                        totalcs.textContent = csTotal + " Tasks"
                    } else if (attempt.checked == false && addOnCS !=0) {
                        adCell.querySelector('.csCell').innerHTML = csValue
                        csTotal += (csValue-addOnValue)
                        totalcs.textContent = csTotal + " Tasks"
                    } else if (attempt.checked && addOnJail !=0) {
                        adCell.querySelector('.jailCell').innerHTML = jailValue/2
                        jailTotal += (jailValue-addOnValue)/2
                        totalMonths.textContent = jailTotal + " Months"
                    } else {                        
                        adCell.querySelector('.jailCell').innerHTML = jailValue
                        jailTotal += (jailValue-addOnValue)
                        totalMonths.textContent = jailTotal + " Months"
                    }
                }
            }
        }
    }
} 

//function to add attempted charge
function addAtt() {
    for(i = 1; i < table.rows.length; i++){
        add = table.rows[i].cells[0].firstChild
        
        add.onchange = function() {
            aCell = this.parentElement.parentElement
            
            if (this.checked) {
                if(aCell.querySelector('.csCell') != null) {
                    jailTable = aCell.querySelector('.jailCell').innerHTML
                    csTable = aCell.querySelector('.csCell').innerHTML
                    fineTable = aCell.querySelector('.fineCell').innerHTML.replace('$','')
                    violation = aCell.querySelector('.violationCell').innerHTML
    
                    //halves jailtime and updates table
                    halfJail = parseInt(jailTable)/2 
                    aCell.querySelector('.jailCell').innerHTML = halfJail
                    
                    //halves cs and updates table
                    halfCs = parseInt(csTable)/2
                    aCell.querySelector('.csCell').innerHTML = halfCs
    
                    //halves fine and updates table
                    halfFine = parseInt(fineTable)/2
                    aCell.querySelector('.fineCell').innerHTML = '$' + halfFine
                    
                    //updates the total
                    jailTotal -= halfJail
                    totalMonths.textContent = jailTotal + " Months"
                    
                    csTotal-= halfCs
                    totalcs.textContent = csTotal + " Tasks"
    
                    fineTotal -= halfFine
                    totalFine.textContent = '$' + fineTotal
    
                    aCell.querySelector('.violationCell').innerHTML = "Attempted " + violation
                }

            } else {
                if(aCell.querySelector('.csCell') != null) {
                    jailTable = aCell.querySelector('.jailCell').innerHTML
                    csTable = aCell.querySelector('.csCell').innerHTML
                    fineTable = aCell.querySelector('.fineCell').innerHTML.replace('$','')
                    violation = aCell.querySelector('.violationCell').innerHTML
    
                    //adds back the time if checkbox gets unchecked
                    aCell.querySelector('.jailCell').innerHTML = parseFloat(jailTable)*2
                    aCell.querySelector('.csCell').innerHTML = parseFloat(csTable)*2
                    aCell.querySelector('.fineCell').innerHTML = '$' + parseFloat(fineTable)*2
                    
                    //updates total
                    jailTotal +=parseFloat(jailTable)
                    totalMonths.textContent = jailTotal + " Months"
    
                    csTotal += parseFloat(csTable)
                    totalcs.textContent = csTotal + " Tasks"
    
                    fineTotal += parseFloat(fineTable)
                    totalFine.textContent = '$' + fineTotal
    
                    aCell.querySelector('.violationCell').innerHTML = violation.replace('Attempted ', '')
                }
            }
        }
    }
}

// function to remove rows from table
function x() {
    for(i = 1; i < table.rows.length; i++) {
        lastCell = table.rows[i].cells.length - 1
        del = table.rows[i].cells[lastCell]
        
        del.onclick = function() {
            vCell = this.parentElement


            if(vCell.querySelector('.csCell') != null) {
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
            }

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
        chargeMultiplier(table.rows[i].cells[1].innerHTML);
    }

    sentence = time(csTotal,jailTotal)
    finalText = chargeText + '\nFine: $' + fineTotal + '\n\nSentence: ' + sentence
    finalText = finalText.replace(/&gt;/g, '>')


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

const toggle = document.querySelector(".toggle-btn")
const hover = document.querySelectorAll(".hover-text")

let status = 'on'

toggle.onclick = function() {
    if (status === 'on') {
        Array.from(hover).forEach(function(text) {
            text.style.display = 'none'
        })
        status = 'off'
    } else {
        Array.from(hover).forEach(function(text) {
            text.style.display = 'block'
        })
        status = 'on'
    }
}
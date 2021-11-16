function onPageLoad(){
    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document
        .getElementById("rerollBtn")
        .addEventListener("click", generateVals);
    document
        .getElementById("addBtn")
        .addEventListener("click", addCharacter);
    document
        .getElementById("newCharBtn")
        .addEventListener("click", generateCharacter);
    document
        .getElementById("backBtn")
        .addEventListener("click", goBack);
    for(character of characterList){
        generateCharacterRecord(character);
    }
}

function generateCharacterRecord(character){
    let list = document.getElementById("characterList");
    let record = document.createElement("div");
    record.classList.add("characterRecord");

    let idTD = document.createElement("p");
    idTD.classList.add("id-col");
    idTD.innerHTML = character.id;
    record.appendChild(idTD);

    let nameTD = document.createElement("p");
    nameTD.classList.add("name-col");
    nameTD.innerHTML = character.name;
    record.appendChild(nameTD);

    let raceTD = document.createElement("p");
    raceTD.classList.add("race-col");
    raceTD.innerHTML = character.race;
    record.appendChild(raceTD);

    let classTD = document.createElement("p");
    classTD.classList.add("class-col");
    classTD.innerHTML = character.charClass;
    record.appendChild(classTD);

    let genderTD = document.createElement("p");
    genderTD.classList.add("gender-col");
    genderTD.innerHTML = character.gender;
    record.appendChild(genderTD);

    list.appendChild(record);
}

function goBack(){
    document.forms["characterGen"].reset();
    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document.getElementById("charGenCharList").toggleAttribute("hidden");
    document.getElementById("nameError").innerHTML = "&nbsp;";
    document.getElementById("raceError").innerHTML = "&nbsp;";
    document.getElementById("genderError").innerHTML = "&nbsp;";
    document.getElementById("classError").innerHTML = "&nbsp;";
}

function isValidInput(){
    let validInput = true;
    if(document.getElementById("nameInput").value === ""){
        validInput = false;
        document.getElementById("nameError").innerHTML = "Name is Required";
    }else{
        document.getElementById("nameError").innerHTML = "&nbsp;";
    }
    if(document.getElementById("raceInput").value === ""){
        validInput = false;
        document.getElementById("raceError").innerHTML = "Race is Required";
    }else{
        document.getElementById("raceError").innerHTML = "&nbsp;";
    }
    if( (!document.getElementById("maleInput").checked) && (!document.getElementById("femaleInput").checked)){
        validInput = false;
        document.getElementById("genderError").innerHTML = "Gender is Required";
    }else{
        document.getElementById("genderError").innerHTML = "&nbsp;";
    }
    if(document.getElementById("classInput").value === ""){
        validInput = false;
        document.getElementById("classError").innerHTML = "Class is Required";
    }else{
        document.getElementById("classError").innerHTML = "&nbsp;";
    }
    return validInput;
}

function addCharacter(){
    if(!isValidInput()){
        return;
    }
    createCharacter(
        document.forms["characterGen"].nameInput.value,
        document.forms["characterGen"].raceInput.value,
        (document.forms["characterGen"].maleInput.checked ? "Male" : "Female"),
        document.forms["characterGen"].classInput.value,
        document.forms["characterGen"].isRightHandedInput.checked,
        [
            document.forms["characterGen"].strInput.value,
            document.forms["characterGen"].dexInput.value,
            document.forms["characterGen"].conInput.value,
            document.forms["characterGen"].intInput.value,
            document.forms["characterGen"].wisInput.value,
            document.forms["characterGen"].charInput.value
        ]
    );
    document.forms["characterGen"].reset();
    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document.getElementById("charGenCharList").toggleAttribute("hidden");
}

function generateCharacter(){
    generateVals();
    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document.getElementById("charGenCharList").toggleAttribute("hidden");
}

function generateVals(){
    document
        .forms["characterGen"]
        .strInput.value = getRandomVal();
    document
        .forms["characterGen"]
        .dexInput.value = getRandomVal();
    document
        .forms["characterGen"]
        .conInput.value = getRandomVal();
    document
        .forms["characterGen"]
        .intInput.value = getRandomVal();
    document
        .forms["characterGen"]
        .wisInput.value = getRandomVal();
    document
        .forms["characterGen"]
        .charInput.value = getRandomVal();
}

function getRandomVal(){
   //return (Math.floor(Math.random() * 6)) + (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
   //return (Math.random() + Math.random() + Math.random() * 3 + 1) * 6 + 3;
   return Math.floor((Math.random() * 16) + 3);
}
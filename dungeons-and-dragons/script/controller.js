function onPageLoad(){
    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document.getElementById("updateBtn").toggleAttribute("hidden");
    document
        .getElementById("rerollBtn")
        .addEventListener("click", generateVals);
    document
        .getElementById("addBtn")
        .addEventListener("click", addCharacter);
    document
        .getElementById("newCharBtn")
        .addEventListener("click", onCreateBtnClicked);
    document
        .getElementById("backBtn")
        .addEventListener("click", backToHome);
    generateCharacterList();
}

function backToHome(){
    document.forms["characterGen"].reset();
    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document.getElementById("charGenCharList").toggleAttribute("hidden");
    document.getElementById("nameError").innerHTML = "&nbsp;";
    document.getElementById("raceError").innerHTML = "&nbsp;";
    document.getElementById("genderError").innerHTML = "&nbsp;";
    document.getElementById("classError").innerHTML = "&nbsp;";
}

function onCreateBtnClicked(){
    document.forms["characterGen"].reset();
    generateVals();
    document.querySelector("#charGenEditArea > h2").innerHTML = "New Character";
    document.getElementById("addBtn").hidden = false; //.removeAttribute("hidden");
    document.getElementById("updateBtn").hidden = true;//.setAttribute("hidden", true);
    document.getElementById("rerollBtn").hidden = false;//.removeAttribute("hidden");
    document.getElementById("maleInput").checked = false;//.removeAttribute("checked");
    document.getElementById("femaleInput").checked = false;//.removeAttribute("checked");
    document.getElementById("isRightHandedInput").checked = false;//.removeAttribute("checked");
    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document.getElementById("charGenCharList").toggleAttribute("hidden");
}

function generateCharacterList(){
    let charList = document.getElementById("characterList");
    charList.innerHTML = "";
    for(character of characterList){
        generateCharacterRecord(character);
    }
}

function generateCharacterRecord(character){
    let list = document.getElementById("characterList");
    let record = document.createElement("tr");
    record.classList.add("characterRecord");

    let idTD = document.createElement("td");
    //idTD.classList.add("id-col");
    idTD.innerHTML = character.id;
    record.appendChild(idTD);

    let nameTD = document.createElement("td");
    nameTD.classList.add("name-col");
    nameTD.innerHTML = character.name;
    record.appendChild(nameTD);

    let raceTD = document.createElement("td");
    raceTD.classList.add("race-col");
    raceTD.innerHTML = character.race;
    record.appendChild(raceTD);

    let classTD = document.createElement("td");
    classTD.classList.add("class-col");
    classTD.innerHTML = character.charClass;
    record.appendChild(classTD);

    let genderTD = document.createElement("td");
    genderTD.classList.add("gender-col");
    genderTD.innerHTML = character.gender;
    record.appendChild(genderTD);

    let editButton = document.createElement("button");
    editButton.classList.add("editBtn");
    editButton.innerHTML = "Edit";
    editButton.addEventListener('click', function(){
        onEditBtnClicked(character.id);
    });
    record.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener('click', function(){
        deleteItem(character.id);
        generateCharacterList();
    });
    record.appendChild(deleteButton);

    let actionSec = document.createElement("td");
    actionSec.classList.add("action-col");
    actionSec.appendChild(editButton);
    actionSec.appendChild(deleteButton);
    record.appendChild(actionSec);

    list.appendChild(record);
}

function onEditBtnClicked(id){
    let character = getItemById(id);
    if(character == undefined){
        console.log("Character not found.");
        return;
    }
    document.getElementById("nameError").innerHTML = "&nbsp;";
    document.getElementById("raceError").innerHTML = "&nbsp;";
    document.getElementById("genderError").innerHTML = "&nbsp;";
    document.getElementById("classError").innerHTML = "&nbsp;";
    document.forms["characterGen"].reset();

    document.querySelector("#charGenEditArea > h2").innerHTML = "Update Character";
    document.getElementById("addBtn").hidden = true;
    document.getElementById("updateBtn").hidden = false; //removeAttribute("hidden");
    document.getElementById("rerollBtn").hidden = true;
    
    document.getElementById("nameInput").value = character.name;
    document.getElementById("raceInput").value = character.race;
    document.getElementById("classInput").value = character.charClass;
    document.getElementById("isRightHandedInput").checked = character.isRightHanded; //setAttribute("checked", true);
    if(character.gender == "Male"){
        document.getElementById("maleInput").checked = true;
    }else{
        document.getElementById("femaleInput").checked = true;
    }
    document.getElementById("strInput").value = character.stats[0];
    document.getElementById("dexInput").value = character.stats[1];
    document.getElementById("conInput").value = character.stats[2];
    document.getElementById("intInput").value = character.stats[3];
    document.getElementById("wisInput").value = character.stats[4];
    document.getElementById("charInput").value = character.stats[5];

    document.getElementById("charGenEditArea").toggleAttribute("hidden");
    document.getElementById("charGenCharList").toggleAttribute("hidden");
    document.getElementById("updateBtn").onclick = function(){
        onUpdateBtnClicked(character.id);
    };
}

function onUpdateBtnClicked(id){
    if(!isValidInput()){
        return;
    }
    let character = updateItem(
        id,
        document.forms["characterGen"].nameInput.value,
        document.forms["characterGen"].raceInput.value,
        (document.forms["characterGen"].maleInput.checked ? "Male" : "Female"),
        document.forms["characterGen"].classInput.value,
        document.forms["characterGen"].isRightHandedInput.checked
    );

    if(!character){
        console.log("Unable to update character");
        return;
    }

    generateCharacterList();
    backToHome();
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
    backToHome();
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
   return Math.floor((Math.random() * 16) + 3);
}
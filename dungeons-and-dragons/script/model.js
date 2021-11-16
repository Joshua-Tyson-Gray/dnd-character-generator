let nextCharacterId = 1;
let characterList = [
    new Character("Aramil", "Half-Elf", "Male", "Sorcerer", true, [1, 1, 3, 1, 2, 5]), 
    new Character("Aeos", "Aasimar", "Male", "Palidin", true, [4, 2, 3, 2, 5, 6]), 
    new Character("Zennox", "Aasimar", "Male", "Cleric", false, [2, 1, 4, 3, 5, 6]), 
    new Character("Kamir", "Tiefling", "Male", "Druid", true, [1, 2, 3, 4, 5, 6]),
    new Character("Dalion", "Wood-Elf", "Male", "Fighter", true, [1, 2, 3, 4, 5, 6]),
    new Character("Saylon", "Genasi", "Male", "Ranger", true, [1, 2, 3, 4, 5, 6])
];

function Character(name, race, gender, charClass, isRightHanded, stats){
    this.id = nextCharacterId++;
    this.stats = stats; //str dex con int wis cha
    this.name = name;
    this.gender = gender;
    this.race = race;
    this.charClass = charClass;
    this.isRightHanded = isRightHanded;
}

function createCharacter(name, race, gender, charClass, isRightHanded, stats){
    const newCharacter = new Character(name, race, gender, charClass, isRightHanded, stats);
    characterList.push(newCharacter);
    generateCharacterRecord(newCharacter);
    return newCharacter;
}

function getAllCharacters(){
    return characterList;
}

function getCharacter(id){
    return characterList.find(character => character.id === id);
}
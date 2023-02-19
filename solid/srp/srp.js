class Animal {
  constructor(name) {
    this.name = name
  }

  nomenclature() {
    console.log(`The name of the animal is ${this.name}`)
  }
}

let animal1 = new Animal('Elephant')
animal1.nomenclature() // The name of the animal is Elephant

// Sound class
class Sound {
  constructor(name, soundMade) {
    this.name = name
    this.soundMade = soundMade
  }

  sound() {
    console.log(`${this.name} ${this.soundMade}s`)
  }
}

let animalSound1 = new Sound('Elephant', 'trumpet')
animalSound1.sound() //Elephant trumpets

// Feeding class
class Feeding {
  constructor(name, feedingType) {
    this.name = name
    this.feedingType = feedingType
  }

  feeding() {
    console.log(`${this.name} is a/an ${this.feedingType}`)
  }
}

let animalFeeding1 = new Feeding('Elephant', 'herbivore')
animalFeeding1.feeding() // Elephant is a/an herbivore



// This way, each of the classes is doing only one thing:

// the first one prints the name of the animal
// the second prints the kind of sound it makes
// and the third one prints its kind of feeding.

class Animal {
  constructor(name, feedingType, soundMade) {
    this.name = name
    this.feedingType = feedingType
    this.soundMade = soundMade
  }

  nomenclature() {
    console.log(`The name of the animal is ${this.name}`)
  }

  sound() {
    console.log(`${this.name} ${this.soundMade}s`)
  }

  feeding() {
    console.log(`${this.name} is a ${this.feedingType}`)
  }
}

let elephant = new Animal('Elephant', 'herbivore', 'trumpet')
elephant.nomenclature() // The name of the animal is Elephant
elephant.sound() // Elephant trumpets
elephant.feeding() // Elephant is a herbivore

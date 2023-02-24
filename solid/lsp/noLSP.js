class Bird extends Animal {
  fly() {
    console.log(`${this.name} flaps wings`)
  }
}

const parrot = new Bird('Titi the Parrot')
makeAnimalSound(parrot) // Titi the Parrot makes a sound
parrot.fly() // Titi the Parrot flaps wings

//   The Bird class violates the Liskov substitution principle because it’s not implementing its own makeSound from the parent Animal class. Instead, it’s inheriting the generic sound.

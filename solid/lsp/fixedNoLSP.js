class Bird extends Animal {
    makeSound() {
      console.log(`${this.name} chirps`);
    }
  
    fly() {
      console.log(`${this.name} flaps wings`);
    }
  }
  
  const parrot = new Bird('Titi the Parrot');
  makeAnimalSound(parrot); // Titi the Parrot chirps
  parrot.fly(); // Titi the Parrot flaps wings
  
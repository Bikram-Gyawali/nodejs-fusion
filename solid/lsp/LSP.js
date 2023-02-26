// The Liskov substitution principle is one of the most important principles to adhere to in object-oriented programming (OOP). It was introduced by the computer scientist Barbara Liskov in 1987 in a paper she co-authored with Jeannette Wing.

// The principle states that child classes or subclasses must be substitutable for their parent classes or super classes. In other words, the child class must be able to replace the parent class. This has the advantage of letting you know what to expect from your code.


class Animal {
    constructor(name) {
      this.name = name;
    }
  
    makeSound() {
      console.log(`${this.name} makes a sound`);
    }
  }
  
  class Dog extends Animal {
    makeSound() {
      console.log(`${this.name} barks`);
    }
  }
  
  class Cat extends Animal {
    makeSound() {
      console.log(`${this.name} meows`);
    }
  }
  
  function makeAnimalSound(animal) {
    animal.makeSound();
  }
  
  const cheetah = new Animal('Cheetah');
  makeAnimalSound(cheetah); // Cheetah makes a sound

  
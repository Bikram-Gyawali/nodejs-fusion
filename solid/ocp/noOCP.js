class Animal {
  constructor(name, age, type) {
    this.name = name
    this.age = age
    this.type = type
  }

  getSpeed() {
    switch (this.type) {
      case 'cheetah':
        console.log('Cheetah runs up to 130mph ')
        break
      case 'lion':
        console.log('Lion runs up to 80mph')
        break
      case 'elephant':
        console.log('Elephant runs up to 40mph')
        break
      default:
        throw new Error(`Unsupported animal type: ${this.type}`)
    }
  }
}

const animal1 = new Animal('Lion', 4, 'lion')
animal1.getSpeed() // Lion runs up to 80mph


// This principle might seem to contradict itself, but you can still make sense of it in code. It means you should be able to extend the functionality of a class, module, or function by adding more code without modifying the existing code.


// The code above violates the open-closed principle because if you want to add a new animal type, you have to modify the existing code by adding another case to the switch statement.
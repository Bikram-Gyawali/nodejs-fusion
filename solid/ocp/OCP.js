class Animal {
  constructor(name, age, speedRate) {
    this.name = name
    this.age = age
    this.speedRate = speedRate
  }

  getSpeed() {
    return this.speedRate.getSpeed()
  }
}

class SpeedRate {
  getSpeed() {}
}

class CheetahSpeedRate extends SpeedRate {
  getSpeed() {
    return 130
  }
}

class LionSpeedRate extends SpeedRate {
  getSpeed() {
    return 80
  }
}

class ElephantSpeedRate extends SpeedRate {
  getSpeed() {
    return 40
  }
}

const cheetah = new Animal('Cheetah', 4, new CheetahSpeedRate())
console.log(`${cheetah.name} runs up to ${cheetah.getSpeed()} mph`) // Cheetah runs up to 130 mph

const lion = new Animal('Lion', 5, new LionSpeedRate())
console.log(`${lion.name} runs up to ${lion.getSpeed()} mph`) // Lion runs up to 80 mph

const elephant = new Animal('Elephant', 10, new ElephantSpeedRate())
console.log(`${elephant.name} runs up to ${elephant.getSpeed()} mph`) // Elephant runs up to 40 mph

function log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
      console.log(`Method ${propertyKey} called with arguments: ${args}`);
      const result = originalMethod.apply(this, args);
      console.log(`Method ${propertyKey} returned: ${result}`);
      return result;
    };
    return descriptor;
}
  
class Calculator {
@log
add(a, b) {
    return a + b;
}
}
  
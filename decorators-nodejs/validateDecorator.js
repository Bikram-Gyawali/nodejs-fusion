function validate(validationFn) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (!validationFn(args)) {
                throw new Error(`Invalid arguments for method ${propertyKey}`);
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}

class ShoppingCart {
    @validate(args => args.every(arg => typeof arg === 'string'))
    addItem(...items) {
        // Logic to add items to the cart
    }
}

function deprecated(message) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.warn(`Method ${propertyKey} is deprecated: ${message}`);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}

class LegacyAPI {
    @deprecated('This method is no longer supported. Please use the updated API.')
    oldMethod() {
        // Legacy code implementation
    }
}

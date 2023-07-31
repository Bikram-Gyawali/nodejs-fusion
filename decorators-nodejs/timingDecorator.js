function timing(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`Method ${propertyKey} took ${end - start}ms to execute`);
        return result;
    };
    return descriptor;
}

class DataProcessor {
    @timing
    process(data) {
        // Data processing logic
    }
}

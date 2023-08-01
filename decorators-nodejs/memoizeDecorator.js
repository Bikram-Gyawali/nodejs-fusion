function memoize(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const cache = new Map();
    descriptor.value = function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    };
    return descriptor;
}

class MathLibrary {
    @memoize
    factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * this.factorial(n - 1);
    }
}

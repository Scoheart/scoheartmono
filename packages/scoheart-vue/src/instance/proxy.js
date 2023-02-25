export function proxy(object, sourceKey, key) {
    Object.defineProperty(object, key, {
        enumerable: true,
        configurable: true,
        get() {
            return object[sourceKey][key];
        },
        set(newValue) {
            object[sourceKey][key] = newValue;
        },
    });
}


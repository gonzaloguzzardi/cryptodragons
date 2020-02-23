module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "__dirname": false,
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018
    },
    "plugins": [
    ],
    "rules": {
    }
};
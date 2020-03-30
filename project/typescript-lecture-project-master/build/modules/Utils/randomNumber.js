"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}
exports.randomNumber = randomNumber;

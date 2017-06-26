"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Portfolio = (function () {
    function Portfolio(id, 
        // public name: string,
        imageUrl, 
        // public currentStock: number,
        // public dateEntered: string,
        imageStorageRef) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.imageStorageRef = imageStorageRef;
    }
    return Portfolio;
}());
exports.Portfolio = Portfolio;
//# sourceMappingURL=portfolio.js.map
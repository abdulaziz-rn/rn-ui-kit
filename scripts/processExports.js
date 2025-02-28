const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Add proper exports handling
    const processedContent = `
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        ${content}
    `;
    
    fs.writeFileSync(filePath, processedContent);
}

module.exports = processFile;
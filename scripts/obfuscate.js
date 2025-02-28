const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Files to exclude from obfuscation
const EXCLUDED_FILES = [
    'index.js',
    'SanarKit.js'
];

function obfuscateFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: false,
        splitStrings: false,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        transformObjectKeys: false,
        unicodeEscapeSequence: false,
        reservedStrings: [],
        reservedNames: [],
        domainLock: [],
        sourceMap: false,
        inputFileName: '',
        outputFileName: '',
        seed: 0,
        target: 'browser',
        ignoreRequireImports: true,
        requiredModules: true
    });

    fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (
            file.endsWith('.js') && 
            !file.endsWith('.d.js') && 
            !EXCLUDED_FILES.includes(file)
        ) {
            obfuscateFile(filePath);
        }
    });
}

// Start obfuscation process
processDirectory('./lib');
console.log('Code obfuscation completed!');
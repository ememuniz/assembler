import { Parser, CommandType } from './Parser';
import { Code } from './Code';
import { SymbolTable } from './SymbolTable';
import * as fs from 'fs';
import * as path from 'path';

function main() {
    // Pega o nome do arquivo passado via terminal
    const inputFile = process.argv[2]; 
    if (!inputFile || !inputFile.endsWith('.asm')) {
        console.error("Uso correto: npm start <arquivo.asm>");
        return;
    }

    const parser = new Parser(inputFile);
    const symbolTable = new SymbolTable();

    // ============================================
    // PRIMEIRA PASSADA: Registrar apenas Labels
    // ============================================
    let romAddress = 0; // Contador da memória ROM
    while (parser.hasMoreCommands()) {
        parser.advance();
        if (parser.commandType() === CommandType.L_COMMAND) {
            const label = parser.symbol();
            symbolTable.addEntry(label, romAddress);
            // IMPORTANTE: Labels não geram código de máquina, então romAddress NÃO é incrementado.
        } else {
            romAddress++; // Instruções A e C geram código ocupando 1 linha.
        }
    }

    // ============================================
    // SEGUNDA PASSADA: Geração do Código Binário
    // ============================================
    parser.reset(); // Volta pro início do arquivo
    let outputBinary = "";

    while (parser.hasMoreCommands()) {
        parser.advance();
        const type = parser.commandType();

        if (type === CommandType.A_COMMAND) {
            const symbol = parser.symbol();
            let address: number;

            // Checa se o símbolo é um número (ex: @100)
            if (!isNaN(Number(symbol))) {
                address = Number(symbol);
            } else {
                // Se for texto (rótulo ou variável), pede para a tabela resolver
                address = symbolTable.resolveVariable(symbol);
            }

            // Converte o número para binário de 16 bits
            const binaryAddress = address.toString(2).padStart(15, '0');
            outputBinary += `0${binaryAddress}\n`; // Bit mais significativo é 0 para A-instruction
        } 
        else if (type === CommandType.C_COMMAND) {
            const destBinary = Code.dest(parser.dest());
            const compBinary = Code.comp(parser.comp());
            const jumpBinary = Code.jump(parser.jump());

            // 111 (prefixo fixo) + comp (7 bits) + dest (3 bits) + jump (3 bits)
            const instruction = `111${compBinary}${destBinary}${jumpBinary}`;
            outputBinary += `${instruction}\n`;
        }
        // Se for L_COMMAND, simplesmente ignora na segunda passada.
    }

    // Salva o arquivo final .hack
    const outputFile = inputFile.replace('.asm', '.hack');
    fs.writeFileSync(outputFile, outputBinary.trim());
    console.log(`Montagem concluída! Arquivo salvo em: ${outputFile}`);
}

main();
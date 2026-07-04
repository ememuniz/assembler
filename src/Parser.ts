// O Parser lê o arquivo, remove espaços, tira comentários (aquilo que começa com //) e separa os pedaços das instruções

import * as fs from 'fs'; // Módulo do Node para ler arquivos

export enum CommandType {
    A_COMMAND, // Instruções do tipo @valor
    C_COMMAND, // Instruções do tipo dest=comp;jump
    L_COMMAND  // Pseudo-instruções do tipo (LABEL)
}

export class Parser {
    private lines: string[] = [];   // Array para armazenar as linhas
    private currentLineIndex: number = 0;  // Indice da linha atual
    private currentInstruction: string = ""; // Instrução atual

    
    constructor(filePath: string) {
        // Lê o arquivo todo como texto
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Separa por quebra de linhas e limpa o arquivo (tira comentários e espaços)
        this.lines = fileContent.split(/\r?\n/)
            .map(line => (line.split('//')[0] || '').trim()) // Remove o que vem depois de // e corta os espaços
            .filter(line => line.length > 0);        // Remove linhas vazias
    }

    public hasMoreCommands(): boolean {
        return this.currentLineIndex < this.lines.length;
    }   // Verifica se ainda há linhas para ler

    public advance(): void {
        this.currentInstruction = this.lines[this.currentLineIndex]!;
        this.currentLineIndex++;
    }   // Avançar para a próxima linha

    public commandType(): CommandType {
        if (this.currentInstruction.startsWith('@')) return CommandType.A_COMMAND;
        if (this.currentInstruction.startsWith('(')) return CommandType.L_COMMAND;
        return CommandType.C_COMMAND;
    }   // Verifica o tipo da instrução

    // Pega o valor sem o @ ou os parênteses
    public symbol(): string {
        if (this.commandType() === CommandType.A_COMMAND) {
            return this.currentInstruction.substring(1); // Ex: @100 -> 100
        }
        if (this.commandType() === CommandType.L_COMMAND) {
            return this.currentInstruction.slice(1, -1); // Ex: (LOOP) -> LOOP
        }
        return "";
    }
    
    public dest(): string {
        if (this.currentInstruction.includes('=')) {
            return this.currentInstruction.split('=')[0]!;
        }
        return "";
    }   
    // Pega a parte do dest da instrução, se houver, no caso só se for uma instrução do tipo C_COMMAND. Exemplo: D=M+1;JGT -> D
    // Exemplo: D=M+1;JGT -> D

    public comp(): string {
        let compPart = this.currentInstruction;
        if (compPart.includes('=')) {
            compPart = compPart.split('=')[1]!;     // Ex: D=M+1;JGT -> M+1;JGT
        }
        if (compPart.includes(';')) {
            compPart = compPart.split(';')[0]!;     // Ex: M+1;JGT -> M+1
        }
        return compPart;                            // Ex: M+1
    }
    // Pega a parte do comp da instrução, se houver, no caso só se for uma instrução do tipo C_COMMAND. Exemplo: D=M+1;JGT -> M+1
    // Exemplo: D=M+1;JGT -> M+1

    public jump(): string {
        if (this.currentInstruction.includes(';')) {
            return this.currentInstruction.split(';')[1]!;  // Ex: D=M+1;JGT -> JGT
        }
        return "";
    }
    // Pega a parte do jump da instrução, se houver, no caso só se for uma instrução do tipo C_COMMAND. Exemplo: D=M+1;JGT -> JGT
    // Exemplo: D=M+1;JGT -> JGT
    
    // Método utilitário para reiniciar a leitura na segunda passada
    public reset(): void {
        this.currentLineIndex = 0;
    }
}
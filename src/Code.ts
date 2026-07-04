// Em TypeScript, usamos 'export' para que outros arquivos possam usar esta classe.
export class Code {
    
    // Traduz a parte 'dest' (3 bits)
    public static dest(mnemonic: string | null): string {
        switch (mnemonic) {
            case null: case "": return "000"; // Resultado descartado
            case "M": return "001";           // RAM[A]
            case "D": return "010";           // Registrador D
            case "MD": return "011";          // RAM[A] e Registrador D
            case "A": return "100";           // Registrador A
            case "AM": return "101";          // A e RAM[A]
            case "AD": return "110";          // A e D
            case "AMD": return "111";         // A, D e RAM[A]
            default: return "000";
        }
    }

    // Traduz a parte 'comp' (7 bits) que é a parte que indica a operação a ser realizada com os operandos
    public static comp(mnemonic: string): string {
        // O primeiro bit ('a') decide se usamos A (0) ou M (1)
        switch (mnemonic) {
            case "0": return "0101010";     // indica que o resultado da operação é 0
            case "1": return "0111111";     // indica que o resultado da operação é 1
            case "-1": return "0111010";    // indica que o resultado da operação é -1
            case "D": return "0001100";     // indica que o resultado da operação é igual ao valor do registrador D
            case "A": return "0110000";     // indica que o resultado da operação é igual ao valor do registrador A
            case "M": return "1110000";     // indica que o resultado da operação é igual ao valor da RAM[A]
            case "!D": return "0001101";    // indica que o resultado da operação é igual ao valor do registrador D negado
            case "!A": return "0110001";    // indica que o resultado da operação é igual ao valor do registrador A negado
            case "!M": return "1110001";    // indica que o resultado da operação é igual ao valor da RAM[A] negado
            case "-D": return "0001111";    // indica que o resultado da operação é igual ao valor do registrador D negado
            case "-A": return "0110011";    // indica que o resultado da operação é igual ao valor do registrador A negado
            case "-M": return "1110011";    // indica que o resultado da operação é igual ao valor da RAM[A] negado
            case "D+1": return "0011111";   // indica que o resultado da operação é igual ao valor do registrador D + 1
            case "A+1": return "0110111";   // indica que o resultado da operação é igual ao valor do registrador A + 1
            case "M+1": return "1110111";   // indica que o resultado da operação é igual ao valor da RAM[A] + 1
            case "D-1": return "0001110";   // indica que o resultado da operação é igual ao valor do registrador D - 1
            case "A-1": return "0110010";   // indica que o resultado da operação é igual ao valor do registrador A - 1
            case "M-1": return "1110010";   // indica que o resultado da operação é igual ao valor da RAM[A] - 1
            case "D+A": return "0000010";   // indica que o resultado da operação é igual ao valor do registrador D + o valor do registrador A
            case "D+M": return "1000010";   // indica que o resultado da operação é igual ao valor do registrador D + o valor da RAM[A]
            case "D-A": return "0010011";   // indica que o resultado da operação é igual ao valor do registrador D - o valor do registrador A
            case "D-M": return "1010011";   // indica que o resultado da operação é igual ao valor do registrador D - o valor da RAM[A]
            case "D-A": return "0010011";   // indica que o resultado da operação é igual ao valor do registrador D - o valor do registrador A
            case "D-M": return "1010011";   // indica que o resultado da operação é igual ao valor do registrador D - o valor da RAM[A]
            case "A-D": return "0000111";   // indica que o resultado da operação é igual ao valor do registrador A - o valor do registrador D
            case "M-D": return "1000111";   // indica que o resultado da operação é igual ao valor da RAM[A] - o valor do registrador D
            case "D&A": return "0000000";   // indica que o resultado da operação é  true se o valor do registrador D e o valor do registrador A forem true
            case "D&M": return "1000000";   // indica que o resultado da operação é  true se o valor do registrador D e o valor da RAM[A] forem true
            case "D|A": return "0010101";   // indica que o resultado da operação é  true se o valor do registrador D ou o valor do registrador A forem true
            case "D|M": return "1010101";   // indica que o resultado da operação é  true se o valor do registrador D ou o valor da RAM[A] forem true
            default: return "0000000";      // Resultado descartado
        }
    }

    // Traduz a parte 'jump' (3 bits)
    public static jump(mnemonic: string | null): string {
        switch (mnemonic) {
            case null: case "": return "000"; // Nunca salta
            case "JGT": return "001";         // Salta se o resultado da operação for maior que 0
            case "JEQ": return "010";         // Salta se o resultado da operação for igual a 0
            case "JGE": return "011";         // Salta se o resultado da operação for maior ou igual a 0
            case "JLT": return "100";         // Salta se o resultado da operação for menor que 0
            case "JNE": return "101";         // Salta se o resultado da operação for diferente de 0
            case "JLE": return "110";         // Salta se o resultado da operação for menor ou igual a 0
            case "JMP": return "111";         // Salto incondicional
            default: return "000";
        }
    }
}
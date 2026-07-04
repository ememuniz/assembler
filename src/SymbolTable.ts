// Esta classe guarda os símbolos (como R0, SCREEN, rótulos (LOOP) e variáveis). Os símbolos predefinidos têm endereços fixos, e novas variáveis começam a ser alocadas a partir do endereço RAM 16
export class SymbolTable {
    private table: Map<string, number>;
    private nextVariableAddress: number = 16; // Variáveis começam em 16

    constructor() {
        this.table = new Map<string, number>();
        // Símbolos predefinidos da plataforma Hack
        this.table.set("SP", 0);
        this.table.set("LCL", 1);
        this.table.set("ARG", 2);
        this.table.set("THIS", 3);
        this.table.set("THAT", 4);
        this.table.set("SCREEN", 16384);
        this.table.set("KBD", 24576);

        // R0 até R15
        for (let i = 0; i <= 15; i++) {
            this.table.set(`R${i}`, i);
        } // esse for serve para adicionar os registradores R0 a R15 à tabela de símbolos, com seus respectivos endereços de 0 a 15. Os endereços de 5 a 15 são reservados para uso geral, enquanto os endereços de 0 a 4 são usados para ponteiros e variáveis especiais.
    }

    public addEntry(symbol: string, address: number): void {
        this.table.set(symbol, address);
    } // Adiciona um novo símbolo à tabela com o endereço especificado, começando com as variáveis a partir do endereço 16. Se o símbolo já existir, ele será sobrescrito com o novo endereço.

    public contains(symbol: string): boolean {
        return this.table.has(symbol);
    } // Verifica se um símbolo existe na tabela

    public getAddress(symbol: string): number {
        return this.table.get(symbol) as number;
    } // Retorna o endereço associado a um símbolo. Se o símbolo não existir, retornará undefined, mas como usamos 'as number', estamos assumindo que o símbolo sempre existirá quando chamarmos este método.

    // Método extra para facilitar alocação de novas variáveis
    public resolveVariable(symbol: string): number {
        if (!this.contains(symbol)) {
            this.addEntry(symbol, this.nextVariableAddress);
            this.nextVariableAddress++;
        } 
        // Se o símbolo não estiver na tabela, ele é adicionado com o próximo endereço disponível, e o endereço para a próxima variável é incrementado.
        return this.getAddress(symbol);
        // Retorna o endereço associado ao símbolo
    }
}
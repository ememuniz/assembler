# Hack Assembler (Nand2Tetris - Project 6)

Este projeto implementa um montador (assembler) de duas passadas para a plataforma Hack, capaz de traduzir programas em Assembly (`.asm`) para código de máquina binário (`.hack`).

Projeto desenvolvido como requisito de avaliação, seguindo as especificações do Nand2Tetris.

## 👥 Autor
- **Emerson Paulo Pinheiro Muniz** - 20250013523

## 🛠️ Tecnologias Utilizadas
- **Linguagem:** TypeScript (Versão 5.x)
- **Ambiente de Execução:** Node.js
- **Ferramenta de Testes:** Jest

**Justificativa da escolha (Opcional):** A escolha do TypeScript deve-se à sua tipagem estática forte, que previne erros comuns durante a manipulação de strings e conversões binárias necessárias para o projeto. Além disso, a integração com o Jest facilita a criação de testes unitários para validar cada módulo individualmente.

## 🚀 Como Compilar e Executar (Build & Run)

### 1. Pré-requisitos e Instalação das dependências
Certifique-se de que tem o Node.js instalado no seu computador. No terminal, na raiz do diretório do projeto, execute o comando abaixo para instalar as bibliotecas necessárias (TypeScript, Jest, etc.):
```bash
npm install
```
### 2. Executar o Montador
Para traduzir um ficheiro .asm para binário, utilize o comando npm start passando o caminho do ficheiro como argumento:

```Bash
npm start caminho/para/o/ficheiro.asm
```
(Exemplo: npm start Add.asm)

Isto irá gerar um ficheiro .hack com o mesmo nome e no mesmo diretório do ficheiro original.

### 3. Executar os Testes Unitários
Para validar a integridade dos módulos do sistema (Parser, Code e SymbolTable), execute o seguinte comando:

```Bash
npm test
````

## 📁 Estrutura do Projeto
Seguindo as boas práticas, o código foi modularizado da seguinte forma:

`src/Main.ts`: Orquestrador responsável por coordenar a leitura do ficheiro em duas passadas.

`src/Parser.ts`: Módulo que lê o ficheiro de texto, limpa os comentários/espaços e decompõe as instruções.

`src/Code.ts`: Dicionário estático que traduz os mnemónicos (dest, comp, jump) para os seus respetivos valores binários.

`src/SymbolTable.ts`: Tabela Hash (Map) que gere a alocação de memória para rótulos (labels) e novas variáveis.

`tests/`: Diretório contendo os testes unitários da aplicação.


## 📺 Link do Video


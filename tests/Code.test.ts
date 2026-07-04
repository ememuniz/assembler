import { Code } from '../src/Code';

describe('Testes do Módulo Code', () => {
    
    test('Deve traduzir a parte Dest corretamente', () => {
        expect(Code.dest('M')).toBe('001');
        expect(Code.dest('MD')).toBe('011');
        expect(Code.dest('')).toBe('000'); // null/vazio
    });

    test('Deve traduzir a parte Comp corretamente', () => {
        expect(Code.comp('D+1')).toBe('0011111');
        expect(Code.comp('D|M')).toBe('1010101');
    });

    test('Deve traduzir a parte Jump corretamente', () => {
        expect(Code.jump('JMP')).toBe('111');
        expect(Code.jump(null)).toBe('000');
    });
});
// Banco de Dados Vetorial dos Livros Físicos

// Índice Oficial das 26 Manobras (Sempre siga esta ordem nos vetores!):
//  0: TurnLeftSlow         1: HardTurnLeftSlow     2: SlipLeftSlow
//  3: StraightSlow         4: StraightLeftSlow     5: StraightRightSlow
//  6: TurnRightSlow        7: HardTurnRightSlow    8: SlipRightSlow
//  9: TurnLeftCruising     10: HardTurnLeftCruising 11: SlipLeftCruising
// 12: StraightCruising     13: Immelmann           14: BarrelRollLeft
// 15: BarrelRollRight      16: TurnRightCruising   17: HardTurnRightCruising
// 18: SlipRightCruising    19: TurnLeftFast        20: BanksLeftFast
// 21: StraightFast         22: StraightLeftFast    23: StraightRightFast
// 24: TurnRightFast        25: BanksRightFast

export type Faction = 'G' | 'A';

// Vetor com 26 posições exatas. Valores nulos significam que a manobra ainda não foi mapeada.
export type PageData = (number | null)[];

export const bookData: Record<Faction, Record<number, PageData>> = {
  G: {
    // Números reais impressos na parte inferior das páginas do livro Alemão
    10: [91, 147, 132, 10, 42, 11, 34, 40, 81, 107, 82, 125, 102, 61, 126, 103, 41, 51, 80, 120, 119, 157, 151, 163, 100, 90],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    18: [],
    19: [],
    20: [34, 12, 14, 20, 21, 19, 30, 22, 25, 209, 198, 101, 188, 187, 4, 6, 213, 205, 105, 33, 90, 5, 32, 28, 29, 45],
    62: [41, 11, 13, 62, 51, 72, 94, 23, 26, 27, 10, 40, 20, 16, 21, 19, 18, 24, 106, 34, 100, 188, 209, 213, 30, 104],
    64: [177, 145, 130, 64, 171, 35, 26, 20, 16, 43, 92, 223, 53, 94, 124, 10, 63, 72, 198, 118, 223, 42, 91, 52, 27, 209],
    170: [223, 223, 223, 170, 223, 64, 73, 72, 43, 177, 201, 223, 171, 219, 223, 53, 138, 114, 35, 223, 223, 124, 118, 130, 63, 26],
    171: [223, 223, 223, 171, 223, 53, 63, 62, 91, 118, 145, 223, 124, 139, 223, 42, 130, 133, 10, 223, 223, 125, 119, 131, 52, 27],
  },
  A: {
    // Números reais impressos na parte inferior das páginas do livro Aliado
    10: [33, 6, 17, 10, 11, 35, 3, 8, 26, 209, 188, 80, 198, 213, 12, 36, 187, 205, 74, 32, 68, 31, 25, 1, 2, 86],
    20: [14, 22, 34, 20, 21, 19, 25, 12, 30, 213, 205, 101, 188, 187, 4, 6, 209, 198, 105, 28, 99, 5, 29, 33, 32, 47],
    62: [39, 9, 27, 62, 51, 72, 84, 31, 18, 13, 8, 40, 20, 2, 21, 19, 26, 36, 106, 14, 98, 188, 213, 209, 25, 108],
    64: [27, 20, 2, 64, 35, 169, 148, 123, 138, 63, 51, 198, 74, 39, 36, 144, 86, 97, 223, 26, 209, 85, 73, 96, 117, 223],
    170: [52, 51, 86, 170, 64, 223, 223, 223, 223, 130, 166, 35, 169, 160, 74, 223, 148, 154, 223, 63, 27, 144, 138, 117, 223, 223],
    171: [41, 21, 3, 171, 53, 170, 149, 154, 130, 52, 40, 10, 64, 98, 35, 169, 75, 87, 223, 27, 34, 74, 63, 86, 148, 223],
  }
};

// --- SISTEMA DE DANOS ---
// Define quanto dano cada aeronave recebe ao entrar em uma página específica.
// G: Dano recebido pelo Alemão | A: Dano recebido pelo Aliado
export interface PageDamage {
  G: number;
  A: number;
}

export const damageData: Record<number, PageDamage> = {
  // Exemplo de preenchimento (ajustar conforme o manual):
  // 170: { G: 0, A: 0 },
  // 171: { G: 2, A: 0 }, // Exemplo: Aliado acertou um tiro de alto impacto no Alemão

  // Páginas iniciais cadastradas (coloquei 0 por enquanto, você pode editar):
  10: { G: 2, A: 0 },
  20: { G: 2, A: 2 },
  62: { G: 1, A: 1 },
  64: { G: 0, A: 0 },
  170: { G: 0, A: 0 },
  171: { G: 0, A: 0 },
};

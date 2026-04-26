# Resumo das Regras: Ace of Aces

Baseado na análise do artigo "All About That Ace" de Geoff Engelstein, aqui estão as regras fundamentais e o funcionamento matemático do jogo original:

## A Mecânica Básica de Turno
1. **Ponto de Partida:** Ambos os jogadores começam o jogo na **Página 170** (um cruzamento frente-a-frente).
2. **Escolha de Manobra:** Na parte inferior da página atual, o jogador escolhe secretamente uma manobra. Embaixo de cada manobra há um número.
3. **Comunicação:** Simultaneamente, cada jogador diz ao oponente o **número** que está embaixo da sua manobra escolhida.
4. **Página Intermediária:** Cada jogador vira o livro para a página que o oponente ditou. 
5. **Página Final:** Nesta nova página intermediária, o jogador procura a manobra que *ele próprio* escolheu inicialmente. O número embaixo dessa manobra será a **Página Final**. Ambos os jogadores acabarão exatamente na mesma página final.

## As 25 Manobras Possíveis
O jogo possui um grid de manobras perfeitamente balanceado em um sistema de 25 movimentos, consistindo em:
- **Movimentos de Direção (3 velocidades cada):** Straight, Turn Left, Turn Right, Hard Turn Left, Hard Turn Right, Slip Left, Slip Right (7 categorias * 3 velocidades = 21 manobras).
- **Manobras Especiais:** Immelmann, Split-S, Barrel Roll Left e Barrel Roll Right (4 manobras).
- Isso compõe a matriz de 25x25 transições que cobrem todas as páginas.

## Sistema de Vantagem ("Tailing")
- Se um piloto conseguir ficar na cauda do oponente, haverá um **'T'** abaixo do número da página atual.
- **A Regra de Tailing:** No próximo turno, o piloto que está em desvantagem (sendo perseguido) é obrigado a anunciar em voz alta se a sua próxima manobra será para a **Esquerda** (Left), **Reto** (Straight) ou **Direita** (Right).
- Só depois desse anúncio é que o piloto em vantagem faz a sua escolha secreta, ganhando uma enorme vantagem tática no turno.

## Dano e Fuga
- O dano é causado quando o jogador chega em uma página onde a ilustração mostra o avião inimigo na sua mira.
- **Página 223:** Se os aviões se distanciarem demais no combate, os jogadores são enviados para a "temida página 223", que representa que o contato visual/alcance foi perdido.

## O Segredo Matemático (Hex Grid e Identidade)
- O jogo é secretamente jogado em um tabuleiro de **37 hexágonos**, sem terreno. Existem 6 posições de rotação possíveis por hexágono (37 * 6 = 222 posições relativas válidas, mais a página 223 de fuga).
- **A Manobra de Identidade:** O "Voo Reto" é a manobra de identidade. O número embaixo da manobra "Reto" é sempre igual ao número da própria página atual. Isso é a chave que impede o colapso da teia matemática do livro.

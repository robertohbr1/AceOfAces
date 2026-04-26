# Ace of Aces - Simulador de Combate Aéreo

Este é um projeto **Open Source** que digitaliza a experiência do clássico jogo de combate aéreo "Ace of Aces". O simulador está em fase de criação, mas já se encontra bem funcional, permitindo a execução de manobras e o combate entre aeronaves.

> [!IMPORTANT]
> O projeto ainda está em desenvolvimento e faltam muitas páginas do livro para serem cadastradas. Se você quiser contribuir, por favor, veja a seção de **ISSUES**!

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/robertohbr1/AceOfAces.git
   ```

2. **Entre na pasta do projeto:**
   ```bash
   cd AceOfAces
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. Abra o navegador no endereço indicado (geralmente `http://localhost:5173`).

## 🕹️ Funcionamento Atual

O jogo simula o duelo entre dois aviões da Primeira Guerra Mundial (como o Fokker Dr.I e o Sopwith Camel).

- **Cockpit Dinâmico:** Você visualiza a posição do inimigo através de uma representação visual baseada nas páginas do livro original.
- **Seleção de Manobras:** Escolha entre diversas manobras (Curvas, Loops, Slips, etc.) no painel de controle.
- **Resolução de Turnos:** O sistema calcula a nova página de visualização baseada na combinação da sua manobra com a do oponente.
- **Sistema de Danos:** Certas páginas resultam em dano para uma ou ambas as aeronaves, reduzindo a integridade (HP).
- **Inteligência Artificial:** O jogo possui uma IA básica que pode ser ativada para controlar o oponente.

## 🛠️ Como Ajudar (Cadastramento de Dados)

O maior desafio atual é o mapeamento das milhares de combinações de páginas do livro original para o formato digital.

**Como você pode ajudar:**
1. Vá até a aba [**Issues**](https://github.com/robertohbr1/AceOfAces/issues) do repositório.
2. Procure por tarefas de "Cadastramento de Páginas" ou "Mapeamento de Danos".
3. Siga as instruções para adicionar novos dados aos arquivos `src/game/book_data.ts` e `src/game/engine.ts`.

Sua ajuda é fundamental para completarmos este simulador!

---
Desenvolvido com React, TypeScript e Vite.

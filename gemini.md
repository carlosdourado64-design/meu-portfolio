# Constituição do Projeto (Gemini)

## Esquemas de Dados (Schemas)
- A definir após a fase de Descoberta.

## Regras Comportamentais
- O assistente atua como o Piloto do Sistema, utilizando a arquitetura A.N.T e o protocolo V.L.A.E.G.
- Priorizar a confiabilidade sobre a velocidade.
- Nunca adivinhar a lógica de negócios.

## Invariantes Arquiteturais
- Arquitetura de 3 Camadas:
  1. Arquitetura (`architecture/`) - POPs.
  2. Navegação (Tomada de Decisão) - Raciocínio lógico e roteamento.
  3. Ferramentas (`tools/`) - Scripts determinísticos.
- Uso da pasta `.tmp/` para operações de arquivos intermediários.

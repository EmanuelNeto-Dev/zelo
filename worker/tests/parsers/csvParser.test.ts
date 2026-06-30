import path from "path";
import { parseCsv } from "../../src/parsers/csvParser";

describe("parseCsv", () => {
  const caminhoFixture = path.join(__dirname, "..", "fixtures", "extrato-teste.csv");

  it("deve retornar o número correto de transações", () => {
    const transacoes = parseCsv(caminhoFixture);
    expect(transacoes).toHaveLength(5);
  });

  it("deve identificar corretamente valores positivos (receitas) e negativos (despesas)", () => {
    const transacoes = parseCsv(caminhoFixture);
    const receita = transacoes.find((t) => t.descricao.includes("SALARIO"));
    const despesa = transacoes.find((t) => t.descricao.includes("NETFLIX"));

    expect(receita?.valor).toBeGreaterThan(0);
    expect(despesa?.valor).toBeLessThan(0);
  });

  it("deve lançar erro para arquivo com colunas não identificáveis", () => {
    expect(() => parseCsv(path.join(__dirname, "..", "fixtures", "inexistente.csv"))).toThrow();
  });
});
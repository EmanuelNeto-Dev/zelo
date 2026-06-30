import path from "path";
import { extrairTextoPdf, extrairLinhasCandidatas } from "../../src/parsers/pdfParser";

describe("pdfParser", () => {
  const caminhoFixture = path.join(__dirname, "..", "fixtures", "extrato-teste.pdf");

  describe("extrairTextoPdf", () => {
    it("deve extrair texto não vazio do PDF", async () => {
      const texto = await extrairTextoPdf(caminhoFixture);
      expect(texto.length).toBeGreaterThan(0);
    });

    it("deve conter ao menos uma descrição conhecida do extrato de teste", async () => {
      const texto = await extrairTextoPdf(caminhoFixture);
      expect(texto).toContain("NETFLIX");
    });
  });

  describe("extrairLinhasCandidatas", () => {
    it("deve identificar linhas que contêm data e valor", async () => {
      const texto = await extrairTextoPdf(caminhoFixture);
      const linhas = extrairLinhasCandidatas(texto);

      expect(linhas.length).toBeGreaterThan(0);
    });

    it("não deve incluir linhas de cabeçalho sem data/valor", async () => {
      const texto = await extrairTextoPdf(caminhoFixture);
      const linhas = extrairLinhasCandidatas(texto);

      const linhaCabecalho = linhas.find((l) => l.includes("EXTRATO BANCÁRIO"));
      expect(linhaCabecalho).toBeUndefined();
    });
  });
});
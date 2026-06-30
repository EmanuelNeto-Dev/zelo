import fs from "fs";
import { PDFParse } from "pdf-parse";
import { TransacaoBruta } from "../types/transaction";

export async function extrairTextoPdf(caminhoArquivo: string): Promise<string> {
  const buffer = fs.readFileSync(caminhoArquivo);
  const parser = new PDFParse({ data: buffer });
  const resultado = await parser.getText();
  return resultado.text;
}

export function extrairLinhasCandidatas(textoPdf: string): string[] {
  const linhas = textoPdf.split("\n").map((l) => l.trim()).filter(Boolean);

  const padraoData = /\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}/;
  const padraoValor = /[\d.,]+\d/;

  return linhas.filter((linha) => padraoData.test(linha) && padraoValor.test(linha));
}
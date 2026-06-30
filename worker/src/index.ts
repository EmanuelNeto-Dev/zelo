import path from "path";
import { parseCsv } from "./parsers/csvParser";
import { extrairTextoPdf, extrairLinhasCandidatas } from "./parsers/pdfParser";

async function main() {
  // Teste CSV
  const caminhoCsv = path.join(__dirname, "..", "tests", "fixtures", "extrato-teste.csv");
  console.log("Lendo CSV:", caminhoCsv);
  const transacoesCsv = parseCsv(caminhoCsv);
  console.log(`\n${transacoesCsv.length} transações (CSV):\n`);
  console.table(transacoesCsv);

  // Teste PDF
  const caminhoPdf = path.join(__dirname, "..", "tests", "fixtures", "extrato-teste.pdf");
  console.log("\nLendo PDF:", caminhoPdf);
  const textoPdf = await extrairTextoPdf(caminhoPdf);
  const linhasCandidatas = extrairLinhasCandidatas(textoPdf);
  console.log(`\n${linhasCandidatas.length} linhas candidatas a transação (PDF):\n`);
  console.log(linhasCandidatas);
}

main();
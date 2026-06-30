import { parse } from "csv-parse/sync";
import fs from "fs";
import { TransacaoBruta } from "../types/transaction";

/**
 * Lê um arquivo CSV de extrato bancário e retorna uma lista de transações brutas.
 *
 * Assume um formato flexível: tenta identificar colunas de data, descrição e valor
 * mesmo que os nomes das colunas variem entre bancos.
 */
export function parseCsv(caminhoArquivo: string): TransacaoBruta[] {
  const conteudo = fs.readFileSync(caminhoArquivo, "utf-8");

  const registros: Record<string, string>[] = parse(conteudo, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return registros.map((registro) => mapearRegistro(registro));
}

function mapearRegistro(registro: Record<string, string>): TransacaoBruta {
  const chaves = Object.keys(registro);

  const chaveData = encontrarChave(chaves, ["data", "date", "dt"]);
  const chaveDescricao = encontrarChave(chaves, [
    "descricao",
    "descrição",
    "description",
    "historico",
    "histórico",
  ]);
  const chaveValor = encontrarChave(chaves, ["valor", "value", "amount"]);

  if (!chaveData || !chaveDescricao || !chaveValor) {
    throw new Error(
      `Não foi possível identificar colunas de data/descrição/valor. Colunas encontradas: ${chaves.join(", ")}`
    );
  }

  return {
    data: registro[chaveData],
    descricao: registro[chaveDescricao],
    valor: normalizarValor(registro[chaveValor]),
  };
}

function encontrarChave(chaves: string[], candidatos: string[]): string | undefined {
  return chaves.find((chave) =>
    candidatos.includes(chave.toLowerCase().trim())
  );
}

function normalizarValor(valorBruto: string): number {
  // Lida com formatos "1.234,56" (BR) e "1234.56" (US)
  const limpo = valorBruto
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3},)/g, "")
    .replace(",", ".");

  const valor = parseFloat(limpo);

  if (isNaN(valor)) {
    throw new Error(`Valor inválido encontrado: "${valorBruto}"`);
  }

  return valor;
}
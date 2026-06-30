export type Perfil = "PF" | "PJ";
export type SubPerfil = "academia" | null;
export type TipoTransacao = "receita" | "despesa";
export type Confianca = "alta" | "media" | "baixa";
export type OrigemCategoria = "comum" | "especifica";

/**
 * Transação bruta, extraída diretamente do CSV ou PDF,
 * antes de passar pela categorização via IA.
 */
export interface TransacaoBruta {
  data: string;
  descricao: string;
  valor: number;
}

/**
 * Transação já categorizada pela IA.
 */
export interface TransacaoCategorizada {
  data: string;
  descricao_original: string;
  descricao_normalizada: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: string;
  origem_categoria: OrigemCategoria;
  confianca: Confianca;
}

export interface ResumoFinanceiro {
  total_receitas: number;
  total_despesas: number;
  saldo: number;
  categoria_maior_gasto: string;
  alertas: string[];
}

/**
 * Estrutura completa retornada pela IA após categorização.
 */
export interface ResultadoCategorizacao {
  perfil: Perfil;
  sub_perfil: SubPerfil;
  transacoes: TransacaoCategorizada[];
  resumo: ResumoFinanceiro;
}
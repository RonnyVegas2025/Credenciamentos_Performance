export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      empresas_clientes: {
        Row: Record<string, unknown>;
      };
      solicitacoes_credenciamento: {
        Row: Record<string, unknown>;
      };
      credenciamentos: {
        Row: Record<string, unknown>;
      };
      credenciamentos_importados: {
        Row: Record<string, unknown>;
      };
      movimentacoes: {
        Row: Record<string, unknown>;
      };
    };
  };
};

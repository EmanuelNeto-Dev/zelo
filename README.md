# Zelo

> Suas finanças organizadas sem precisar fazer nada. Envie o extrato, receba o resumo.

## O problema

Pequenos empresários e autônomos raramente têm tempo (ou interesse) para organizar manualmente o controle financeiro do negócio. A maioria terceiriza, ignora, ou perde visibilidade sobre fluxo de caixa até que algo dê errado.

## A proposta

Zelo elimina a fricção: você envia o extrato (PDF, CSV, ou por canal direto), e recebe automaticamente um resumo claro — gastos por categoria, anomalias, alertas relevantes — sem precisar acessar dashboard nenhum.

## Status do projeto

🚧 Em construção — fase inicial (parsing + categorização via IA).

## Arquitetura (visão geral)

- **Backend (.NET)** — API e orquestração
- **Worker (Node.js)** — processamento assíncrono, integração com IA e canais de entrega
- **Frontend (Angular)** — painel administrativo (uso interno/opcional)
- **IA** — extração e categorização estruturada de transações, geração de insights
- **Banco** — PostgreSQL

Detalhes completos em [`docs/architecture.md`](docs/architecture.md) (em construção).

## Stack

`.NET` `Node.js` `Angular` `PostgreSQL` `IA (LLM / structured output)`

## Roadmap

- [ ] Parsing de extrato (CSV/PDF)
- [ ] Categorização automática via IA
- [ ] Geração de resumo periódico
- [ ] Entrega automática (e-mail/WhatsApp)
- [ ] Painel administrativo
- [ ] Deploy público

---

Construído por [Emanuel Neto](https://github.com/EmanuelNeto-Dev) — Solutions Architect & Tech Lead explorando automação enterprise com IA aplicada.

CREATE TABLE responsaveis (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE abrigos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  capacidade_total INTEGER NOT NULL,
  vagas_disponiveis INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'disponivel',
  responsavel_id INTEGER REFERENCES responsaveis(id),
  atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE familias (
  id SERIAL PRIMARY KEY,
  nome_familia VARCHAR(100) NOT NULL,
  quantidade_pessoas INTEGER NOT NULL,
  abrigo_id INTEGER REFERENCES abrigos(id),
  entrada_em TIMESTAMP DEFAULT NOW()
);
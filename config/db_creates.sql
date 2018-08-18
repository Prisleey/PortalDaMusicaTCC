create schema EstudioMusica;

CREATE TABLE estudiomusica.user (
    id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE estudiomusica.estudio (
    id_estudio INT AUTO_INCREMENT,
    nomeEstudio VARCHAR(100) NOT NULL,
    descricao LONGTEXT NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    rua VARCHAR(100) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_estudio)
);

CREATE TABLE estudiomusica.estudio_horario_funcionamento (
    id_estudio INT,
    horario_inicio VARCHAR(10) NOT NULL,
    horario_fim VARCHAR(10) NOT NULL,
    dias_semana VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_estudio)
        REFERENCES estudiomusica.estudio (id_estudio)
);

CREATE TABLE estudiomusica.sala (
    id_sala INT AUTO_INCREMENT,
    id_estudio INT,
    nome_sala VARCHAR(255) NOT NULL,
    valor_sala DECIMAL(16 , 2 ) NOT NULL,
    equipamento VARCHAR(220) NOT NULL,
    PRIMARY KEY (id_sala),
    FOREIGN KEY (id_estudio)
        REFERENCES estudiomusica.estudio (id_estudio)
);

CREATE TABLE estudiomusica.servico (
    id_servico INT AUTO_INCREMENT,
	id_estudio int,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(16 , 2 ) NOT NULL,
    PRIMARY KEY (id_servico)
);

CREATE TABLE estudiomusica.agendamento (
    id_agendamento INT AUTO_INCREMENT,
    id_estudio INT,
    id_sala INT,
    id_musico INT,
    id_servico INT,
    data_agendamento VARCHAR(255) NOT NULL,
	hora_inicio varchar(255),
	hora_fim varchar(255),
    descricao VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_agendamento),
    FOREIGN KEY (id_estudio)
        REFERENCES estudiomusica.estudio (id_estudio),
    FOREIGN KEY (id_sala)
        REFERENCES estudiomusica.sala (id_sala),
    FOREIGN KEY (id_musico)
        REFERENCES estudiomusica.user (id),
    FOREIGN KEY (id_servico)
        REFERENCES estudiomusica.servico (id_servico)
);
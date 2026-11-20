

-- seed para teste do banco


-- 1. Inserir usuários fictícios
INSERT INTO usuario (nome, email, senha_hash, perfil, telefone)
VALUES
(
    'João da Silva',
    'joao.teste@email.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'TUTOR',
    '11999990001'
),
(
    'Maria Oliveira',
    'maria.teste@email.com',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'TUTOR',
    '11999990002'
);

-- 2. Inserir tutores vinculados aos usuários
INSERT INTO tutor (usuario_id, cpf, endereco)
SELECT id, '12345678901', 'Rua das Flores, 100'
FROM usuario
WHERE email = 'joao.teste@email.com';

INSERT INTO tutor (usuario_id, cpf, endereco)
SELECT id, '98765432100', 'Avenida Brasil, 200'
FROM usuario
WHERE email = 'maria.teste@email.com';

-- 3. Inserir animais vinculados aos tutores
INSERT INTO animal (tutor_id, nome, especie, sexo, raca, data_nascimento, peso, cor_coleira)
SELECT id, 'Thor', 'CAO', 'MACHO', 'Labrador',
       '2022-05-10', 25.50, 'LARANJA'
FROM tutor
WHERE usuario_id = (
    SELECT id FROM usuario WHERE email = 'joao.teste@email.com'
);

INSERT INTO animal (tutor_id, nome, especie, sexo, raca, data_nascimento, peso, cor_coleira)
SELECT id, 'Mel', 'GATO', 'FEMEA', 'Siamês',
       '2023-02-15', 4.20, 'MAGENTA'
FROM tutor
WHERE usuario_id = (
    SELECT id FROM usuario WHERE email = 'joao.teste@email.com'
);

INSERT INTO animal (tutor_id, nome, especie, sexo, raca, data_nascimento, peso, cor_coleira)
SELECT id, 'Bob', 'CAO', 'MACHO', 'Poodle',
       '2021-08-20', 8.00, 'COBALTO'
FROM tutor
WHERE usuario_id = (
    SELECT id FROM usuario WHERE email = 'maria.teste@email.com'
);

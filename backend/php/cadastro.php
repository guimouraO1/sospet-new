<?php

// Configura os cabeçalhos para CORS e tipo de conteúdo
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

// Inclui o arquivo de conexão com o banco de dados
require 'conexao.php';

// Recupera e sanitiza os dados de entrada
$Email = filter_input(INPUT_POST, 'Email', FILTER_SANITIZE_EMAIL);
$ConfirmaEmail = filter_input(INPUT_POST, 'ConfirmaEmail', FILTER_SANITIZE_EMAIL);

$Senha = filter_input(INPUT_POST, 'Senha', FILTER_SANITIZE_STRING);
$ConfirmaSenha = filter_input(INPUT_POST, 'ConfirmaSenha', FILTER_SANITIZE_STRING);

// Verifica se algum campo obrigatório está vazio
if (empty($Email)|| empty($ConfirmaEmail) || empty($Senha) || empty($ConfirmaSenha)) {
    $response = [
        'success' => false,
        'message' => 'Todos os campos são obrigatórios.'
    ];
    echo json_encode($response);
    exit(); // Interrompe a execução se campos obrigatórios estiverem vazios
}

// Verifica se as senhas coincidem
if ($Senha == $ConfirmaSenha) {
    
    // Verifica se o email já existe no banco de dados
    $queryCheckEmail = $conexao->prepare("SELECT COUNT(*) FROM usuario WHERE email = :Email");
    $queryCheckEmail->bindValue(':Email', $Email, PDO::PARAM_STR);
    $queryCheckEmail->execute();
    $emailExists = $queryCheckEmail->fetchColumn();

    if ($emailExists) {
        // O email já existe, lida conforme necessário (por exemplo, retorna uma resposta de erro)
        $response = [
            'success' => false,
            'message' => 'O email já existe no banco de dados.'
        ];
        echo json_encode($response);
    } else {
        // O email é único, continua com o registro do usuário
        $senhaHash = hashSenha($Senha);

        $queryInsertUsuario = $conexao->prepare("
            INSERT INTO usuario (
                id,
                email,
                senha,
            )
            VALUES (
                NULL,
                :Email,
                :Senha,
            )
        ");

        $queryInsertUsuario->bindValue(':Email', $Email, PDO::PARAM_STR);
        $queryInsertUsuario->bindValue(':Senha', $senhaHash, PDO::PARAM_STR);
        $queryInsertUsuario->execute();

        // Retorna uma resposta de sucesso
        $response = [
            'success' => true,
            'message' => 'Usuário cadastrado com sucesso.'
        ];
        echo json_encode($response);
    }
} else {
    // As senhas não coincidem, retorna uma resposta de erro
    $response = [
        'success' => false,
        'message' => 'As senhas não coincidem.'
    ];
    echo json_encode($response);
}

function hashSenha($senha)
{
    $hash = password_hash($senha, PASSWORD_DEFAULT);
    return $hash;
}
?>

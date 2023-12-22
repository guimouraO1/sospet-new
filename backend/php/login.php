<?php

header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

require 'conexao.php';

$Email = $_POST['Email'];
$Senha = $_POST['Senha'];

// Consulta para obter o hash da senha do usuário com base no e-mail fornecido
$querySelectUsuario = $conexao->prepare("
    SELECT senha
    FROM usuario
    WHERE email = :Email
    LIMIT 1
");

$querySelectUsuario->bindValue(':Email', $Email, PDO::PARAM_STR);
$querySelectUsuario->execute();

$usuario = $querySelectUsuario->fetch(PDO::FETCH_ASSOC);

if ($usuario) {
    $senhaHash = $usuario['senha'];
    if (password_verify($Senha, $senhaHash)) {
        // Senha válida
        echo json_encode(['message' => 'Senha válida']);
    } else {
        // Senha inválida
        echo json_encode(['message' => 'Senha inválida']);
    }
} else {
    // Usuário não encontrado
    echo json_encode(['message' => 'Usuário não encontrado']);
}

?>
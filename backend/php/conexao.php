<?php
try
{
    $servidor = "localhost";
    $database = "loginPage";
    $usuario = "root";
    $senha = "";
    
    $conexao = new PDO("mysql:host=$servidor;dbname=$database;charset=utf8", $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
    exit;
}
 
?>
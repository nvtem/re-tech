<?
    require_once "_common.php";

    session_start();

    $_SESSION = [];

    redirect("login.php");
?>
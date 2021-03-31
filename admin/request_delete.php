<?
    require_once "_common.php";

    session_start();

    check_access();

    $id = SQLite3::escapeString($_GET['id']);

    $db = new SQLite3('../db/db.sqlite3');
    $db->exec("DELETE FROM requests WHERE id=${id}");

    redirect("request_list.php");
?>
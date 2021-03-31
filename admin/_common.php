<?
    const ADMIN_PASSWORD = 'qwerty';

    function check_access() {
        if (!isset($_SESSION['is_admin'])) {
            redirect("login.php");
        }
    }

    function redirect($location) {
        header("Location: ${location}");
        exit();
    }
?>
<?
    require_once "_common.php";

    session_start();

    if (isset($_SESSION['is_admin'])) {
        redirect("request_list.php");
    }

    $invalid_password = false;

    if (isset($_POST['password'])) {
        if ($_POST['password'] === ADMIN_PASSWORD) {
            $_SESSION['is_admin'] = '1';
            redirect("request_list.php");
        } else {
            $invalid_password = true;
        }
    }
?>





<? require_once '_head.php'; ?>

<body>
    <div class="login-box">
        <h5 class="title">Вход в админ. часть</h5>
        <div class="content">
            <form method="POST">
                <div class="form-group">
                    <label for="password">Пароль:</label>
                    <input class="form-control" name="password" id="password" type="password">
                    <? if ($invalid_password): ?>
                        <small class="form-text text-danger">Неверный пароль!</small>
                    <? endif ?>
                </div>
                <input type="submit" class="btn btn-primary" value="Войти">
            </form>
        </div>
    </div>
</body>
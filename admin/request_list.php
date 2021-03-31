<?
    require_once "_common.php";

    session_start();

    check_access();

    $db = new SQLite3('../db/db.sqlite3');
    $rows = $db->query('SELECT * FROM requests ORDER BY id ASC');
?>





<? require_once '_head.php'; ?>

<body>

    <div class="admin-header">
        <h4 class="title">Админ. часть</h4>
        <button class="btn btn-primary" onclick="window.location='logout.php'">Выйти</button>
    </div>

    <div class="admin-content">
        <div class="inner">
            <div class="requests">
                <h5 class="title">Запросы</h5>

                <? while ($row = $rows->fetchArray(SQLITE3_ASSOC)): ?>
                    <div class="item">
                        <p><b>Форма № </b><?= $row['form'] ?></p>
                        <p><b>Время:</b><br><?= $row['datetime'] ?></p>
                        <p><b>IP:</b><br><?= $row['ip'] ?></p>

                        <? if ($row['name']): ?>
                            <p><b>Имя:</b><br><?= $row['name'] ?></p>
                        <? endif ?>

                        <? if ($row['phone']): ?>
                            <p><b>Телефон:</b><br><?= $row['phone'] ?></p>
                        <? endif ?>

                        <? if ($row['subject']): ?>
                            <p><b>Тема:</b><br><?= $row['subject'] ?></p>
                        <? endif ?>

                        <? if ($row['message']): ?>
                            <p><b>Сообщение:</b><br><?= $row['message'] ?></p>
                        <? endif ?>

                        <p><a href="request_delete.php?id=<?= $row['id'] ?>" onclick="return confirm('Удалить?');">Удалить</a></p>
                    </div>
                    <? endwhile ?>
                </div>
            </div>
        </div>
    </div>
</body>
<?
    require('vendor/autoload.php');
    use Rakit\Validation\Validator;

    if (isset($_GET['form'])) {
        $form = $_GET['form'];

        $rules = [];

        if ($form === '1')
            $rules = [
                'name' => 'required',
                'email' => 'required|email',
                'message' => 'required'
            ];
        else if ($form === '2')
            $rules = [
                'name' => '',
                'phone' => 'required|min:12'
            ];

        else if ($form === '3')
            $rules = [
                'subject' => 'required',
                'name' => '',
                'phone' => 'required|min:12'
            ];
        else
            send_response('ERR');

        $validator = new Validator;
        $validation = $validator->validate($_POST, $rules);

        if ($validation->fails()) {
            send_response('ERR');
        } else {
            $fields = [];

            foreach (array_keys($rules) as $key)
                $fields[$key] = SQLite3::escapeString(strip_tags($_POST[$key]));

            save_request($form, $fields);
            send_response('OK');
        }

    } else {
        send_response('ERR');
    }

    function send_response($s) {
        echo $s;
        exit();
    }

    function save_request($form, $fields) {
        $db = new SQLite3('db/db.sqlite3');

        $columns =
            'form,datetime,ip,'.
            implode(",", array_keys($fields));

        $datetime = date('d.m.Y h:i:s', time());
        $ip = $_SERVER['REMOTE_ADDR'];

        $values =
            "'${form}','${datetime}','${ip}','".
            implode("','", $fields).
            "'";

        $db->exec("INSERT INTO requests (${columns}) VALUES (${values})");
        $db->close();
    }
?>
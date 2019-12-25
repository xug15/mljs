<?php
ini_set('memory_limit', '1024M');
$db = new PDO('mysql:host=127.0.0.1;dbname=exrpanel', 'root', 'admin');
$gtf='gtf';

$msgArray = array('code'=>0, 'data'=>array(), 'message'=>'参数接收错误，请关闭浏览器后重试。');
$key = isset($_POST['key']) ? trim($_POST['key']) : trim($_GET['key']);

header('content-type:application:json;charset=utf8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');


function gtfinfor($key){
        global $db, $gtf;
        $query = "select * from ".$gtf." where transcript_index = '".$key."'";
        //$query="select * from gtf where transcript_index='ENST00000516445'";
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
}
$response=gtfinfor($key);
echo json_encode($response);
?>



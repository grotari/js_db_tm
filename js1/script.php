<?php
$myPost = file_get_contents('php://input');
$filename = 'booklist.json';

if (!file_exists($filename)) {
    file_put_contents($filename, $myPost);
} else {
    $myFile = fopen($filename, 'w');
    fwrite($myFile,$myPost);
    fclose($myFile);
}

$json = json_decode($myPost); 
//echo json_encode($json);
echo $myPost;
?>
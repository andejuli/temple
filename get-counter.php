<?php
  header("Access-Control-Allow-Origin: *");
  echo file_get_contents('counter.txt');
?>

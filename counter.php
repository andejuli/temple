<?php
  header("Access-Control-Allow-Origin: *");
  $filename = 'counter.txt';
  $counter = (int)file_get_contents($filename);
  $counter++;
  file_put_contents($filename, $counter);
  echo $counter;
?>
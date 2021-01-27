<?php
try {
    $dbh = new PDO("mysql:host=localhost; dbname=000816379", "root", "");
} catch (Exception $e) {
    die("ERROR: Could not get connection. ". $e->getMessage());
}
?>
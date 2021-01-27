<?php
/*
Name:           Harmanpreet Dhillon, 000816379
Date:           Dec 13th, 2020
Description:    removes the items from the cart table with the same user_id when user checksout
*/
session_start();
include "connect.php";

$user = $_SESSION["user_id"];

$cmd = "DELETE FROM cart WHERE user_id = ?";
$stmt = $dbh->prepare($cmd);
$result = $stmt->execute([$user]);

$output = "";

if ($result === false) {
    $output = "Database is down, try again later";
} else {
    $output = "Purchase Successfull";
}

echo json_encode($output);
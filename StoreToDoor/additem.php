<?php
/*
Name:           Harmanpreet Dhillon, 000816379
Date:           Dec 13th, 2020
Description:    adds items to the cart table 
*/
session_start();
include "connect.php";

$userid = $_SESSION["user_id"];
$itemid = filter_input(INPUT_GET, "itemid", FILTER_VALIDATE_INT);
$quantity = filter_input(INPUT_GET, "quantity", FILTER_VALIDATE_INT);

$output = "";

if ($userid === null or $itemid === null or $itemid === false or 
    $quantity === null or $quantity === false) {
        $output = "Bad Parameters";
} else {
    $cmd = "INSERT INTO cart (item_id, user_id, quantity) VALUES (?, ?, ?)";
    $stmt = $dbh->prepare($cmd);
    $params = [$itemid, $userid, $quantity];
    $result = $stmt->execute($params);

    if ($result === false) {
        $output = "Database is down, Please try again later";
    } else {
        $output = "Added to cart";
    }
}

echo json_encode($output);



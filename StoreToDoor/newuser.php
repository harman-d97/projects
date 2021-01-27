<?php
/*
Name:           Harmanpreet Dhillon, 000816379
Date:           Dec 13th, 2020
Description:    adds a new user to the users table 
*/
include "connect.php";

$userid = filter_input(INPUT_GET, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_GET, "password", FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_GET, "name", FILTER_SANITIZE_SPECIAL_CHARS);
$address = filter_input(INPUT_GET, "address", FILTER_SANITIZE_SPECIAL_CHARS);
$city = filter_input(INPUT_GET, "city", FILTER_SANITIZE_SPECIAL_CHARS);
$province = filter_input(INPUT_GET, "province", FILTER_SANITIZE_SPECIAL_CHARS);
$postalcode = filter_input(INPUT_GET, "postalcode", FILTER_SANITIZE_SPECIAL_CHARS);
$creditcard = filter_input(INPUT_GET, "creditcard", FILTER_VALIDATE_INT);
$expmonth = filter_input(INPUT_GET, "month", FILTER_VALIDATE_INT);
$expyear = filter_input(INPUT_GET, "year", FILTER_VALIDATE_INT);
$cvc = filter_input(INPUT_GET, "cvc", FILTER_VALIDATE_INT);

$ouptut = " ";

if (
    $userid === null or $password === null or $name === null or $address === null or $city === null
    or $postalcode === null or $creditcard === null or $creditcard === false or $expmonth === null or
    $expmonth === false or $expyear === null or $expyear === false or $cvc === null or $cvc === false
) {
    $output .= "Invalid entry";
} else {
    $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
    $hashedcreditcard = password_hash($creditcard, PASSWORD_DEFAULT);

    $cmd = "INSERT INTO users (user_id, password, name, address, city, province, postal_code, 
            credit_card_number, exp_month, exp_year, cvc_code) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = $dbh->prepare($cmd);
    $params = [
        $userid, $hashedpassword, $name, $address, $city, $province, $postalcode, $hashedcreditcard,
        $expmonth, $expyear, $cvc
    ];
    $result = $stmt->execute($params);
    if ($result === false) {
        $output = "Database is down, Please try again later";
    } else {
        $output = "Account successfully created";
    }
}

echo json_encode($output);

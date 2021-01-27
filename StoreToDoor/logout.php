<?php
/*
Name:           Harmanpreet Dhillon, 000816379
Date:           Dec 13th, 2020
Description:    terminates the user's session 
*/
session_start();

if(isset($_SESSION["user_id"])) {
    session_destroy();
    $status = "Logged Out";
}

echo json_encode($status);
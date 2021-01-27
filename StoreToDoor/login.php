<?php
/*
Name:           Harmanpreet Dhillon, 000816379
Date:           Dec 13th, 2020
Description:    checks if the user trying to log in is the same as the one in the users table 
*/
session_start();

include "connect.php";

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

$cmd = "SELECT password FROM users WHERE user_id = ?";
$stmt = $dbh->prepare($cmd);
$result = $stmt->execute([$username]);

$output = "";

if ($result === false) {
    $output = "Database is down, try again later";
} else {
    if ($row = $stmt->fetch()) {
        if (password_verify($password, $row[0])) {
                header("Location: index.html");
                $_SESSION["user_id"] = $username;
        } else {
            $output = "Password is incorrect";
        }
        
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Store to Door - Log In</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .content {
            text-align: center;
        }
        h2 {
            color: red;
        }
    </style>
</head>

<body>
    <header>
        <div class="name">
            <h1>Store to Door</h1>
        </div>

        <div class="navbar">
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="signup.html">Sign Up</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <div class="content">
        <div>
            <h2><?php echo $output ?></h2>
            <p><a href="login.html">Try Again</a></p>
        </div>

    </div>

    <footer>
        <img src="images/footer.jpg" alt="footer">
    </footer>
</body>

</html>
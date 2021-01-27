<?php
session_start();
include "connect.php";
$check = "";
$output = "";
if (isset($_SESSION["user_id"])) {
    $check = "Log Out";

    $user = $_SESSION["user_id"];

    $cmd = "SELECT cart.item_id, cart.quantity, products.name, products.price FROM cart JOIN products ON cart.item_id = products.item_id WHERE user_id = ?";
    $stmt = $dbh->prepare($cmd);
    $result = $stmt->execute([$user]);


} else {
    $output = "You must login to view your cart";
}


?>
<!DOCTYPE html>
<!--
    Name:           Harmanpreet Dhillon, 000816379
    Date:           Dec 13th, 2020
    Description:    Cart page for Store to Door online grocery website 
                    Displays the cart and allows user to purchase items
-->
<html>

<head>
    <title>Store to Door - Home</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#checkoutbutton").click(function() {
                fetch("checkout.php", {credentials: "include"})
                .then(response => response.text())
                .then(function(text) {
                    $("#success").html(text);
                    setTimeout(function() {
                        $("#success").html("");
                        location.reload();
                    }, 3000);
                });
            });

            $("#logout").click(function() {
                fetch("logout.php", {credentials: "include"})
                .then(response => response.text())
                .then(function() {
                    console.log("logged out")
                    location.reload();
                });
            });
        });
    </script>
    <style>
        .content {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto 200px;
            background-color: lightyellow;
        }

        .logincheck {
            text-align: right;
            margin: 0;
            grid-column: 2;
        }

        .cartimg img {
            display: block;
            width: 50%;
            height: 350px;
            margin: 0 auto;
        }

        table {
            margin: 70px auto;
            padding: 0;
            width: 40%;
            border-collapse: collapse;
            border: solid black 1px;
        }

        table th,
        td {
            border-collapse: collapse;
            border: solid black 1px;
        }

        table td {
            padding-left: 5px;
        }

        table th {
            text-align: left;
            background-color: lightgrey;
            padding: 10px 5px;
        }

        .cart {
            text-align: center;
        }

        .checkout {
            text-align: center;
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
                    <li><a href="products.php">Products</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="signup.html">Sign Up</a></li>
                    <li><a href="cart.php">Shopping Cart</a></li>
                </ul>
            </nav>
        </div>
        <div class="logincheck">
            <?php
            if (isset($_SESSION["user_id"])) { ?>
                <button type="button" id="logout"><?php echo $check ?></button>
            <?php } else { ?>
                <p id="confirmlogout">Logged Out</p>
            <?php } ?>
        </div>
    </header>

    <div class="content">

        <div class="cartimg">
            <img src="images/cart.png" alt="shopping cart">
        </div>
        <?php 
        if (isset($_SESSION["user_id"])) {
        ?>
        <div class="cart">
            <table>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                <?php
                if ($result === false) {
                    $output = "Database is down, Please try again later";
                } else {
                    $total = 0;
                    while ($row = $stmt->fetch()) {
                        echo "<tr><td>$row[name]</td><td>$row[quantity]</td><td>$row[price]</td></tr>";
                        $total += (floatval($row["quantity"]) * floatval($row["price"]));
                    }
                }
                ?>
            </table>
        </div>
        <div class="checkout">
            <p>Total: <?= $total ?></p>
            <button type="button" id="checkoutbutton">Checkout</button>
            <p id="success"></p>
        </div>
        <?php
        } else {
        ?>
        <div>
            <p><?=$output?></p>
        </div>
        <?php
        }
        ?>

    </div>

    <footer>
        <img src="images/footer.jpg" alt="footer">
    </footer>


</body>

</html>
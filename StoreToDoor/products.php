<?php
session_start();
$check = "";
// checks if user is logged in 
if (isset($_SESSION["user_id"])) {
    $check = "Log Out";
} 
?>
<!DOCTYPE html>
<!--
    Name:           Harmanpreet Dhillon, 000816379
    Date:           Dec 13th, 2020
    Description:    Products page for Store to Door online grocery website 
                    Displays all the avaliable products 
-->
<html>

<head>
    <title>Store to Door - Products</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/addtocart.js"></script>
    <style>
        .content {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto 200px;
            background-color: lightyellow;
        }

        .item {
            padding: 10px;
            width: 22%;
            text-align: center;
            float: left;
            margin-bottom: 30px;
        }

        .item input {
            width: 80px;
        }

        h5 {
            margin: 0 0 10px 0;
        }

        .basket img {
            display: block;
            margin: 0 auto;
            width: 50%;
            height: 300px;
        }

        .basket {
            margin-bottom: 40px;
        }

        .logincheck {
            text-align: right;
            margin: 0;
            grid-column: 2;
        }

        #appleinserted {
            margin: 0;
            padding: 0;
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
                    <li><a href="cart.php">Shopping Cart</a></li>
                </ul>
            </nav>
        </div>
        <div class="logincheck">
            <?php
            // displays log out button if user is logged in 
            if (isset($_SESSION["user_id"])) { ?>
            <button type="button" id="logout"><?php echo $check ?></button>
            <?php } else {?> 
            <p id="confirmlogout">Logged Out</p>
            <?php } ?>
        </div>
    </header>

    <div class="content">
        <div class="basket">
            <img src="images/products.png" alt="grocery items">
        </div>
        <!-- Displays all products and only dsiplays ability to add to cart if user is logged in -->
        <div class="products">
            <div class="item">
                <img src="images/products/apples.jpg" alt="apples" width="150" height="150">
                <h5>Apples</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="applequantity" min="1" placeholder="quantity" required>
                <button type="button" id="applebutton">Add to Cart</button>
                <h5 id="appleinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/bananas.jpeg" alt="bananas" width="150" height="150">
                <h5>Bananas</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="bananaquantity" min="1" placeholder="quantity" required>
                <button type="button" id="bananabutton">Add to Cart</button>
                <h5 id="bananainserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/strawberries.jpg" alt="strawberries" width="150" height="150">
                <h5>Strawberries</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="strawberryquantity" min="1" placeholder="quantity" required>
                <button type="button" id="strawberrybutton">Add to Cart</button>
                <h5 id="strawberryinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/bread.jpg" alt="bread" width="150" height="150">
                <h5>Bread</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="breadquantity" min="1" placeholder="quantity" required>
                <button type="button" id="breadbutton">Add to Cart</button>
                <h5 id="breadinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/peanutbutter.jpg" alt="peanut butter" width="150" height="150">
                <h5>Peanut Butter</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="peanutbutterquantity" min="1" placeholder="quantity" required>
                <button type="button" id="peanutbutterbutton">Add to Cart</button>
                <h5 id="peanutbutterinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/jam.jpg" alt="jam" width="150" height="150">
                <h5>Strawberry Jam</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="jamquantity" min="1" placeholder="quantity" required>
                <button type="button" id="jambutton">Add to Cart</button>
                <h5 id="jaminserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/chicken.jpg" alt="chicken" width="150" height="150">
                <h5>Chicken</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="chickenquantity" min="1" placeholder="quantity" required>
                <button type="button" id="chickenbutton">Add to Cart</button>
                <h5 id="chickeninserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/beef.jpg" alt="beef" width="150" height="150">
                <h5>Beef</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="beefquantity" min="1" placeholder="quantity" required>
                <button type="button" id="beefbutton">Add to Cart</button>
                <h5 id="beefinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/fish.jpg" alt="fish" width="150" height="150">
                <h5>Fish</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="fishquantity" min="1" placeholder="quantity" required>
                <button type="button" id="fishbutton">Add to Cart</button>
                <h5 id="fishinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/rice.jpg" alt="rice" width="150" height="150">
                <h5>Rice</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="ricequantity" min="1" placeholder="quantity" required>
                <button type="button" id="ricebutton">Add to Cart</button>
                <h5 id="riceinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/cereal.jpg" alt="cereal" width="150" height="150">
                <h5>Cereal</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="cerealquantity" min="1" placeholder="quantity" required>
                <button type="button" id="cerealbutton">Add to Cart</button>
                <h5 id="cerealinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/milk.jpg" alt="milk" width="150" height="150">
                <h5>Milk</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="milkquantity" min="1" placeholder="quantity" required>
                <button type="button" id="milkbutton">Add to Cart</button>
                <h5 id="milkinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/eggs.jpg" alt="eggs" width="150" height="150">
                <h5>Eggs</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="eggsquantity" min="1" placeholder="quantity" required>
                <button type="button" id="eggsbutton">Add to Cart</button>
                <h5 id="eggsinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/cheese.jpg" alt="cheese" width="150" height="150">
                <h5>Cheese</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="cheesequantity" min="1" placeholder="quantity" required>
                <button type="button" id="cheesebutton">Add to Cart</button>
                <h5 id="cheeseinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/flour.jpg" alt="flour" width="150" height="150">
                <h5>Flour</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="flourquantity" min="1" placeholder="quantity" required>
                <button type="button" id="flourbutton">Add to Cart</button>
                <h5 id="flourinserted"></h5>
                <?php } ?>
            </div>
            <div class="item">
                <img src="images/products/water.jpg" alt="water" width="150" height="150">
                <h5>Water</h5>
                <?php
                if (isset($_SESSION["user_id"])) { ?>
                <input type="number" name="waterquantity" min="1" placeholder="quantity" required>
                <button type="button" id="waterbutton">Add to Cart</button>
                <h5 id="waterinserted"></h5>
                <?php } ?>
            </div>
        </div>

    </div>

    <footer>
        <img src="images/footer.jpg" alt="footer">
    </footer>


</body>

</html>
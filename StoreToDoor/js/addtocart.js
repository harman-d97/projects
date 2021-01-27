/*
Name:           Harmanpreet Dhillon, 000816379
Date:           Dec 13th, 2020
Description:    adds event handler on the logout button and add to cart buttons for the products 
*/
$(document).ready(function() {

    $("#logout").click(function() {
        fetch("logout.php", {credentials: "include"})
        .then(response => response.text())
        .then(function() {
            console.log("logged out")
            location.reload();
        })
    });

    $("#applebutton").click(function() {
        fetch("additem.php?itemid=1&quantity=" + $('input[name=applequantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#appleinserted").html(text);
            setTimeout(function() {
                $("#appleinserted").html("");
            }, 2000);
        })
    });
    $("#bananabutton").click(function() {
        fetch("additem.php?itemid=2&quantity=" + $('input[name=bananaquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#bananainserted").html(text);
            setTimeout(function() {
                $("#bananainserted").html("");
            }, 2000);
        })
    });
    $("#strawberrybutton").click(function() {
        fetch("additem.php?itemid=3&quantity=" + $('input[name=strawberryquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#strawberryinserted").html(text);
            setTimeout(function() {
                $("#strawberryinserted").html("");
            }, 2000);
        })
    });
    $("#breadbutton").click(function() {
        fetch("additem.php?itemid=4&quantity=" + $('input[name=breadquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#breadinserted").html(text);
            setTimeout(function() {
                $("#breadinserted").html("");
            }, 2000);
        })
    });
    $("#peanutbutterbutton").click(function() {
        fetch("additem.php?itemid=5&quantity=" + $('input[name=peanutbutterquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#peanutbutterinserted").html(text);
            setTimeout(function() {
                $("#peanutbutterinserted").html("");
            }, 2000);
        })
    });
    $("#jambutton").click(function() {
        fetch("additem.php?itemid=6&quantity=" + $('input[name=jamquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#jaminserted").html(text);
            setTimeout(function() {
                $("#jaminserted").html("");
            }, 2000);
        })
    });
    $("#chickenbutton").click(function() {
        fetch("additem.php?itemid=7&quantity=" + $('input[name=chickenquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#chickeninserted").html(text);
            setTimeout(function() {
                $("#chickeninserted").html("");
            }, 2000);
        })
    });
    $("#beefbutton").click(function() {
        fetch("additem.php?itemid=8&quantity=" + $('input[name=beefquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#beefinserted").html(text);
            setTimeout(function() {
                $("#beefinserted").html("");
            }, 2000);
        })
    });
    $("#fishbutton").click(function() {
        fetch("additem.php?itemid=16&quantity=" + $('input[name=fishquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#fishinserted").html(text);
            setTimeout(function() {
                $("#fishinserted").html("");
            }, 2000);
        })
    });
    $("#ricebutton").click(function() {
        fetch("additem.php?itemid=9&quantity=" + $('input[name=ricequantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#riceinserted").html(text);
            setTimeout(function() {
                $("#riceinserted").html("");
            }, 2000);
        })
    });
    $("#cerealbutton").click(function() {
        fetch("additem.php?itemid=10&quantity=" + $('input[name=cerealquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#cerealinserted").html(text);
            setTimeout(function() {
                $("#cerealinserted").html("");
            }, 2000);
        })
    });
    $("#milkbutton").click(function() {
        fetch("additem.php?itemid=11&quantity=" + $('input[name=milkquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#milkinserted").html(text);
            setTimeout(function() {
                $("#milkinserted").html("");
            }, 2000);
        })
    });
    $("#eggsbutton").click(function() {
        fetch("additem.php?itemid=12&quantity=" + $('input[name=eggsquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#eggsinserted").html(text);
            setTimeout(function() {
                $("#eggsinserted").html("");
            }, 2000);
        })
    });
    $("#cheesebutton").click(function() {
        fetch("additem.php?itemid=13&quantity=" + $('input[name=cheesequantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#cheeseinserted").html(text);
            setTimeout(function() {
                $("#cheeseinserted").html("");
            }, 2000);
        })
    });
    $("#flourbutton").click(function() {
        fetch("additem.php?itemid=14&quantity=" + $('input[name=flourquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#flourinserted").html(text);
            setTimeout(function() {
                $("#flourinserted").html("");
            }, 2000);
        })
    });
    $("#waterbutton").click(function() {
        fetch("additem.php?itemid=15&quantity=" + $('input[name=waterquantity]').val(), {credentials: "include"})
        .then(response => response.text())
        .then(function(text) {
            $("#waterinserted").html(text);
            setTimeout(function() {
                $("#waterinserted").html("");
            }, 2000);
        })
    });
});
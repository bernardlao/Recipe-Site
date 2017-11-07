Template.footer.events({

    '[mymouseover= "mymouseover()"]': function mymouseover(code) {
            document.getElementById('footer').style = "background-color:" + code + ";transition: all 0.5s;";
        
    },

    '[onmouseout="mymouseout()"]' : function mymouseout() {
            document.getElementById('footer').style = "background-color:#101010;transition: all 0.5s";

            document.getElementById('fb').style = "padding-right:inherit;";
            document.getElementById('tw').style = "padding-right:inherit;";
            document.getElementById('it').style = "padding-right:inherit;";
            document.getElementById('yt').style = "padding-right:inherit;";
    },

    'onmouseover="mymouserover1()"': function (e) {
        function mymouseover1() {
            document.getElementById('fb').style = "padding-right:20%;";
            document.getElementById('tw').style = "padding-right:20%;";
            document.getElementById('it').style = "padding-right:20%;";
            document.getElementById('yt').style = "padding-right:20%;";
        }
    }
});



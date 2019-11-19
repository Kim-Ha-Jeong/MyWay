
    function text(clicked_id) {
        var Line = new Array("1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "boon", "sinboon");
        var circle = new Array("1","2","3","4","5","6","7","8","9","B","S")
        var index;
        for (var i = 0; i < Line.length; i++) {
            if (clicked_id == Line[i]) {
                var p1 = document.getElementById(String(i + 1));
                var c1 = document.getElementsByClassName("L" + String(i + 1));
                index = i;
                if (p1.hasChildNodes()) {
                    var children = p1.childNodes;
                    var child = new Array();
                    for (var j = 0; j < children.length; j++) {
                        if (children[j].nodeName == 'path') {
                            Array[j] = children[j];
                            Array[j].style.opacity = "1.0";
                        }
                    }
                }
                for (var n = 0; n < Line.length; n++) {
                    if (n == index)
                        continue;
                    else {
                        var p2 = document.getElementById(String(n + 1));
                        var c1 = document.getElementsByClassName("L" + circle[n]);
                        if (p2.hasChildNodes()) {
                            var children = p2.childNodes;
                            var child = new Array();
                            for (var j = 0; j < children.length; j++) {
                                if (children[j].nodeName == 'path') {
                                    Array[j] = children[j];
                                    Array[j].style.opacity = "0.1";
                                }
                            }
                        }
                        if (c1) {
                            var children = new Array();
                            for (var j = 0; j < c1.length; j++) {
                                if (c1[j].nodeName == 'circle'||c1[j].nodeName=='g'||c1[j].nodeName=='text') {
                                    Array[j] = c1[j];
                                    Array[j].style.opacity = "0.1";
                                }
                            }
                        }
                        
                    }
                }
            }
        }

    }


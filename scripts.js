window.onload = function(){
    //window sizing
    checkWindow();
    $(window).resize(function(){
        checkWindow();
    })
    function checkWindow(){
        if($(window).width() >= 1200){
            $('#showOn1200').css("display", "initial");
            $('#showOnLessThan1200').css("display", "none");
            $('textbox').focus();
        }else{
            $('#showOn1200').css("display", "none");
            $('#showOnLessThan1200').css("display", "initial");
        }
    }

    //variables
    var sK = document.querySelectorAll(".typeKey");
    var span = document.querySelectorAll("span");
    var typeKey = document.querySelectorAll('.typeKey');
    var nonLetter = document.querySelectorAll('.nonLetter');
    var letter = document.querySelectorAll('.letter');
    var textbox = $('#textbox');
    var spaceBar = $('.spaceBar');
    var backKey = $('.backKey');
    var enterKey = $('.enterKey');
    var tabKey = $('.tabKey');
    var shiftKey = $('.shiftKey');
    var capsKey = $('.capsKey');
    var uppercase = false;
    var capsKeyToggle = false;
    var shift = false;
    var shiftPerm = false;
    var keydownFire = false;

    var keys = [
        "`","~","1","!","2","@","3","#","4","$","5","%","6","^",
        "7","&","8","*","9","(","0",")","-","_","=","+","[","{",
        "]","}",";",":","'","\"","\\","|",",","<",".",">","/","?"
    ];

    //keyboard class listeners
    var backKeyKB = document.querySelector(".backKey");
    var tabKeyKB = document.querySelector(".tabKey");
    var capsKeyKB = document.querySelector(".capsKey");
    var enterKeyKB = document.querySelector(".enterKey");
    var shiftKeyKB = document.querySelectorAll(".shiftKey");
    var spaceBarKB = document.querySelector(".spaceBar");

    //give element id according to text of span
    span.forEach(function(item){
        item.id = item.innerText;
    })

    // textbox.append("&#13;&#10;")
    
    sK.forEach(function(s){
        s.addEventListener("click", function(){
            textbox.val(textbox.val() + s.innerText);
            if(shift && !shiftPerm) shiftClick();
        });
    });

    spaceBar.on("click", function(){
        textbox.val(textbox.val() + " ");
    });

    backKey.on("click", function(){
        textbox.val(textbox.val().substring(0, textbox.val().length - 1));
    });

    tabKey.on("click", function(){
        textbox.val(textbox.val() + "     ");
    });

    enterKey.on("click", function(){
        // console.log(textbox.val());
        textbox.val(textbox.val() + "\n");
    });

    capsKey.on("click", function(){
        caps();
    });

    shiftKey.click(function(e){
        if(e.detail===1){
            shiftPermRemove();
            shiftClick();
        }
        else if(e.detail===2){
            if(!shiftPerm && shift) shiftPermAdd();
            else shiftPermRemove();
        }
    });

    //keyboard visual: keydown
    document.addEventListener("keydown", function(e){
            switch(e.key){
                case "Backspace":
                    applyKeyboardClass(backKeyKB);
                    break;
                case "Tab":
                    applyKeyboardClass(tabKeyKB);
                    break;
                case "CapsLock":
                    applyKeyboardClass(capsKeyKB);
                    break;
                case "Enter":
                    applyKeyboardClass(enterKeyKB);
                    break;
                case "Shift":
                    if(keydownFire){
                        keydownFire = false;
                        applyKeyboardClass(shiftKeyKB);
                        keyboardShiftKeydown();
                    }
                    break;
                case " ":
                    applyKeyboardClass(spaceBarKB);
                    break;
                default:
                    span.forEach(function(i){
                        if(i.innerText==e.key) 
                            applyKeyboardClass(i);
                    });
                    break;
            }
    });

    //keyboard visual: keyup
    document.addEventListener("keyup", function(e){
        switch(e.key){
            case "Backspace":
                removeKeyboardClass(backKeyKB);
                break;
            case "Tab":
                removeKeyboardClass(tabKeyKB);
                break;
            case "CapsLock":
                removeKeyboardClass(capsKeyKB);
                caps();
                break;
            case "Enter":
                removeKeyboardClass(enterKeyKB);
                break;
            case "Shift":
                removeKeyboardClass(shiftKeyKB);
                keyboardShiftKeyup();
                break;
            case " ":
                removeKeyboardClass(spaceBarKB);
                break;
            default:
                span.forEach(function(i){
                    if(i.innerText==e.key) 
                        removeKeyboardClass(i);
                });
                break;
        }
        keydownFire = true;
    });

    ///////////////////////
    ///////functions///////
    ///////////////////////

    function keyboardShiftKeydown(){
        letter.forEach(function(item){
            if(capsKeyToggle) changeLetterLower(item);
            else changeLetterUpper(item);
        })
        nonLetter.forEach(function(item){
            shiftKeyChangeNonLetterToShift(item);
        })
        shift = true;
    }

    function keyboardShiftKeyup(){
            letter.forEach(function(item){
                if(!capsKeyToggle) changeLetterLower(item);
                else changeLetterUpper(item);
            })
        nonLetter.forEach(function(item){
            shiftKeyChangeNonLetterToUnshift(item)
        })
        shift = false;
    }
    
    function applyKeyboardClass(ele){
        if(ele.length > 1){
            ele.forEach(function(e){
                e.classList.add("keyboard");
            })
        }else ele.classList.add("keyboard");
    }

    function removeKeyboardClass(ele){
        if(ele.length > 1){
            ele.forEach(function(e){
                e.classList.remove("keyboard");
            })
        }else ele.classList.remove("keyboard");
    }

    function shiftPermAdd(){
        shiftPerm = true;
        shiftKey.addClass("shiftPerm");
    }

    function shiftPermRemove(){
        shiftPerm = false;
        shiftKey.removeClass("shiftPerm");
    }

    function shiftClick(){
        if(!shift) shiftToTrue();
        else shiftToFalse();
    }
    
    function capsToTrue(){
        capsKeyToggle = true;
        capsKey.addClass("selected");
        if(shift) capsTrueOnShiftTrue();
        else capsTrueOnShiftFalse();
    }

    function capsToFalse(){
        capsKeyToggle = false;
        capsKey.removeClass("selected");
        if(shift) capsFalseOnShiftTrue();
        else capsFalseOnShiftFalse()
    }

    function capsTrueOnShiftTrue(){
        uppercase = false;
        letter.forEach(function(item){
            changeLetterLower(item);
        })
    }
    
    function capsTrueOnShiftFalse(){
        uppercase = true;
        letter.forEach(function(item){
            changeLetterUpper(item);
        })
    }

    function capsFalseOnShiftFalse(){
        uppercase = false;
        letter.forEach(function(item){
            changeLetterLower(item);
        })
    }

    function capsFalseOnShiftTrue(){
        uppercase = true;
        letter.forEach(function(item){
            changeLetterUpper(item);
        })
    }

    function shiftToTrue(){
        if(!capsKeyToggle) shiftTrueOnUppercaseFalse();
        else shiftTrueOnUppercaseTrue();
        shift = true;
        shiftKey.addClass("selected");
    }

    function shiftToFalse(){
        if(!capsKeyToggle) shiftFalseOnUppercaseFalse();
        else shiftFalseOnUppercaseTrue();
        shift = false;
        shiftKey.removeClass("selected");
    }

    function shiftTrueOnUppercaseFalse(){
        typeKey.forEach(function(item){
            if(item.classList.contains("nonLetter"))
                shiftKeyChangeNonLetterToShift(item);
            if(item.classList.contains("letter"))
                changeLetterUpper(item);
        })
    }

    function shiftFalseOnUppercaseFalse(){
        typeKey.forEach(function(item){
            if(item.classList.contains("nonLetter"))
                shiftKeyChangeNonLetterToUnshift(item)
            if(item.classList.contains("letter"))
                changeLetterLower(item);
        })
    }

    function shiftTrueOnUppercaseTrue(){
        typeKey.forEach(function(item){
            if(item.classList.contains("nonLetter"))
                shiftKeyChangeNonLetterToShift(item);
            if(item.classList.contains("letter"))
                changeLetterLower(item);
        })
    }

    function shiftFalseOnUppercaseTrue(){
        typeKey.forEach(function(item){
            if(item.classList.contains("nonLetter"))
                shiftKeyChangeNonLetterToUnshift(item)
            if(item.classList.contains("letter"))
                changeLetterUpper(item);
        })
    }

    function shiftKeyChangeNonLetterToShift(item){
        item.id = keys[keys.indexOf(item.id) + 1];
        item.innerText = item.id;
    }

    function shiftKeyChangeNonLetterToUnshift(item){
        item.id = keys[keys.indexOf(item.id) - 1];
        item.innerText = item.id;
    }

    function changeLetterUpper(item){
        item.id = item.id.toUpperCase();
        item.innerText = item.id;
    }

    function changeLetterLower(item){
        item.id = item.id.toLowerCase();
        item.innerText = item.id;
    }

    function caps(){
        if(!capsKeyToggle) capsToTrue();
        else capsToFalse();
    }
}
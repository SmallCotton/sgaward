(function(){
    var resetRootFont = function(){
        document.documentElement.style.fontSize = Math.min(window.innerWidth, 510)/10.8 + 'px';
    };
    if(window.innerWidth){
        console.log('width success'+window.innerWidth);
        resetRootFont();
    }else{
        setTimeout(function(){
            if(window.innerWidth){
                console.log('2 width success'+window.innerWidth);
                resetRootFont();
            }else{
                setTimeout(arguments.callee, 30);
            }
        }, 30);
    }

})();


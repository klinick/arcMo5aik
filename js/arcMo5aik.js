var ArcMo5aik = {
    xTiles: 50,
    yTiles: 50,
    mainImg: null,
    mImgYArr: null,
    mImgUArr: null,
    mImgVArr: null,

    rgb2yuv: function rgb2yuv(R, G, B) {
        var y, u, v, r, g, b;

        r = parseInt(R);
        g = parseInt(G);
        b = parseInt(B);

        y = r * .299000 + g * .587000 + b * .114000;
        u = r * -.168736 + g * -.331264 + b * .500000 + 128;
        v = r * .500000 + g * -.418688 + b * -.081312 + 128;
        
        var result = { Y : .0, U : .0, V : .0};
        result.Y = Math.floor(y);
        result.U = Math.floor(u);
        result.V = Math.floor(v);
        return result;
    }
};

$(document).ready(function () {
    //var yuv = ArcMo5aik.rgb2yuv(55, 55, 55);
    //console.log(yuv.Y + ' ' + yuv.U + ' ' + yuv.V);
    ArcMo5aik.mainImg = new Image();
    ArcMo5aik.mainImg.onload = function () {
        var canvas = document.getElementById('minimalizeCanvas');
        var previewCanvas = document.getElementById('previewCanvas');
        var previewCtx = previewCanvas.getContext('2d');
        var ctx = canvas.getContext('2d');
        var tileW = ArcMo5aik.mainImg.width / 50;
        var tileH = ArcMo5aik.mainImg.height / 50;
        ArcMo5aik.mImgYArr = new Array();
        ArcMo5aik.mImgUArr = new Array();
        ArcMo5aik.mImgVArr = new Array();
        for (var y = 0; y < ArcMo5aik.yTiles; y++) {
            for (var x = 0; x < ArcMo5aik.xTiles; x++) {
                //ctx.drawImage(ArcMo5aik.mainImg, x * tileW, y * tileH, tileW, tileH, 0, 0, 1, 1);
                previewCtx.drawImage(ArcMo5aik.mainImg, x * tileW, y * tileH, tileW, tileH, x, y, 1, 1);
                var data = previewCtx.getImageData(x, y, 1, 1).data;
                var currYUV = ArcMo5aik.rgb2yuv(data[0], data[1], data[2]);
                ArcMo5aik.mImgYArr.push(currYUV.Y);
                ArcMo5aik.mImgUArr.push(currYUV.U);
                ArcMo5aik.mImgVArr.push(currYUV.V);
            }
        }
    };
    ArcMo5aik.mainImg.src = document.getElementById('mainImgId').src;
    //wait for counting YUV Arrays of mainImg
    var interval = setInterval(function () {
        if (ArcMo5aik.mImgYArr && ArcMo5aik.mImgYArr.length == ArcMo5aik.xTiles * ArcMo5aik.yTiles) {
            window.clearInterval(interval);
            $("#logDivId").html("Policzylem odcienie glownego obrazu");
        }
    }, 1000);
    //document.body.appendChild(mainImg);
});
//ctx.drawImage(mainImg, 

//var breakHere = 2;
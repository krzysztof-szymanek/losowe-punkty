$(document).ready(function(){
    //wartości teoretyczne
    var wartTeor= new Array(12);
    var wartEmpir= new Array(12);
    $('#tabelka').hide();
//=================================================================================

    function silnia(q){if (q==0) {return 1} else {return q*silnia(q-1)}};

//========================================================================================

    function chiKwadrat(){
        var x0=Math.pow(wartTeor[0]-wartEmpir[0],2)/wartTeor[0];
        var x1=Math.pow(wartTeor[1]-wartEmpir[1],2)/wartTeor[1];
        var x2=Math.pow(wartTeor[2]-wartEmpir[2],2)/wartTeor[2];
        var x3=Math.pow(wartTeor[3]+wartTeor[4]+wartTeor[5]-wartEmpir[3]-wartEmpir[4]-wartEmpir[5],2)/(wartTeor[3]+wartTeor[4]+wartTeor[5]);
        var chi=x0+x1+x2+x3;
        parseFloat(chi);
        var p=100*(1.048-chi*0.291+chi*chi*0.028-chi*chi*chi*0.001);

        parseFloat(p);
        if (chi>6.25) {napis="test chi2: p = 10%";$('#chi2').html(napis)};
        if (chi>7.1) {napis="test chi2: p = 8%";$('#chi2').html(napis)};
        if (chi>=7.81) {napis="test chi2: p = 5%";$('#chi2').html(napis)};
        if (chi>11.34) {napis="test chi2: p < 1%";$('#chi2').html(napis)};
        if (chi>16.27) {napis="test chi2: p < 0,1%";$('#chi2').html(napis)};
        if (chi<7.81) {napis="test chi2: p = "+p.toFixed(0)+"%";$('#chi2').html(napis)};
        if (chi<1.1) {napis="test chi2: p = 90%";$('#chi2').html(napis)};
        if (chi<0.7) {napis="test chi2: p = 95%";$('#chi2').html(napis)};
        if (chi<0.3) {napis="test chi2: p = 96%";$('#chi2').html(napis)};
        if (chi<0.11) {napis="test chi2: p > 99%";$('#chi2').html(napis)};
        }
//========================================================================================
    function Poisson(liczbaProb,liczbaKom){
    for (i=0;i<11;i++){
            var lambda=liczbaProb/liczbaKom;
            wartTeor[i]=parseFloat(liczbaKom*Math.exp(-lambda)*Math.pow(lambda,i)/silnia(i))};
            $('#dla0').html(wartTeor[0].toFixed(1));
            $('#dla1').html(wartTeor[1].toFixed(1));
            $('#dla2').html(wartTeor[2].toFixed(1));
            $('#dla3').html(wartTeor[3].toFixed(1));
            $('#dla4').html(wartTeor[4].toFixed(1));
            x=liczbaKom-wartTeor[0]-wartTeor[1]-wartTeor[2]-wartTeor[3]-wartTeor[4];
            $('#dla5').html(x.toFixed(1))
        }
//=========================================================================================

    //obwodka pola
    $('canvas').drawRect({
        strokeStyle:'#c33',
        strokeWidth:2,
        x:0, y: 0,
        width: 750,
        height: 750,
        fromCenter: false
    });
//===============zmienne==================================================================
    var xx,yy;
    var xxx,yyy;
    var polexy= new Array(50);
    for (i=0;i<51;i++){polexy[i]=new Array(50)};

//=========================================================================================


    $('#guzik_los1000').click(function(){
        var iq=0;
        $('#guzik_los1000').attr("disabled",true);
        $('#guzik_nielos').attr("disabled",true);
        for (i=1;i<10;i++){wartEmpir[i]=0};
        wartEmpir[0]=2500;
        for (i=0;i<51;i++) {for (j=0;j<51;j++){polexy[i][j]=0}};
        for (i=0;i<1000;i++)
        {
        xx=Math.floor(Math.random()*750);
        yy=Math.floor(Math.random()*750);
        xxx=Math.floor((xx-xx%15)/15);
        yyy=Math.floor((yy-yy%15)/15);
        if (xxx<0){xxx=0};
        if (yyy<0){yyy=0};
        //alert(xxx);alert(yyy);
        iq=polexy[xxx][yyy];
        iq=iq+1;
        polexy[xxx][yyy]=iq;
        if (iq<12) {wartEmpir[iq]++;wartEmpir[iq-1]--} else {wartEmpir[12]++};

        // tabelka wypełniona
        $('canvas').drawEllipse({
            fillStyle: '#070707',

            x: xx, y: yy,
            width: 2,
            height: 2,
            fromCenter: false
        })
    }


    //pokazywanie i wypełnianie tabelki
    $('#tabelka').show();
    Poisson(1000,2500);
    $('#emp0').html(wartEmpir[0]);
    $('#emp1').html(wartEmpir[1]);
    $('#emp2').html(wartEmpir[2]);
    $('#emp3').html(wartEmpir[3]);
    $('#emp4').html(wartEmpir[4]);
    $('#emp5').html(wartEmpir[5]);
    chiKwadrat()
});
//=============================================================================
$('#guzik_los2500').click(function(){
    var iq=0;
    $('#guzik_los2500').attr("disabled",true);
    $('#guzik_nielos').attr("disabled",true);
    for (i=1;i<10;i++){wartEmpir[i]=0};
    wartEmpir[0]=2500;
    for (i=0;i<51;i++) {for (j=0;j<51;j++){polexy[i][j]=0}};
    for (i=0;i<2500;i++)
    {
    xx=Math.floor(Math.random()*750);
    yy=Math.floor(Math.random()*750);
    xxx=Math.floor((xx-xx%15)/15);
    yyy=Math.floor((yy-yy%15)/15);
    if (xxx<0){xxx=0};
    if (yyy<0){yyy=0};
    //alert(xxx);alert(yyy);
    polexy[xxx][yyy]++;
    iq=polexy[xxx][yyy];
    if (iq<12) {wartEmpir[iq]++;wartEmpir[iq-1]--} else {wartEmpir[12]++};

    // tabelka wypełniona
    $('canvas').drawEllipse({
        fillStyle: '#070707',

        x: xx, y: yy,
        width: 2,
        height: 2,
        fromCenter: false
    })
}


//pokazywanie i wypełnianie tabelki
$('#tabelka').show();
Poisson(2500,2500);
$('#emp0').html(wartEmpir[0]);
$('#emp1').html(wartEmpir[1]);
$('#emp2').html(wartEmpir[2]);
$('#emp3').html(wartEmpir[3]);
$('#emp4').html(wartEmpir[4]);
$('#emp5').html(wartEmpir[5]+wartEmpir[6]+wartEmpir[7]);
chiKwadrat()
});





//=============================================================================
    $('#guzik_nielos').click(function(){
        var iq=0;
        for (i=1;i<10;i++){wartEmpir[i]=0};
        wartEmpir[0]=2500;
        for (i=0;i<51;i++) {for (j=0;j<51;j++){polexy[i][j]=0}};
        var licz=0;
        for (j=0;j<32;j++){for (k=0;k<32;k++){
            xx=j*32+Math.random()*32;
            yy=k*32+Math.random()*32;
            xx=Math.round(750*xx/1024);
            yy=Math.round(750*yy/1024);
            licz++;
            xxx=Math.round((xx-xx%15)/15);
            yyy=Math.round((yy-yy%15)/15);
            if (xxx<0){xxx=0};
            if (yyy<0){yyy=0};
            iq=polexy[xxx][yyy];
            iq=iq+1;
            polexy[xxx][yyy]=iq;
            if (iq<5) {wartEmpir[iq]++;wartEmpir[iq-1]--} else {wartEmpir[5]++};
        //rysowanie punktu
            if (licz%43>0) {$('canvas').drawEllipse({
                fillStyle: '#070707',
                x: xx, y: yy,
                width: 2,
                height: 2,
                fromCenter: false
            })}

    }}
    //wypełnianie tabelki
    $('#tabelka').show();
    Poisson(1000,2500);
    $('#emp0').html(wartEmpir[0]);
    $('#emp1').html(wartEmpir[1]);
    $('#emp2').html(wartEmpir[2]);
    $('#emp3').html(wartEmpir[3]);
    $('#emp4').html(wartEmpir[4]);
    $('#emp5').html(wartEmpir[5]);
    chiKwadrat()
});




//===================KASOWANIE========================

    $('#guzik_kasuj').click(function(){
        $('canvas').clearCanvas();
        $('canvas').drawRect({
            strokeStyle:'#c33',
            strokeWidth:2,
            x:0, y: 0,
            width: 750,
            height: 750,
            fromCenter: false})
        $('#tabelka').hide();
        $('#guzik_los1000').attr("disabled",false);
        $('#guzik_los2500').attr("disabled",false);
        $('#guzik_nielos').attr("disabled",false);
        });
//========================================================
        $('#guzik_siatka').click(function(){

            for (i=0;i<50;i++){$('canvas').drawLine({
            strokeStyle:'#0000',
            strokeWidth:0.5,
            x1:i*15,
            y1:0,
            x2:i*15,
            y2:750})
        };
        for (i=0;i<50;i++){$('canvas').drawLine({
        strokeStyle:'#0000',
        strokeWidth:0.5,
        x1:0,
        y1:i*15,
        x2:750,
        y2:i*15})
    }


})})

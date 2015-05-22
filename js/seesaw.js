$(document).ready(function(){
                            
    //Hide All Goals Initally
    $("#goalarea").hide();

    //Hide Balance Position Buttons
    $("#positiongoalsbutton").hide();

    //Hide Balance Area Button
    $("#balancearea").hide();
    
    //Hide Show Seesaw Button
    $("#showseesawbutton").hide();
    
    //Hide Seesaw area
    $(".seesawarea").hide();



   //Crude:
   //Function for each of the 4 importance sliders- changes size of goals
    $('#imp1').slider({
        formatter: function(value) {
            h = 1*value/2;
            $("#goal1_circle").css("width" , h +"em");
            $("#goal1_circle").css("height" , h +"em");
            $("#goal1_circle").css("line-height", h + "em");

        }
    });
    $('#imp2').slider({
        formatter: function(value) {
            h = 1*value/2;
            $("#goal2_circle").css("width" , h +"em");
            $("#goal2_circle").css("height" , h +"em");
            $("#goal2_circle").css("line-height", h + "em");
  
        }
    });
    $('#imp3').slider({
        formatter: function(value) {
            h = 1*value/2;
            $("#goal3_circle").css("width" , h +"em");
            $("#goal3_circle").css("height" , h +"em");
            $("#goal3_circle").css("line-height", h + "em");

        }
    });
    
    $('#imp4').slider({
        formatter: function(value) {
            h = 1*value/2;
            $("#goal4_circle").css("width" , h +"em");
            $("#goal4_circle").css("height" , h +"em");
            $("#goal4_circle").css("line-height", h + "em");
         
        }
    });


    //Draw Goals - shows circles + balance goals button
    $("#drawgoals").on("click", function(){
        $("#drawgoals").hide();
        $("#goalarea").show();
        $("#positiongoalsbutton").show();
    });



    //Position Goals
    $("#positiongoalsbutton").on("click", function(){
        $("#positiongoalsbutton").hide();
        $("#balancearea").show();
        
        
        //Show Option Labels
        op1 = $("input[name='op1']").val();
        op2 = $("input[name='op2']").val();
        
        $("#balarea_op1_text").empty();
        $("#balarea_op2_text").empty();
        $("#balarea_op1_text").append(op1);
        $("#balarea_op2_text").append(op2);
        
        //show show seesaw button
        $("#showseesawbutton").show();
        
    });

    //Initialise Sliders:
    $('.balslider').slider();
    
    
    //Show SeeSaw + Draw SeeSaw
    $("#showseesawbutton").on("click", function(){
        $("#showseesawbutton").hide();
        drawseesaw();
        $(".seesawarea").show(); 
    });
    
    
    $("#balancebutton").on("click", function(){
        drawseesaw();
        balanceseesaw();
    });
    
    function drawseesaw(){
        
        //Draw SeeSaw:
        //Blocks -1
        $("#g1_block").remove();
        v = $("#imp1").val();
        if(v > 0){
            //balance position:
            bal = $("#bal1").val();
            //Add new goal block to the appropriate chart segment 
            $("#s"+bal).append("<div class=\"goalblock g1\" id=\"g1_block\">1</div>");

            //Set height of newly created goal block
            $("#g1_block").css("height", v + "em");
            $("#g1_block").css("line-height", v + "em");
        }
        
        //Blocks -2
        $("#g2_block").remove();
        v = $("#imp2").val();
        if(v > 0){
            bal = $("#bal2").val();
            $("#s"+bal).append("<div class=\"goalblock g2\" id=\"g2_block\">2</div>");
            $("#g2_block").css("height", v + "em");
            $("#g2_block").css("line-height", v + "em");
        }
        
        //Blocks -3
        $("#g3_block").remove();
        v = $("#imp3").val();
        if(v > 0){
            bal = $("#bal3").val();
            $("#s"+bal).append("<div class=\"goalblock g3\" id=\"g3_block\">3</div>");
            $("#g3_block").css("height", v + "em");
            $("#g3_block").css("line-height", v + "em");
        }
        
        //Blocks -4
        $("#g4_block").remove();
        v = $("#imp4").val();
        if(v > 0){
            bal = $("#bal4").val();
            $("#s"+bal).append("<div class=\"goalblock g4\" id=\"g4_block\">4</div>");
            $("#g4_block").css("height", v + "em");
            $("#g4_block").css("line-height", v + "em");
        }
        
        
    };
    
    function balanceseesaw(){
        //calculate individual moments
        //Moments are divided by 3 as true range is between -1 and +1. -3 was used
        //for convenice working with html and sliders;
        
        //Get Importance /weight of each goal (parseInt to cast to number, 10 to ensure its an Int, not a hex etc.)
        g1i = parseInt($("#imp1").val(), 10);
        g2i = parseInt($("#imp2").val(), 10);
        g3i = parseInt($("#imp3").val(), 10);
        g4i = parseInt($("#imp4").val(), 10);
        
        total_importance = g1i+g2i+g3i+g4i;
        
        //Calculate Momemnt of each goal        
        g1 = (g1i * $("#bal1").val())/3;
        g2 = (g2i * $("#bal2").val())/3;
        g3 = (g3i * $("#bal3").val())/3;
        g4 = (g4i * $("#bal4").val())/3;
        
        //Calculate overall momemnt on pivot + % tilt
        moment = g1+g2+g3+g4;
        percentage = (moment / total_importance)*100;
        
        alert("% Swing = "+percentage);
        
        //Set Seesaw tilt - to a maximum of 33 degrees
        tilt = percentage/3;
        
        
        
        $("#seesaw").css("transform-origin", "50% 100%");
        $("#seesaw").css("transform", "rotate("+tilt+"deg)");
        
        
        //Bottom Balance Chart:
        
        //Calculate widths
        if(percentage !== 0){
            width_1 = 50+percentage;
            width_2 = 100 - width_1;
        }
        else{
            width_1 = 50;
            width_2 = 50;
        }
        
        
        //Round Number for printing to screen
        function roundToTwo(num) {    
            return +(Math.round(num + "e+2")  + "e-2");
        }
        
        width_1b = roundToTwo(width_1);
        width_2b = roundToTwo(width_2);
        
        //
        $("#op1_bar").empty();
        $("#op2_bar").empty();
        $("#op1_bar").css("width", width_1+"%");
        $("#op2_bar").css("width", width_2+"%");
        $("#op1_bar").append(width_1b + "%");
        $("#op2_bar").append(width_2b + "%");
    };
    
    
    
    
 



});
                        

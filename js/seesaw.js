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
    $("#balchart").hide();



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
    $('#imp5').slider({
        formatter: function(value) {
            h = 1*value/2;
            $("#goal5_circle").css("width" , h +"em");
            $("#goal5_circle").css("height" , h +"em");
            $("#goal5_circle").css("line-height", h + "em");
         
        }
    });
    $('#imp6').slider({
        formatter: function(value) {
            h = 1*value/2;
            $("#goal6_circle").css("width" , h +"em");
            $("#goal6_circle").css("height" , h +"em");
            $("#goal6_circle").css("line-height", h + "em");
         
        }
    });
    
    


    //Draw Goals - shows circles + balance goals button
    $("#drawgoalsbutton").on("click", function(){
        $("#drawgoalsbutton").hide();
        $("#goalarea").show();
        $("#positiongoalsbutton").show();
        $("html, body").animate({
            scrollTop: $("#goalarea").offset().top}, 2000);
        
    });



    //Position Goals
    $("#positiongoalsbutton").on("click", function(){
        $("#positiongoalsbutton").hide();
        $("#balancearea").show();
        $("html, body").animate({
            scrollTop: $("#balancearea").offset().top}, 2000);
        
        
        
        //Show Option Labels
        op1 = $("input[name='op1']").val();
        op2 = $("input[name='op2']").val();
        
        if(op1.length !== 0 && op2.length !==0){
            $("#balarea_op1_text").empty();
            $("#balarea_op2_text").empty();
            $("#balarea_op1_text").append(op1);
            $("#balarea_op2_text").append(op2);
        }
        
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
        $("html, body").animate({
            scrollTop: $(".seesawarea").offset().top}, 2000);
    });
    
    
    $("#balancebutton").on("click", function(){
        drawseesaw();
        balanceseesaw();
        $("#balchart").fadeIn(7000);
    });
    
    function drawseesaw(){
        
        //Draw SeeSaw - For each goal 1-5, get values + draw
        for(i=1; i<6; i++){
            $("#g"+i+"_block").remove();
            v = $("#imp"+i+"").val();
            if(v > 0){
                //Find balance - position on seesaw:
                bal= $("#bal"+i).val();
                //Add new goal block to the appropriate chart segment 
                $("#s"+bal).append("<div class=\"goalblock g"+i+"\" id=\"g"+i+"_block\">"+i+"</div>");
                //Set height of newly created goal block
                $("#g"+i+"_block").css("height", v +"em");
                $("#g"+i+"_block").css("line-height", v +"em");
            }
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
        g5i = parseInt($("#imp5").val(), 10);
        
        total_importance = g1i+g2i+g3i+g4i+g5i;
        
        //Calculate Momemnt of each goal        
        g1 = (g1i * $("#bal1").val())/4;
        g2 = (g2i * $("#bal2").val())/4;
        g3 = (g3i * $("#bal3").val())/4;
        g4 = (g4i * $("#bal4").val())/4;
        g5 = (g5i * $("#bal5").val())/4;
        
        //Calculate overall momemnt on pivot + % tilt
        moment = g1+g2+g3+g4+g5;
        percentage = (moment / total_importance)*100;
        
        alert("% Swing = "+percentage);
        
        //Set Seesaw tilt - to a maximum of 40 degrees
        tilt = percentage/2.5;
        
        
        
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
        
        //Get Option Names
        op1 = $("input[name='op1']").val();
        op2 = $("input[name='op2']").val();
        
        //Empty bars
        $("#op1_bar").empty();
        $("#op2_bar").empty();
        
        //If Option names set- show these with a space
        if(op1.length !== 0 && op2.length !==0){
            $("#op1_bar").append(op1+":&nbsp; ");
            $("#op1_bar").append(op2+":&nbsp; ");
        }
        //Else use 'option 1' and 'option 2'
        else{
            $("#op1_bar").append("Option 1:&nbsp; ");
            $("#op2_bar").append("Option 2:&nbsp; ");
        }
        
        //append % 
        $("#op1_bar").append(width_2b + "%");
        $("#op2_bar").append(width_1b + "%");
        
        //Set Width
        $("#op1_bar").css("width", width_2+"%");
        $("#op2_bar").css("width", width_1+"%");
        
    };
    
    
    
    
 



});
                        


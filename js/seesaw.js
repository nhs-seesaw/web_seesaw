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



   //Verbose:
   //Function for each of the 5 importance sliders- changes size of goals
    
    
    $('#imp1').slider({
        formatter: function(value) {
            if(value === 0){
                $("#gb-1").hide();
            }
            $("#gb-1").show();
            
            h = 1*value/2;
            $("#gb-1").css("height" , h +"em");
            $("#gb-1").css("line-height", h + "em");

        }
    });
    $('#imp2').slider({
        formatter: function(value) {
            if(value === 0){
                $("#gb-2").hide();
            }
            $("#gb-2").show();
            h = 1*value/2;
            $("#gb-2").css("height" , h +"em");
            $("#gb-2").css("line-height", h + "em");
  
        }
    });
    $('#imp3').slider({
        formatter: function(value) {
            if(value === 0){
                $("#gb-3").hide();
            }
            $("#gb-3").show();
            h = 1*value/2;
            $("#gb-3").css("height" , h +"em");
            $("#gb-3").css("line-height", h + "em");

        }
    });
    
    $('#imp4').slider({
        formatter: function(value) {
            if(value === 0){
                $("#gb-4").hide();
            }
            $("#gb-4").show();
            h = 1*value/2;
            $("#gb-4").css("height" , h +"em");
            $("#gb-4").css("line-height", h + "em");
         
        }
    });
    $('#imp5').slider({
        formatter: function(value) {
            if(value === 0){
                $("#gb-5").hide();
            }
            $("#gb-5").show();
            h = 1*value/2;
            $("#gb-5").css("height" , h +"em");
            $("#gb-5").css("line-height", h + "em");
         
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
        
        //Get Goal Text
        g1_text = $("input[name='g1_text']").val();
        g2_text = $("input[name='g2_text']").val();
        g3_text = $("input[name='g3_text']").val();
        g4_text = $("input[name='g4_text']").val();
        g5_text = $("input[name='g5_text']").val();
        
        //Iterate through goal_texts and create
        
        g_text= [g1_text, g2_text, g3_text, g4_text, g5_text];
        size = g_text.length;
        
        for(i=0; i < size; i++){
            g = i+1;
            if(g_text[i].length !==0){
                $("#pos_"+g).children(".bal_label").empty();
                $("#pos_"+g).children(".bal_label").append(g_text[i]);
            }
            
        };
        
        
        
        
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
    
    //'Live' positioning of Blocks on seesaw
    
    $('#bal1').slider({
        formatter: function(value) {
            drawseesaw();
        }
    });
    $('#bal2').slider({
        formatter: function(value) {
            drawseesaw();
        }
    });
    $('#bal3').slider({
        formatter: function(value) {
            drawseesaw();
        }
    });
    $('#bal4').slider({
        formatter: function(value) {
            drawseesaw();
        }
    });
    $('#bal5').slider({
        formatter: function(value) {
            drawseesaw();
        }
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
                
                
                //Add Key Label
                $("#g"+i+"_key").show();
                label = $("input[name='g"+i+"_text']").val();
                
                //ensure not null
                if(label.length < 1)
                {
                    $("#g"+i+"_key").children(".key_text").empty();
                    $("#g"+i+"_key").children(".key_text").append("Goal " + i);
                }
                else
                {
                    $("#g"+i+"_key").children(".key_text").empty();
                    $("#g"+i+"_key").children(".key_text").append(label);
                }
                
            }
            
            if(v <1){
                $("#g"+i+"_key").hide();
            }
        }
        
        
        
        
     
        
    };
    
    function balanceseesaw(){
        //calculate individual moments
        //Moments are divided by 5 as true range is between -1 and +1. 
        
        //Get Importance /weight of each goal (parseInt to cast to number, 10 to ensure its an Int, not a hex etc.)
        g1i = parseInt($("#imp1").val(), 10);
        g2i = parseInt($("#imp2").val(), 10);
        g3i = parseInt($("#imp3").val(), 10);
        g4i = parseInt($("#imp4").val(), 10);
        g5i = parseInt($("#imp5").val(), 10);
        
        total_importance = g1i+g2i+g3i+g4i+g5i;
        
        //Calculate Momemnt of each goal        
        g1 = (g1i * $("#bal1").val())/5;
        g2 = (g2i * $("#bal2").val())/5;
        g3 = (g3i * $("#bal3").val())/5;
        g4 = (g4i * $("#bal4").val())/5;
        g5 = (g5i * $("#bal5").val())/5;
        
        //Calculate overall momemnt on pivot + % tilt
        moment = g1+g2+g3+g4+g5;
        percentage = (moment / total_importance)*100;
        
        
        //Set Seesaw tilt - to a maximum of 40 degrees
        tilt = percentage/2.5;
        
        $("#seesaw").css("transform-origin", "50% 100%");
        $("#seesaw").css("transform", "rotate("+tilt+"deg)");
        
        
          
    };
    
    
    
    
 



});
                        


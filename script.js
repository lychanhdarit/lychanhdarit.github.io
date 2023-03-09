function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let run =100;
$("#btnGenerate").click(  function(){  
  //==================================
  for(let i=1;i<200;i++){ 
     setTimeout(function(){
       let rs = getRndInteger(parseInt($("#txtMin").val()) , parseInt($("#txtMax").val()));
      $("#rs1").empty();  
       $("#rs1").append(rs); 
        $("#rs2").empty();  
       $("#rs2").append(rs); 
     }, 50); 
  } 
    //==================================
  for(let i=1;i<50;i++){
     setTimeout(function(){
        let rs = getRndInteger(parseInt($("#txtMin").val()) , parseInt($("#txtMax").val()));
        $("#rs1").empty();  
       $("#rs1").append(rs); 
        $("#rs2").empty();  
       $("#rs2").append(rs); 
     }, (i * 200));  
    
  } 
  
 })

$(function(){
//	alert(1);
	var add=$(".add");
	var bg=$(".bd");
	var contain=$(".contain");
	var header=$(".header");
	var ok=$(".ok");
	var textarea=$("textarea");
	var ul=$(".todolist");
	var todos=[];
	var empty=$(".empty");
	var first,last;
	var tu=$(".tu");
//	var dele=$(".delete")
	console.log(add,bg,contain,header,ok);
	
	//页面切换事件
	add.on("touchend",function(){
		add.css("display","none");
		header.css("display","none");
		bg.css("display","block");
		ul.css("display","none");
	})
	
	
	//刷新页面
   if(localStorage.x)
   {
   	  todos=JSON.parse(localStorage.x);
      for(var i=0;i<todos.length;i++)
   	  
   	  {
   	  	 var c=(todos[i].state)?'done':'on';
   	  	 $("<li class="+c+"><textarea name='' disabled='disabled' id='zi'>"+todos[i].name+"</textarea><div class='delete iconfont'>&#xe605;</div><div class='ding iconfont'>&#xe652;</div></li>").appendTo(ul);
   	  }
   }
	

	ok.on("touchend",function(){
		 ul.css("display","block");
		 var v=$.trim(textarea.val());
	   	 var todo={
	   	 	name:v,
	   	    state:0
	   	 }; 
	   	 var c=(todo.state)?'done':'on';
	   	 $("<li class="+c+"><textarea name='' disabled='disabled' id='zi'>"+todo.name+"</textarea><div class='delete iconfont'>&#xe605;</div><div class='ding iconfont'>&#xe652;</div></li>").appendTo(ul);
	     textarea.val("");
	     todos.push(todo);
	     localStorage.x=JSON.stringify(todos);
	     bg.css("display","none");
	     add.css("display","block");
		 header.css("display","block");
	})
	
	
	//添加事件
	ul.on("touchend",".delete",function(){

       var li=$(this).closest("li");
//     li.addClass("ani");
   	   var index=li.index();
   	   todos.splice(index,1);
   	   localStorage.x=JSON.stringify(todos);
       
   	   $(this).closest("li").remove();
	})
	
	//清空
	empty.on("touchend",function(){
		localStorage.x='';
		ul.remove();
	})
	
	//触摸事件
	
	ul.on("touchstart","li",function(e){
   	console.log(e)
   	  first=e.originalEvent.changedTouches[0].clientX;
   	  console.log(first);
   })
    ul.on("touchend","li",function(e){
   	  last=e.originalEvent.changedTouches[0].clientX;
   	  console.log(last)
   	  if(last-first>50)
   	  {
   	  	$(this).removeClass("on");
   	  	$(this).addClass("done");
   	  	console.log(todos[$(this).index()].state)
   	  	todos[$(this).index()].state=1;
   	  	console.log(todos[$(this).index()].state)
   	  	localStorage.x=JSON.stringify(todos);
   	  }
   	  
   	  if(last-first<-50)
   	  {
   	  	$(this).removeClass("done");
   	  	$(this).addClass("on");
   	  	console.log(todos[$(this).index()].state)
   	  	todos[$(this).index()].state=0;
   	  	console.log(todos[$(this).index()].state)
   	  	localStorage.x=JSON.stringify(todos);
   	  }
   	  
   })
    
    
    //已完成与未完成
    var divs=$(".footer div");
    console.log(divs)
    $(".all").on("touchend",function(){
    	divs.removeClass("active");
    	$(this).addClass("active");
    	$("li").show();
    })
    $(".yi").on("touchend",function(){
    	divs.removeClass("active");
    	$(this).addClass("active");
    	$("li").show();
    	$(".on").hide();
    })
    $(".wei").on("touchend",function(){
    	divs.removeClass("active");
    	$(this).addClass("active");
    	$("li").show();
    	$(".done").hide();
    })
    
    //返回事件
    tu.on("touchend",function(){
    	add.css("display","block");
		header.css("display","block");
		bg.css("display","none");
		ul.css("display","block");
    })
    
})

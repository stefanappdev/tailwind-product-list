//scripts.js







//produces html nodelist
let incrementbtnslist=document.querySelectorAll(`.add-to-cart-btn .increment-qty`);
let qtyslist=document.querySelectorAll(`.qty`);
let decrementbtnslist=document.querySelectorAll(`.add-to-cart-btn .decrement-qty`);

//Function that converts html nodelist to Array
const ConvertNLtoArr=(nl)=>[...nl];

const incrementbtns=ConvertNLtoArr(incrementbtnslist);
const decrementbtns=ConvertNLtoArr(decrementbtnslist);
const qtys=ConvertNLtoArr(qtyslist);
	
for(let x=0;x<qtys.length;x++){
	
	incrementbtns[x].id=`increment-btn-${x}`;
	decrementbtns[x].id=`decrement-btn-${x}`;
	qtys[x].id=`item-${x}-qty`;
	
	incrementbtns[x].addEventListener("click",()=>{
		let newval=parseInt(qtys[x].textContent)+1;
		qtys[x].textContent=newval.toString();
	});
	
	decrementbtns[x].addEventListener("click",()=>{
		if(parseInt(qtys[x].textContent)===0){return}
		let newval=parseInt(qtys[x].textContent)-1;
		qtys[x].textContent=newval.toString();
		
	})
}
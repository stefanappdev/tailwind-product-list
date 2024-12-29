//index.js


// class and functions for shoppingCart



class shoppingCart{
	
	
	constructor(cart){
		this.cart=cart;
	}
	
	
	
	//check if cart empty
	isEmpty(){
		if (this.cart.length===0){
			return true;
		}else{
			return false;
		}
	}
	
	
	findItem(id){
		//search for item and return it if it exists
	return(this.cart.find(ele=>ele.id===id))
	}
	
	
	//function to add item to cart
	
	addItem(itemName,id,price){
	
	let newItem={id:id,name:itemName,price:price,qty:1};
	//to be  completed
	//add item to cart when empty
		
		
		if(this.isEmpty()){
			this.cart=[...this.cart,newItem];
			console.log(this.cart)
		}else{
			if(this.findItem(id)){
				console.log("Item already in trolley");
			}else{
				this.cart=[...this.cart,newItem];
				console.log(this.cart)
			}
			
		}
		
		
	}
	
	
	
	//updateItem and deleteItem functions needed^


	showCartlength(){
			 return this.cart.length;
		}

}

let CART=new shoppingCart([]);


//produces html nodelist
let incrementbtnslist=document.querySelectorAll(`.add-to-cart-btn .increment-qty`);
let addtocartbtnslist=document.querySelectorAll(`.add-to-cart-btn-empty`);
let menuitms=document.querySelectorAll(".desert-menu-item");
let qtyslist=document.querySelectorAll(`.qty`);
let item_names=document.querySelectorAll(".item-name");
let decrementbtnslist=document.querySelectorAll(`.add-to-cart-btn .decrement-qty`);
let priceslist=document.querySelectorAll(".prices");
//Function that converts html nodelist to Array
const ConvertNLtoArr=(nl)=>[...nl];

let incrementbtns=ConvertNLtoArr(incrementbtnslist);
let decrementbtns=ConvertNLtoArr(decrementbtnslist);
let addTocartbtns=ConvertNLtoArr(addtocartbtnslist);
let menuitems=ConvertNLtoArr(menuitms);
let qtys=ConvertNLtoArr(qtyslist);
let prices=ConvertNLtoArr(priceslist);
let names=ConvertNLtoArr(item_names);


		
			
			
			
//btns to increase qty of items to trolley	
for(let x=0;x<qtys.length;x++){
	
	incrementbtns[x].id=`increment-btn-${x}`;
	decrementbtns[x].id=`decrement-btn-${x}`;
	addTocartbtns[x].id=`add-to-cart-btn-${x}`;
	qtys[x].id=`item-${x}-qty`;
	
	
    addTocartbtns[x].addEventListener("click",()=>CART.addItem(names[x].textContent,menuitems[x].id,prices[x].textContent));
	
	//Function to increase qty
	
	incrementbtns[x].addEventListener("click",()=>{
		 
			let newval=parseInt(qtys[x].textContent)+1;
			qtys[x].textContent=newval.toString();
			
	});
	
	
	//Function to decrease qty
	decrementbtns[x].addEventListener("click",()=>{
		if(parseInt(qtys[x].textContent)===0){return}
		let newval=parseInt(qtys[x].textContent)-1;
		qtys[x].textContent=newval.toString();
		
	})
	
	
	
	
}
	
//index.js






//produces html nodelist
let incrementbtnslist=document.querySelectorAll(`.counter-btn .increment-qty`);
let addtocartbtnslist=document.querySelectorAll(`.add-to-cart-btn`);
let counterbtnslist=document.querySelectorAll(`.counter-btn`);
let menuitms=document.querySelectorAll(".desert-menu-item");
let counterqtyslist=document.querySelectorAll(`.qty`);
let item_names=document.querySelectorAll(".item-name");
let decrementbtnslist=document.querySelectorAll(`.counter-btn .decrement-qty`);
let priceslist=document.querySelectorAll(".prices");


//Function that converts html nodelist to Array
const ConvertNLtoArr=(nl)=>[...nl];

let incrementbtns=ConvertNLtoArr(incrementbtnslist);
let decrementbtns=ConvertNLtoArr(decrementbtnslist);
let addTocartbtns=ConvertNLtoArr(addtocartbtnslist);
let menuitems=ConvertNLtoArr(menuitms);
let counters=ConvertNLtoArr(counterbtnslist);

let counterqtys=ConvertNLtoArr(counterqtyslist);
let prices=ConvertNLtoArr(priceslist);
let names=ConvertNLtoArr(item_names);

//selectors for shoppingCart
let cartmenu=document.querySelector("#cart-menu");
let cart=document.querySelector("#cart");
let emptycart_img=document.querySelector("#cart-empty-img");	
let emptycart_text=document.querySelector("#cart-empty-text");
let cartcounter=document.querySelector("#cart-counter");				



//btns to increase qty of items to trolley	
for(let x=0;x<counterqtys.length;x++){
	
	incrementbtns[x].id=`increment-btn-${x}`;
	decrementbtns[x].id=`decrement-btn-${x}`;
	addTocartbtns[x].id=`add-to-cart-btn-${x}`;
	counterqtys[x].id=`item-${x}-qty`;
	
	
    addTocartbtns[x].addEventListener("click",()=>{
		
		CART.addItem(names[x].textContent,menuitems[x].id,prices[x].textContent)
		addTocartbtns[x].style.display="none";
		counters[x].style.display="inline-flex";
		counters[x].style.margin="0 auto 0 auto";
		counters[x].style.transform="translateY(-20px)";
		counters[x].style.alignItems="center";
		counters[x].style.justifyContent="center";
		})
	
	
	//Function to increase qty
	
	incrementbtns[x].addEventListener("click",()=>{
		 
			let newval=parseInt(counterqtys[x].textContent)+1;
			counterqtys[x].textContent=newval.toString();
			
	});
	
	
	//Function to decrease qty
	decrementbtns[x].addEventListener("click",()=>{
		if(parseInt(qtys[x].textContent)===0){return}
		let newval=parseInt(counterqtys[x].textContent)-1;
		counterqtys[x].textContent=newval.toString();
		
	})
	
	
	
}





// class and functions for shoppingCart

class shoppingCart{
	
	
	constructor(cart,isActive=false){
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
	
		let newItem={id:id,name:itemName,price:price,qty:0};
		//to be  completed
		//add item to cart when empty
			
			
			if(this.isEmpty()){
				this.cart=[...this.cart,newItem];
				this.setisActive(true);
			    console.log(this.cart)
			}else{
				if(!this.findItem(id)){
					this.cart=[...this.cart,newItem];
					console.log(this.cart)
				}
				
			}
		}
	
	//function to track trolley activity when items are present
	    setisActive(state){
		
			if(state===true){
			this.isActive=true;
			emptycart_img.style.display="none";
			emptycart_text.style.display="none";
			}else if(this.isEmpty){
				this.isActive=false;
				emptycart_img.style.display="block";
				emptycart_text.style.display="block";
			}
		}
		
	
	
	
	
	//updateItem and deleteItem functions needed^


	

}

//creates a new instance of a shoppingCart

const CART=new shoppingCart([]);




				
			

	



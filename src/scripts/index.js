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
	counters[x].id=`counter-btn-${x}`;
	incrementbtns[x].id=`increment-btn-${x}`;
	decrementbtns[x].id=`decrement-btn-${x}`;
	addTocartbtns[x].id=`add-to-cart-btn-${x}`;
	counterqtys[x].id=`item-${x}-qty`;
	
	
    addTocartbtns[x].addEventListener("click",()=>{
		let price=prices[x].textContent.slice(1,);
		CART.addItem(names[x].textContent,menuitems[x].id,price)
		addTocartbtns[x].style.display="none";
		counters[x].style.display="inline-flex";
		counters[x].style.margin="0 auto 0 auto";
		counters[x].style.transform="translateY(-20px)";
		counters[x].style.alignItems="center";
		counters[x].style.justifyContent="center";
		console.log("totalitems:",CART.getTotalItems())
		})
	
	
	//Function to increase qty
	
	incrementbtns[x].addEventListener("click",()=>{
		 
			let newval=parseInt(counterqtys[x].textContent)+1;
			counterqtys[x].textContent=newval.toString();
			let item=CART.findItem(x.toString());
			
			//console.log("your item:",item)
			//console.log("your id:",x)
			
			//#update cart Array and cart item in trolley
			if (item){
				item.qty=parseInt(counterqtys[item.id].textContent);
				console.log(CART.showContents());
				
				let item_id=`#cart-item-${item.id}`;
				let cartItem=document.querySelector(item_id);
				let item_summary=document.querySelector(`#summary-item-${item.id}`)
				item_summary.textContent=`${item.qty}x @${item.price} ${(item.price*item.qty).toString()}`;
				CART.increaseTotalItems()
				console.log("totalitems:",CART.getTotalItems())
			}
			
	});
	
	
	//Function to decrease qty
	decrementbtns[x].addEventListener("click",()=>{
		if(parseInt(counterqtys[x].textContent)===1){return}
		let newval=parseInt(counterqtys[x].textContent)-1;
		counterqtys[x].textContent=newval.toString();
		
		//console.log("your item:",item)
			//console.log("your id:",x)
			
			//#update cart Array and cart item in trolley
			let item=CART.findItem(x.toString());
			
			if (item){
				item.qty=parseInt(counterqtys[item.id].textContent);
				
				
				let item_id=`#cart-item-${item.id}`;
				let cartItem=document.querySelector(item_id);
				let currentprice=item.price*item.qty;
				let item_summary=document.querySelector(`#summary-item-${item.id}`)
				item_summary.textContent=`${item.qty}x @${item.price} ${(item.qty>1?currentprice-item.price:item.price).toString()}`;
				CART.decreaseTotalItems();
				console.log("totalitems:",CART.getTotalItems())
			}
	})
	
	
	
}





// class and functions for shoppingCart

class shoppingCart{
	
	
	constructor(cart,isActive=false,totalitems=0){
		this.cart=cart;
		this.totalitems=totalitems;
	}
	
	
	
	//check if cart empty
	isEmpty(){
		if (this.cart.length===0){
			return true;
		}else{
			return false;
		}
	}
	
	//updateItem and deleteItem(complete) functions needed^
	
	//delete item from cart
	deleteItem(id){
		let updatedcart;
		if(this.findItem(id)){
			updatedcart=this.cart.filter(item=>item.id!=id);
			this.decreaseTotalItems(this.findItem(id).qty)
			this.removeCartMenuItem(id);
			this.cart=[...updatedcart];
			console.log(this.cart)
			
				
		}
		
		
	}
	
	
	//removes items from cart menu listing and resets buttons 
	removeCartMenuItem(id){
		
		
		let itmtodelete=document.querySelector(`#cart-item-${id}`);
		let addtocartbtn=document.querySelector(`#add-to-cart-btn-${id}`);
		let counter=document.querySelector(`#counter-btn-${id}`);
		let countervalue=document.querySelector(`#counter-btn-${id} strong`);
		cartmenu.removeChild(itmtodelete);
		counter.style.display="none";
		countervalue.textContent="1";
		addtocartbtn.style.display="inline-flex";
		addtocartbtn.style.margin="0 auto 0 auto";
		addtocartbtn.style.transform="translateY(-20px)";
		
		
	}
	
	
	//adds new items to cart menu listing  
	addCartMenuItem(item){
		let cartmenu_div=document.createElement("div");
		let itemName=document.createElement("span");
		let summary=document.createElement("span");
		let deletebtn=document.createElement("a");
		let itemTotalPrice=item.qty*item.price;
		console.log(itemTotalPrice);
		itemName.textContent=item.name;
		cartmenu_div.classList.add("cart-menu-item");
		cartmenu_div.id=`cart-item-${item.id}`;
		deletebtn.textContent="delete";
		deletebtn.addEventListener("click",()=>this.deleteItem(item.id));
		summary.id=`summary-item-${item.id}`;
		summary.textContent=`${item.qty}x @${item.price} ${itemTotalPrice.toString()}`;
		cartmenu_div.appendChild(itemName);
		cartmenu_div.appendChild(deletebtn);
		cartmenu_div.appendChild(summary);
		cartmenu.appendChild(cartmenu_div);
		
	}
	
	findItem(id){
		//search for item and return it if it exists
		let cartitm= this.cart.find(ele=>ele.id===id);
		if(!cartitm){
			return false;
		}else{
		return cartitm;
		}
	}
	
	
	//function to add item to a cart
	
	addItem(itemName,id,price){
	
	
		let newItem={id:id,name:itemName,price:parseFloat(price),qty:1};
		//to be  completed
		//add item to cart when empty
			
			
			if(this.isEmpty()){
				this.cart=[...this.cart,newItem];
				this.setisActive(true);
			    console.log(this.cart)
				this.addCartMenuItem(newItem);
				this.increaseTotalItems()
				
				
			}else{
				if(!this.findItem(id)){
					this.cart=[...this.cart,newItem];
					console.log(this.cart)
					this.addCartMenuItem(newItem);
					this.increaseTotalItems()
					
					
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
		
		//reveals contents of CART array
		showContents(){
			return(this.cart);
		}
	
		increaseTotalItems(amt=1){
			this.totalitems+=amt;
		}
	
		decreaseTotalItems(amt=1){
			this.totalitems-=amt;
		}
		
		getTotalItems(){
			return this.totalitems;
		}

}

//creates a new instance of a shoppingCart

const CART=new shoppingCart([]);




				
			

	



({
	deleteCartItem : function(component, event, helper) {
		var cartItemId = event.currentTarget.id;
      
        var action = component.get('c.deleteItem');
        action.setParams({
            "CartItemId" : cartItemId
        });
        action.setCallback(this, function(response){
            var state = response.getState();
           
            if(state === 'SUCCESS'){
                $A.get('e.force:refreshView').fire(); 
            }else{
                
            }
        });
        $A.enqueueAction(action);
	}
})

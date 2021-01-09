({
    doInit : function(component, event, helper) {
        var pageReference = component.get('v.pageReference');
        if(pageReference){
            var state = pageReference.state;
            if(state.c__cartId){
                console.log(' CartId ' ,state.c__cartId);
                var action = component.get('c.getCartItems');
                action.setParams({
                    'CartId' : state.c__cartId
                });
                action.setCallback(this, function(response){
                    var stateResponse = response.getState();
                    if(stateResponse === 'SUCCESS' || stateResponse === 'DRAFT'){
                        var resultData = response.getReturnValue();
                        console.log(' resultData ' , resultData.length);
                        var items = [];
                        var subTotal;
                        for(var key in resultData){
                            items.push(resultData[key]);
                            if(subTotal)
                                subTotal = subTotal + resultData[key].Total_Amount__c
                            else
                                subTotal = resultData[key].Total_Amount__c
                        }
                        component.set('v.subTotal', subTotal);
                      
                        component.set('v.cartItemList', items);
                    }else if(stateResponse === 'INCOMPLETE'){
                        console.log('User is offline System does not support offline');
                    }else if(stateResponse ==='ERROR'){
                        var errors = response.getError();
                        if(errors || errors[0].pageMessage){
                            console.log(' page Error ', errors[0].pageMessage);
                        }
                        if(errors || errors[0].duplicateResults){
                            console.log(' duplicate Error ', errors[0].duplicateResults);
                        }
                    }else{
                        
                    }
                });
                $A.enqueueAction(action);
            }
        }
    },
    doCheckout : function(component, event, helper){
        component.set('v.isOpen', true);
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Booking__c" 
          
        });
        createRecordEvent.fire();
    },
    
    closeModel: function(component, event, helper) {
        component.set("v.isOpen", false);
    },
    
    likenClose: function(component, event, helper) {
        component.set("v.isOpen", false);
    },
    
})

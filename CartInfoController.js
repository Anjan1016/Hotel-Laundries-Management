({
    goToCart : function(component, event, helper) {
        console.log('hi');
        var action = component.get('c.getCartId');
        // debugger;
        action.setParams({
            'linenList' : component.get('v.linenNameList')
            
            
        });
        action.setCallback(this, function(response){
            console.log('hi');
            var state = response.getState();
            //debugger;
            if(state === 'SUCCESS' || state === 'DRAFT'){
                console.log('hi');
                
                var pageReference = component.find("navigation");
                var pageReferenceNav = {    
                    "type": "standard__component",
                    "attributes": {
                        "componentName": "c__CartDetail"    
                    },    
                    
                    "state": {
                        "c__cartId": response.getReturnValue()
                    
                    }
                   
                };
                // console.log(cartId);
                pageReference.navigate(pageReferenceNav, true);
                 
                
            }else if(state === 'INCOMPLETE'){
                console.log('User is offline System does not support offline');
            }else if(state ==='ERROR'){
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
    },
    
    createCartItems : function(component, event, helper){
        console.log(' Selected part ', component.get('v.linenList'));
        var names = [];
        for(var i=0; i<component.get('v.linenList').length;  i++){
            names.push(component.get('v.linenList')[i].Id);
        }
        //console.log(names);
        //console.log(v.linenNameList);
        component.set('v.linenNameList', names);
    },
})

({
    doInit : function(component, event, helper){
        component.set("v.Company","Select...");
    var actionVar = component.get("c.fetchLinen");
    console.log(actionVar);
    actionVar.setCallback(this, function(response){
    if(response.getState() == 'SUCCESS'){
    var Results = response.getReturnValue();
    component.set('v.linenList', Results);
    console.log(Results);
} else {
 console.log('failed in getting parts');
}
}); 
$A.enqueueAction(actionVar);
},
   doChange : function(cmp, event, helper) {
        
        var varCompName=cmp.find("selectType").get("v.value");
        var action = cmp.get( "c.fetchLinensAsPerType" );
        action.setParams({
            compName : varCompName
        });
        action.setCallback(this, function( response ) {
            var state = response.getState();
            if ( state === "SUCCESS" ) {
                var filteredList=response.getReturnValue();
                cmp.set("v.linenList",filteredList);
            }else{
                console.log('error');
            }
        });
        $A.enqueueAction( action );
    },
    doChange1 : function(cmp, event, helper) {
        
        var varCompName=cmp.find("selectSubType").get("v.value");
        var action = cmp.get( "c.fetchLinensAsPerSubType" );
        action.setParams({
            compName : varCompName
        });
        action.setCallback(this, function( response ) {
            var state = response.getState();
            if ( state === "SUCCESS" ) {
                var filteredList=response.getReturnValue();
                cmp.set("v.linenList",filteredList);
            }else{
                console.log('error');
            }
        });
        $A.enqueueAction( action );
    },
     addToCart : function(component, event, helper) {
		var eventSource = event.getSource();
        var partId = eventSource.get('v.name');
        var index = eventSource.get('v.value');
        var selectedpart = component.get('v.linenList')[index];
         console.log(selectedpart);
       
        var addToCartEvent = component.getEvent('addToCart');
        addToCartEvent.setParams({
            linenRecord : selectedpart
        });
        addToCartEvent.fire();
    },
})

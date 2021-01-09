({
    updateCart : function(component, event, helper) {
        var params = event.getParam('arguments');
        var linenRecord = params.linenRecord;
        console.log(linenRecord);
        if(params){
            var linenRecord = params.linenRecord;
            var existingRecords = component.get('v.linenList');
            if(existingRecords){
                existingRecords.push(linenRecord);
                component.set('v.linenList', existingRecords);
            } else {
                existingRecords = [];
                existingRecords.push(linenRecord);
                component.set('v.linenList', existingRecords);
            }
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Success!",
                "type" : "success",
                "message": linenRecord.Name+ " has been added to the bag."
            });
            toastEvent.fire();
        }
    }
})

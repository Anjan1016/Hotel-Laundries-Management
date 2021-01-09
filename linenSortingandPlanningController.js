({
    updateCart : function(component, event, helper){
        var params = event.getParam('linenRecord');
        var headerComp = component.find('headerComp');
        headerComp.updateCart(params);
    }
})

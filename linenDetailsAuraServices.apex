public class linenDetailsAuraServices {
@AuraEnabled
    public static String createCartItems(List<String> linenList, String cartId){
        List<Cart_Item__c> cartItemList = new List<Cart_Item__c>();
        List<Cart_Item__c> cartItemToUpdate = new List<Cart_Item__c>();
        Map<Id, Cart_Item__c> linenQntyMap = getCartItems(cartId);
        For(String linen : linenList){
            if(linenQntyMap != null && linenQntyMap.containsKey(linen)){
                Cart_Item__c it = linenQntyMap.get(linen);
                Cart_Item__c item = new Cart_Item__c(
                    Item_Quantity__c = it.Item_Quantity__c+1,
                    Id = it.Id
                );
                cartItemToUpdate.add(item);
            }else{
                Integer Qty = 1;
                Cart_Item__c item = new Cart_Item__c(
                    Cart__c = cartId,
                    Linen__c = linen,
                    Item_Quantity__c = Qty
                );
                cartItemList.add(item);
            }
        }
        insert cartItemList;
        if(cartItemToUpdate != null && cartItemToUpdate.size() > 0)
            update cartItemToUpdate;
        return cartId;
    }
    
    @AuraEnabled 
    public static String getCartId(List<String> linenList){
        List<Cart__c> cartList = getCart();
        if(cartList != null && cartList.size() > 0){
            createCartItems(linenList, cartList[0].Id);
                                system.debug('cartlist1:'+cartList[0].Id);

            return cartList[0].Id;

            
        }else{
            Cart__c cart = new Cart__c(Cart_Id__c=String.valueOf(Math.random()),
                                      Cart_Status__c='Open', Is_Active__c=true, User__c = UserInfo.getUserId());
            insert cart;
            createCartItems(linenList, cart.Id);
            return  cart.Id;
        }
    }
    private static List<Cart__c> getCart(){
        List<Cart__c> cartList = [Select Cart_Id__c, Name From Cart__c Where User__c=: UserInfo.getUserId() AND Is_Active__c = true];
        system.debug('cartlist:'+cartList);
        return cartList;

    }
    
    @AuraEnabled
    public static Map<Id, Cart_Item__c> getCartItems(String CartId){
        List<Cart_Item__c> existingItemList = [Select Id, Name, Item_Quantity__c,Total_Amount__c, Linen__c, Linen__r.Name From Cart_Item__c 
                                               Where Cart__c =: cartId];
        Map<Id, Cart_Item__c> linenQntyMap = new Map<Id, Cart_Item__c>();
        For(Cart_Item__c item : existingItemList){
            if(!linenQntyMap.containsKey(item.Linen__c)){
                linenQntyMap.put(item.Linen__c, item);
            }
        }
        return linenQntyMap;
    }
    
    @AuraEnabled
    public static void deleteItem(String CartItemId){
        Database.delete(CartItemId);
    }  
}

export class UUID {
    private static instance:UUID = new UUID();
    public static getInstance():UUID{
        return UUID.instance;
    }

    public genUUID():string{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, 
            function(c) 
            {
                var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
    }
}
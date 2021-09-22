import Principal "mo:base/Principal";

module {

    public type Memo = {   
        id : Int; 
        userId: Principal;
        title: Text;
        note: Text;
        status: Int;
        createdAt : Int;
        updatedAt: Int;
    };

    public type InputMemo = {
        id : Int;
        title: Text;
        note: Text;
        status : Int;
    };
 

}
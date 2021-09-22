import DB "./db";
import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Int "mo:base/Int";

actor Memo {


type DBMemo = DB.Memo;
type InputMemo = DB.InputMemo;
type MemoError = { #message : Text;};
private stable var counter: Int = 0;
    // Application state
private stable var entries : [(Int, DBMemo)] = [];

private var userMemos = HashMap.fromIter<Int,DBMemo>(entries.vals(), 10, Int.equal, Int.hash);

system func preupgrade() {
    entries := Iter.toArray(userMemos.entries());
};

system func postupgrade() {
    entries := [];
};

public shared(msg) func create(inputMemo : InputMemo) : async Result.Result<DBMemo, MemoError>{
        // Get caller principal
        counter := counter + 1;
       let createMemo = {
            id = counter;
            userId = msg.caller;
            title = inputMemo.title;
            note = inputMemo.note;
            status =  inputMemo.status; // Created 
            createdAt = Time.now();
            updatedAt = Time.now();
       };
      userMemos.put(counter,createMemo);
     #ok(createMemo);
    }; 

    public query(msg) func getUserMemos(): async [(Int, DBMemo)] {
    var userAllMemos = HashMap.HashMap<Int,DBMemo>(1, Int.equal, Int.hash);
        for ( (key, userMemo) in  userMemos.entries()) {
                if(userMemo.userId == msg.caller){
                   userAllMemos.put(userMemo.id ,userMemo );
                }
        };
        Iter.toArray(userAllMemos.entries());
    };

    public query(msg) func getPublishedData(): async [(Int, DBMemo)] {
        var publishedData = HashMap.HashMap<Int,DBMemo>(1, Int.equal, Int.hash);
        for ( (key, userMemo) in  userMemos.entries()) {
                if(userMemo.status == 1){
                   publishedData.put(userMemo.id ,userMemo );
                }
        };
        Iter.toArray(publishedData.entries());
    };


    public query(msg) func getMemoById(id : Int): async Result.Result<DBMemo, MemoError> {
      var existing = userMemos.get(id);
       switch (existing) {
            case (?existing) { 
                 #ok(existing);
            };
             case (null) {
                #err(#message("No Memo Found"));
            };
       };
     
    };

    public shared(msg) func update(inputMemoUpdate : InputMemo) : async Result.Result<DBMemo, MemoError>{
        var existing = userMemos.get(inputMemoUpdate.id);
        switch (existing) {
            case (?existing) { 
                if(msg.caller != existing.userId) {
                    #err(#message("Only The Owner Can Update Memo"));
                }else {
                    let newMemo : DBMemo = {
                        id = existing.id;
                        userId = msg.caller;
                        title = inputMemoUpdate.title;
                        note = inputMemoUpdate.note;
                        status =  inputMemoUpdate.status;  
                        createdAt = existing.createdAt;
                        updatedAt = Time.now();
                    };
                    userMemos.put(inputMemoUpdate.id,newMemo);
                    #ok(newMemo);
                };
             };
            case (null) {
                #err(#message("No Memo Found"));
            };
        }; 
    }; 
}

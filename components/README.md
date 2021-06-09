## Prifina Components 

 How  to import?
 
import { usePrifina } from "@prifina/hooks";
 

It’s good to use the ‘latest’ for version number to stay in touch with latest releases.

 "@prifina/hooks": "latest",
 
### usePrifina

The usePrifina hook allows the use of Prifina’s custom context value.

Creates custom context object using PrifinaContext. After it returns current memoized value of prifinaContext object with help of React’s useMemo.

Memoized means that the cached value of a complex function is called. If the arguments of the function that is called are the same, computing of the function is not needed again it just simply uses stored value.

export const usePrifina = () => {
 const prifinaContext = useContext(PrifinaContext);
 const prifina = useMemo(() => {
   return prifinaContext.current;
 }, [prifinaContext]);
 return prifina;
};
 
### How is it used?

const {
   check,
   currentUser,
   getLocalization,
   getSettings,
   setSettings,
   getCallbacks,
   registerClient,
   API,
   Prifina,
 } = usePrifina();

 const widget = new Prifina({ appId: "name" });

### What can be used for usePrifina hook? 
 
providerContext.current = {
   check,
   activeRole,
   setSettings,
   getSettings,
   getLocalization,
   onUpdate,
   getCallbacks,
   currentUser,
   subscriptionTest,
   unSubscribe,
   Prifina,
   registerHooks,
   registerClient,
   registerRemoteClient,
   API: API.current,
 
 };
 
Usage
 
const appID = "yourWidgetName";
 
// init hook and get provider api services...
  const { 
   onUpdate, 
   Prifina,
   API,
   registerHooks,
   onUpdate,
   currentUser,
   subscriptionTest,
   unSubscribe,
 } = usePrifina();
 
 // init provider api with your appID
 const prifina = new Prifina({ appId: appID });
 
 
onUpdate usage
useEffect(async () => {
   // init callback function for background updates/notifications
   onUpdate(appID, dataUpdate);
   // register datasource modules
   registerHooks(appID, [hook]);
   ...}
 
### Example of usage in Chat app
 
useEffect(async () => {
   onUpdateRef.current = onUpdate(appID, updateTest);
   const addressBook = await prifina.core.queries.getAddressBook();
 
   if (typeof addressBook.data.getUserAddressBook.addressBook === "string") {
     const contactList = JSON.parse(
       addressBook.data.getUserAddressBook.addressBook
     );
     contactList.forEach((c) => {
       messageCount.current[c.uuid] = 0;
     });
     setContacts(contactList);
   } else {
     const contactList = addressBook.data.getUserAddressBook;
     contactList.forEach((c) => {
       messageCount.current[c.uuid] = 0;
     });
     setContacts(contactList);
   }
   await prifina.core.subscriptions.addMessage(onUpdateRef.current);
 
   console.log(prifina);
 }, []);
 
 
.... later on
 
         <MessageBox>
           {messages.length > 0 && (
             <MessageList
               messages={messages}
               sender={currentUser.uuid}
               senderName={currentUser.name}
               receiverName={contacts[selectedContact.current].name}
             />
           )}
         </MessageBox>
 
 
 
 
 
## Query Builder Data Connectors

Examples of custom query builder data connectors for data usage
Op

const Op = {
 eq: Symbol.for("="),
 ne: Symbol.for("!="),
 gte: Symbol.for(">="),
 gt: Symbol.for(">"),
 lte: Symbol.for("<="),
 lt: Symbol.for("<"),
 
 and: Symbol.for(" and "),
 or: Symbol.for(" or "),
 not: Symbol.for(" not "),
 
 like: Symbol.for(" like "),
 in: Symbol.for(" in "),
 between: Symbol.for(" between "),
};


_fn

function _fn(fnName, fnCol, fnOpts) {
 }


buildFilter

function buildFilter(filter) {
 let s = "";
 const logicalOperators = Object.getOwnPropertySymbols(filter);
 if (logicalOperators.length > 0) {
   let logicalOP = logicalOperators[0];
   Object.keys(filter[logicalOP]).forEach((k, ii) => {
     Object.getOwnPropertySymbols(filter[logicalOP][k]).forEach((e, i) => {
       if (ii > 0) {
         s += Symbol.keyFor(logicalOP) + k;
       } else {
         s += k;
       }
       s = opCheck(s, e, filter[logicalOP][k][e]);
     });
   });
 } else {
   Object.keys(filter).forEach((k) => {
     s += k;
     Object.getOwnPropertySymbols(filter[k]).forEach((e, i) => {
       if ([Op.and, Op.or, Op.not].indexOf(e) > -1) {
         let logicalOP = e;
         Object.getOwnPropertySymbols(filter[k][e]).forEach((ee, ii) => {
           if (ii > 0) {
             s += Symbol.keyFor(logicalOP) + k;
           }
           s = opCheck(s, ee, filter[k][e][ee]);
         });
       } else if (i > 0) {
         //console.log("ERROR 1");
         throw new Error("Logical operator error");
       } else {
         s = opCheck(s, e, filter[k][e]);
       }
 
       //s += Symbol.keyFor(e) + filter[k][e];
     });
     //console.log(Object.getOwnPropertySymbols(filter));
     /*
 Object.keys(filter[k]).forEach((o) => {
   console.log("OP ", o);
 });
 */
   });
 }
 return s;
}


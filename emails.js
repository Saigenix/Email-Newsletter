// setup encryption for this
const { initializeApp ,applicationDefault ,cert} = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
require("dotenv").config();

// console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
initializeApp({
    credential:cert( JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
});


const db = getFirestore();
module.exports.getData = async ()=>{
    var EmailList = []
    const snapshot = await db.collection('emails').get();
    snapshot.forEach((doc) => {
    //   console.log(doc.id, '=>', doc.data());
      EmailList.push(doc.data())
    });
    return EmailList;
}



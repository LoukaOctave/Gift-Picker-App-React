import firebase from "./components/Firebase.js";

const db = firebase.firestore();
export class FirestoreFunctions {
  
  readEvent(eventID) {
    var docRef = db.collection("Events").doc(eventID);
    var html;
    docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        html = '<div>' +
            '<ul className="collection with-header">' +
              '<li className="collection-header"><h4>{doc.data().title}</h4></li>' +
              '<li className="collection-item"><div>Date<span className="secondary-content">{doc.data().date}</span></div></li>' +
              '<li className="collection-item"><div>Start<span className="secondary-content">{doc.data().start}</span></div></li>' +
              '<li className="collection-item"><div>End<span className="secondary-content">{doc.data().end}</span></div></li>' +
              '<li className="collection-item"><div>Type<span className="secondary-content">{doc.data().type}</span></div></li>' +
              '<li className="collection-item"><div>Description<span className="secondary-content">{doc.data().description}</span></div></li>' +
            '</ul>' +
          '</div>';
      } else {
        // doc.data()() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    console.log(html);
  }

  /**
   * Returns an array of objects containing the ID and name of the events that take place on the given date
   * @param {Date} date The selected date for which you want to view the events
   * @returns 
   */
  getEventsForDate(date) {
    //db.collection("Events")
  }

}

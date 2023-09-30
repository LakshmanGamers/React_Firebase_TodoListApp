import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    // databaseURL : "https://newproject-77212-default-rtdb.asia-southeast1.firebasedatabase.app"
    databaseURL :"https://react-app-496e2-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app);

export {database};
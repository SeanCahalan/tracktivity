import { decorate, observable, computed, } from 'mobx';

export default class Store {

    user = observable({
        email: '',
        password: ''
    })

    constructor(){
        console.log("create store")
    }

    setUserInfo = (e) => {
        console.log(e.target.value)
        this.user = {
            ...this.user,
            [e.target.name]: e.target.value
        }
        console.log(this.user)
    }

    login = () => {
        console.log("LOGIN")
        window.firebase
            .auth()
            .signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(res => {
                let uid = window.firebase.auth().currentUser.uid;

                window.db
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then(function(doc) {
                        this.user = doc.data();
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
            })
            .catch(function(error) {
                console.log(error.message);
            });
    }

    signup = () => {
        console.log("SIGNUP")
        window.firebase
            .auth()
            .createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then(res => {
                let uid = res.user.uid;
                // need to add the auth id to the user object so that they can connect at login
                window.db
                    .collection("users")
                    .doc(uid)
                    .set({
                        email: this.user.email,
                        name: this.user.name
                    })
                    .then(res => {

                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    lineData = observable([])

    pushLineData = (data) => {
        this.lineData.push(data)
    }
}
  
// export default decorate(Store, {
//     user: observable,
//     login: action,

//     lineData: observable,
//     pushLineData: action
// })
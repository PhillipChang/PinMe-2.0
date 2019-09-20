  
//When the site loads...
$( function() {

  /*
     Global Variables for Sign In
  */ 

  //Modal content
  var inputEmail = $("#userEmail");
  var inputPassword = $("#userPassword");
  var loginBtn = $("#signIn"); //Login user through modal
  var signInError = $("#signInError"); //Prompt to change

  //Modal & nav-sign-in-button
  var signInModal = $("#signInModal"); //the modal to open
  var navSignInOut = $("#navSignInOut"); //opens modal

  //SavedClasses Href uuid
  $("#savedClasses").on("click", function(event) {
    // var uuid = sessionStorage.getItem("uuid-savant")
    window.location.href=`/users/profile`;
  })

  //If auth has not been declared
  if (firebase.apps.length === 0) {
    //Load in the key from the server
    $.get("/api/key", function(firebaseConfig) {
      // Initialize Firebase and auth connections
      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();

      console.log(firebase.apps);

      /**
       * 
       * @param {Object} values is the email and password pair the user inputted to sign in.
       * 
       * Function logs the user in based on the values. Once completed, the state changed event listener is ran.
       */
      function signIntoSite(values) {
        auth.signInWithEmailAndPassword(values.email, values.pass).catch(err => {
          if (err.code === "auth/user-not-found") { signInError.text("Account not found. Have you signed up yet?") }
          else if (err.code === "auth/wrong-password") { signInError.text("Invalid password, please try again.") }
          else if (err.code === "auth/invalid-email") { signInError.text("Invalid email format! Proper format example: username@gmail.com") }
          else if (err.code === "auth/operation-not-allowed") return console.log("DEV TEAM: Enable Email/Pass Auth in Firebase Settings");
        })
      }
      
      function getAccountData(cb) {
        var email = inputEmail.val().trim();
        var pass = inputPassword.val().trim();

        if (!email) return signInError.text("Make sure to fill in your email!")
        else if (!pass) return signInError.text("Make sure to fill in your password!")
        else cb({email: email, pass: pass});
      }

      //The sign in/out button within the nav bar, changes function based on the text of the button.
      navSignInOut.on("click", function(event) {
        if (navSignInOut.text() === "Sign In") signInModal.show("slow");
        else auth.signOut();
      })

      //This will close the modal if someone doesn't want to sign in //

      $(".close").on("click", function() { $("#signInModal").hide("slow") });

      //The login button within the sign in modal
      loginBtn.on("click", function (event) {
        event.preventDefault();
        getAccountData(function(values) {
          if (values) signIntoSite(values)
        });
      })

      
    /*
      Global Variables for Sign Out
    */ 

    
      /**
       * 
       * @param {Object} values is the email and password pair the user inputted to sign in.
       * 
       * Function creates the user based on the values and sends the new profile to the server.
       */
      function createUser(values) {
        auth.createUserWithEmailAndPassword(values.email, values.pass).then(user => {
          //Do something when user logs in for the first time
          console.log(user);
          $.post("/api/users/register", {email: values.email, uuid: user.uid}, function(data) {
            console.log(data);
            signInModal.hide("slow");
          })
        }).catch(err => {
          if (err.code === "auth/weak-password") {passHelp.text(err.message)}
          else if (err.code === "auth/email-already-in-use") { 
            signIntoSite(values)
//            // signUpError.text("Authentication already created, continue."); 
          }
          else console.log(err)
        })
      }

    //Sign up Page
    var signUpEmail = $("#newUserEmail");
    var signUpPassword = $("#newUserPassword");
    var signUpBtn = $("#signUp"); //Register user on sign up page
    var signUpError = $("#signUpError");
    
    //The sign up button within the page
    signUpBtn.on("click", function (event) {
      event.preventDefault();

      //Firebase email/pass
      var values = {
        email: signUpEmail.val().trim(),
        pass: signUpPassword.val().trim()
      };

      //firebase checking
      (!values.email) ? signUpError.text("Make sure to fill in the email!") : 
        (!values.pass) ? signUpError.text("Make sure to fill in your password!") : 
          createUser(values);
    })

      //Whenever the account changes state between signed in / out
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(`${user.email} just logged in.`);
          signInModal.hide("slow")
          //On the next click the button will sign out
          navSignInOut.text("Sign Out");
          sessionStorage.setItem("uuid-savant", auth.currentUser.uid)
        }
        else {
          console.log(`User needs to sign in.`); 
          //On the next click the button will sign in
          navSignInOut.text("Sign In");
          sessionStorage.removeItem("uuid-savant")
        }
      })//End of changeState listener

    })//end of key 
  }//end of if statement
})//End of html load
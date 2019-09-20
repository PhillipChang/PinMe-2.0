$(document).ready(function () {
    var classContainer = $(".class-container");
    var userProfile = $(".user-profile");

    async function getUser() {
        var uuid = await sessionStorage.getItem("uuid-savant");
        console.log(uuid);
        
        if (uuid) {
            $.get("/api/users/" + uuid, function(users) {
                console.log(users);
                if (users.length != 0) {
                    /*
                        Displaying username / avatar
                    */  
                    var profile = $("<div>");

                    var pic = $("<img>");
                    pic.attr("src", users.avatar);
                    pic.addClass("profilePic")

                    profile.append( pic );
                    profile.append(`<br><br>`)
                    profile.append(`<h5> Username: ${users.name} </h5>`)
                    profile.append(`<h5> Email: ${users.email} </h5>`)
                    profile.append(`<h5> Contact Info: ${users.contact} </h5>`)

                    userProfile.append(profile)

                     /*
                        Displaying classes being taught
                    */  
                    var uuid = sessionStorage.getItem("uuid-savant");
                    console.log(uuid);
                    
                    $.ajax({
                        type: "GET",
                        url: "/api/users/classes/" + uuid,
                        dataType: "json",
                        success: function (data) {
                            console.log("GOT CLASSES", data);
                            displayCards(data)
                        }
                        
                    })
                }
            })
        } //else there is no matching uuid for user data 
    }
    getUser();

    function displayCards(data) {
        for (i = 0; i < data.length; i++) {

            if (data.length === 0) {
                var noResult = $("<h3>Unfortunately, no classes exist")
                noResult.html("Unfortunately, no classes exist")
                cardSection.append(noResult)

            } else {

                var title = data[i].title;
                var date = data[i].date;
                var description = data[i].desc;
                var category = data[i].categ;
                var youtube = data[i].liveLink;


                var button = $("<button>Add Class</button>")
                button.addClass("btn btn-outline-secondary add-class")

                var card = $("<div>");
                card.addClass("card");

                var cardBody = $("<div>");
                cardBody.addClass("card-body");

                var cardFooter = $("<div>")
                cardFooter.addClass("card-footer");

                cardBody.append(`<h6> Title: ${title} </h6>`);
                cardBody.append(`<p> <strong>Category:</strong> ${category} </p>`);
                cardBody.append(`<p> <strong>Date:</strong> ${moment(date).format("LLLL")} </p>`);
                cardBody.append(`<p> <strong>Description:</strong> ${description} </p>`);

                card.append(youtube);
                card.append(cardBody);
                card.append(cardFooter);

                classContainer.append(card);

            }

        }
    }
})
var users = [
    {
        "name":"John",
        "tasks":[
            {
                "task_name":"Clean Beach",
                "comments":[]
            },
            {
                "task_name":"Clean Street",
                "comments":[]
            },
            {
                "task_name":"Mark area as Clean",
                "comments":[]
            },
            {
                "task_name":"User earned a Badge",
                "comments":[]
            }
        ]
    },
    {
        "name":"Reese",
        "tasks":[
            {
                "task_name":"Clean Beach",
                "comments":[]
            },
            {
                "task_name":"Clean Street",
                "comments":[]
            },
            {
                "task_name":"Mark area as Clean",
                "comments":[]
            },
            {
                "task_name":"User earned a Badge",
                "comments":[]
            }
        ]
    },
    {
        "name":"Harold",
        "tasks":[
            {
                "task_name":"Clean Beach",
                "comments":[]
            },
            {
                "task_name":"Clean Street",
                "comments":[]
            },
            {
                "task_name":"Mark area as Clean",
                "comments":[]
            },
            {
                "task_name":"User earned a Badge",
                "comments":[]
            }
        ]
    }
]

function loadUsers(){
    for(var i = 0; i < users.length; i++) {
        // Create the list item:
        var item = document.createElement('a');
        item.classList.add("user-name");
        item.classList.add("list-group-item");
        item.href = "./user.html?user_name="+users[i]["name"];
        // Set its contents:
        item.appendChild(document.createTextNode(users[i]["name"]));
        // Add it to the list:
        document.getElementById('users-list').appendChild(item);
    }
}

function loadUserTasks(){
    // get user name from parameters
    var url_string = window.location.href
    var url = new URL(url_string);
    var user_name = url.searchParams.get("user_name");

    // get user index in var users
    var index = 0;
    for(var i = 0; i < users.length; i++) {
        if(users[i]["name"] == user_name){
            index = i;
            break;
        }
    }
    for(var i = 0; i < users[index]["tasks"].length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        item.classList.add("task_name");
        item.classList.add("list-group-item");
        // Set its contents:
        var para = document.createElement("p");
        var node = document.createTextNode(users[index]["tasks"][i]["task_name"])
        para.appendChild(node);
        item.appendChild(para);

        // addin iput text box
        var input = document.createElement("input");
        input.type = "text";
        input.className = "comment-input";
        input.placeholder = "Comment";
        item.appendChild(input);

        // adding enter button
        var button = document.createElement("button");
        button.className = "comment-enter-btn";
        button.innerHTML = 'Enter';
        button.setAttribute("onClick", "enterComment(this)");
        item.appendChild(button);

        // adding comments if already present
        if(users[index]["tasks"][i]["comments"].length > 0){
            var comments_para = document.createElement("p");
            comments_para.innerHTML = "Comments:";
            var comments_string = '';
            for(var j = 0; j < users[index]["tasks"][i]["comments"].length; j++) {
                comments_string += users[index]["tasks"][i]["comments"][j]+', ';
            }
            comments_string  = comments_string.slice(0, -2);
            comments_para.innerHTML += comments_string;
            item.appendChild(comments_para);
        }

        // Add it to the list:
        document.getElementById('tasks-list').appendChild(item);
    }
    // setting user name
    var user_name_div = document.getElementById('user-name');
    user_name_div.innerHTML = users[index]["name"];
}

// called when ever enter button is clicked
function enterComment(e){
    var user_name = document.getElementById('user-name').innerHTML;
    console.log(e.parentElement)
    var comment = e.parentElement.children[1].value;
    var task_name = e.parentElement.children[0].innerHTML;

    if(comment.length > 0){
        // get user index in var users
        var index = 0;
        for(var i = 0; i < users.length; i++) {
            if(users[i]["name"] == user_name){
                index = i;
                break;
            }
        }

        var comments_para = document.createElement("p");
        comments_para.className = "comments-para";
        var comments_string = "Comments:";
        // iterate through users and then task and update comments
        for(var i = 0; i < users[index]["tasks"].length; i++) {
            if(users[index]["tasks"][i]["task_name"] == task_name){
                users[index]["tasks"][i]["comments"].push(comment);
                for(var j = 0; j < users[index]["tasks"][i]["comments"].length; j++) {
                    comments_string += users[index]["tasks"][i]["comments"][j]+', ';
                }
                comments_string  = comments_string.slice(0, -2);
            }
        }

        if( e.parentElement.children[3] == undefined){
            comments_para.innerHTML += comments_string;
            e.parentElement.appendChild(comments_para);
        }else{
            console.log("in else loop")
            console.log(comments_string)
            e.parentElement.children[3].innerHTML = comments_string;
        }


    }else {
        alert("Empty comment");
    }
}

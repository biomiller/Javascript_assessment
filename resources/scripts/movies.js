// http://www.omdbapi.com/?apikey=603a192c&

//http://www.omdbapi.com/?t=batman&y=2004

// http://img.omdbapi.com/?apikey=603a192c&

function makeRequest(method, url, body) {

    return new Promise(
        
        (resolve, reject) => {

        const req = new XMLHttpRequest();

        req.onload = () => {

            if (req.status >= 200 && req.status <= 299) {
                resolve(req.responseText);
            }
            else {
                const reason = new Error("Rejected");
                reject(reason);
            }
        }
        req.open(method, url);
        req.send(body);
    });
    
}



const buttonClickSearchMovies = () => {

    sessionStorage.setItem('search',`http://www.omdbapi.com/?apikey=603a192c&s=${document.getElementById("searchTerm").value}`)

     makeRequest("GET", sessionStorage.getItem('search'))
         .then((resolve) => {getMovies(resolve)})
         .catch(function (error) { console.log(error.message) })
};

function getMovies(input) {

    rawResponse = JSON.parse(input);

    data = rawResponse.Search;
   
    console.log(data);

    
    for (let i = 0; i < data.length; i++) {


        sessionStorage.setItem(('movie_'+i),(data[i].Title));

        if (document.contains(document.getElementById(i))) {
            document.getElementById("moviesTable").removeChild(document.getElementById(i));
            }

        let newRow = document.createElement('TR');

        newRow.id = i;

        document.getElementById("moviesTable").appendChild(newRow);

        let td1 = document.createElement('TD');
        document.getElementById(i).appendChild(td1);
        td1.innerText = data[i].Title;
        
        let td2 = document.createElement('TD');
        document.getElementById(i).appendChild(td2);
        td2.innerText = data[i].Year;
        
        let td3 = document.createElement('TD');
        document.getElementById(i).appendChild(td3);
        td3.innerText = data[i].Type;
        
        let td4 = document.createElement('TD');
        let moreButton = document.createElement("button")
        moreButton.id = data[i].Title
        moreButton.type = "button";
        moreButton.className = "btn";
        moreButton.onclick=buttonMoreDetails;
        moreButton.innerText = "More Details";
        td4.appendChild(moreButton)
        document.getElementById(i).appendChild(td4);

    }

}

const buttonMoreDetails = (e) => {
    sessionStorage.setItem("title", e.target.getAttribute('id'));
    location.href='more_details.html';
};

const getMoreDetails = () =>{

    document.getElementById("movieTitle").innerText = sessionStorage.getItem('title');
    document.getElementById('movieImage').src = `http://img.omdbapi.com/?apikey=603a192c&t=${sessionStorage.getItem('title')}`;

}





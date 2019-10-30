'use strict'

//defines the handle and url variables and then uses Fetch with url
function getRepos(){
    let handle = $('#handle').val();
    let url = `https://api.github.com/users/${handle}/repos`
    fetch(url)  
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText)
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => alert(`Something went wrong! ${err}`));
}   

//logs result array to console and appends results to .results section in DOM
function displayResults(responseJson){
    console.log(responseJson);
    $('.results').empty(); //remove any previous results
    for (let i=0;i<responseJson.length;i++){
        $('.results').append(`<h3><a href=${responseJson[i].html_url}> ${responseJson[i].name} </a></h3>`);
    }
}

//watches for user to submit form. When form is submitted, runs getRepos
function watchForSubmit(){
    $('form').submit(function(event){
        event.preventDefault();
        getRepos();
    });
}



//calls functions that render the app
function renderApp(){
   watchForSubmit();
}

$(renderApp);

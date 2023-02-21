API_key = 'AIzaSyAFlg4mkEYhwnQNuYG3WltsznR1poMSZt0';
// OtherAPI_key = "AIzaSyCWyxNJmH3L2T6zm2wul80r9MtewO_pfRo";
MyID = 'UCvC4D8onUfXzvjTOM-dBfEA';





// marvel  UCvC4D8onUfXzvjTOM-dBfEA

// sun ; UCBnxEdpoZwstJqC1yZpOjRA
//GyC3chcHc85wUNEFFvXA
//UCEYmneQ2gmKpNsCAZe1BlRw venket
//UC97f4WjneOfp7GDyznVlv-w  my



//https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=GoogleDevelopers&key=${API_key}



function myFunction() {
    var x = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = x;
    console.log(x);

}

let subCount = document.getElementById('userResult');
const userDetail = document.getElementById('user-container');

let getSubscribers = () => {
    var userId = document.querySelector('#demo').innerText
    fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${userId}&key=${API_key}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            subCount.innerHTML = data["items"][0].statistics.subscriberCount;
        })
}
getSubscribers();


const playlistsContainer = document.getElementById('Playlist-container');
fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${MyID}&maxResults=100&key=${API_key}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.items)
        // Process the response and display the playlists in the container
        const playlists = data.items;
        for (const data of playlists) {
            const playlistElement = document.createElement('div');
            playlistElement.innerHTML =

                `   <div class="col-sm-6" id="card text-center"></div>
                <img  src="${data.snippet.thumbnails.medium.url}" class="card-img-top">
                 <div class="card-body">
                 <h5 class="card-title">${data.snippet.title}</h5>
                  <p class="card-text">${data.snippet.description}</p>
                  <a href="https://www.youtube.com/playlist?list=${data.id}" class="btn btn-primary text-center" >Playlist Details</a>
              </div>`

            playlistsContainer.appendChild(playlistElement);
        }
    })
    .catch(error => console.error(error));



// Card
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}




const CardID = document.getElementById('channel-body');

//https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${MyID}&key=$AIzaSyAFlg4mkEYhwnQNuYG3WltsznR1poMSZt0
// Send a request to the YouTube Data API
fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${MyID}&key=AIzaSyAFlg4mkEYhwnQNuYG3WltsznR1poMSZt0`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const cardtotal = document.createElement('div');
        cardtotal.innerHTML =

            `  
        <div class="channel-card">
        <div class="channel-card__image">
        <img src= "${data.items[0].snippet.thumbnails.medium.url}" alt="Channel Image">
</div>
        <div class="channel-card__info">
            <h2 class="channel-card__title">${data.items[0].snippet.title}</h2><br>
                <p class="channel-card__description">${data.items[0].snippet.description}</p>
    <div class="channel-card__stats">
             <div class="channel-card__stat">
                       <p class="channel-card__stat-label">Subscribers:</p>
                         <p class="channel-card__stat-value"><strong>${numberWithCommas(data.items[0].statistics.subscriberCount)}</strong></p>
  </div>
             <div class="channel-card__stat">
                <p id="channel-card__stat-label">Views:</p>
                <p class="channel-card__stat-value"><strong>${numberWithCommas(data.items[0].statistics.viewCount)}</strong></p> 
                <a href="https://www.youtube.com/${data.items[0].snippet.customUrl}" class="channel-card__button">Subscriber</a>
        
    </div>
    </div>
    </div>
</div>`



        CardID.appendChild(cardtotal);
    }
    )
    .catch(error => console.error(error));



//https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25&key=AIzaSyAFlg4mkEYhwnQNuYG3WltsznR1poMSZt0


const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})



const videoCardContainer = document.querySelector('.topic-container');


let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: API_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 20,
    regionCode: 'IN'
}))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: API_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video1" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="content-title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}



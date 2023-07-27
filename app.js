const music = new Audio('vande.mp3');

const songs = [
  { id: '1',
        name: `The Ultracheese<br> <div class="subtitle">Arctic Monkeys<\div>`,
        poster: "img/music/1.jpg",
     },

  {
        id: '2',
        name: `Shades Of Cool <br> <div class="subtitle">Lana Del Rey<\div>`,
        poster: "img/music/2.jpg",
     },
   {
        id: '3',
        name: `Softcore <br> <div class="subtitle">The Neighbourhood<\div>`,
        poster: "img/music/3.jpg",
     },

  {
        id: '4',
        name: `Body Paint <br> <div class="subtitle">Arctic Monkeys<\div>`,
        poster: "img/music/4.jpg",
     },

  {
        id: '5',
        name: `Starboy <br> <div class="subtitle">The Weeknd<\div>`,
        poster: "img/music/5.jpg",
     },

    {
        id: '6',
        name: `Colors <br> <div class="subtitle"> Halsey <\div>`,
        poster: "img/music/6.jpg",
     },
    
      {
        id: '7',
        name: `Salvatore <br> <div class="subtitle"> Lana Del Rey <\div>`,
        poster: "img/music/7.jpg",
     },
         {
        id: '8',
        name: `Cry Baby <br> <div class="subtitle">The Neighbourhood <\div>`,
        poster: "img/music/8.jpg",
     },
     {
        id: '9',
        name: `Do Me A Favour <br> <div class="subtitle">Arctic Monkeys <\div>`,
        poster: "img/music/9.jpg",
     },
       {
        id: '10',
        name: `Black Beauty <br> <div class="subtitle">Lana Del Rey <\div>`,
        poster: "img/music/10.jpg",
     },
      {
        id: '11',
        name: `Star Treatment <br> <div class="subtitle">Arctic Monkeys <\div>`,
        poster: "img/music/11.jpg",
     },
      {
        id: '12',
        name: `Hurricane <br> <div class="subtitle">Halsey <\div>`,
        poster: "img/music/12.jpg",
     },
        {
        id: '13',
        name: `Softcore <br> <div class="subtitle">The Neighbourhood<\div>`,
        poster: "img/music/13.jpg",
     },
     
      {
        id: '14',
        name: `Shades Of Cool <br> <div class="subtitle">Lana Del Rey<\div>`,
        poster: "img/music/14.jpg",
     },
   
    
]

/*
const pag = document.getElementById('cambiar_pag');

pag.addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = "last-list.html";
});  */ 


Array.from(document.getElementsByClassName('song_item')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].name;
}) 

const makePlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}


let master_play = document.getElementById('master_play');
let wave = document.getElementsByClassName('wave')[0];
let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');


Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makePlays();
        e.target.classList.add('bi-pause-circle-fill');
        e.target.classList.remove('bi-play-circle-fill');
        music.src = `audio/${index}.mp3`;
        let poster_s = `img/music/${index}.jpg`;
        poster_master_play.src = poster_s;
        music.play();

        songs.forEach((ele)=>{
            if (ele.id == index){
                title.innerHTML = songs[ele.id - 1].name;
                return;
            }
          
        })
        master_play.classList.remove('bi-play-fill');
        master_play.classList.add('bi-pause-fill');
        wave.classList.add('active2');
     
    })
})

music.addEventListener('ended',()=>{
    master_play.classList.add('bi-play-fill');
    master_play.classList.remove('bi-pause-fill');
    wave.classList.remove('active2'); //como puedo hacer que para cuando termine una cancion arranque otra? 
})


master_play.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        master_play.classList.remove('bi-play-fill');
        master_play.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        master_play.classList.add('bi-play-fill');
        master_play.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
} )

const button_p = document.getElementById('bp');

button_p.addEventListener('click', ()=>{
    index = 4;
    let song_a = document.getElementById('4');
    makePlays();
    song_a.classList.add('bi-pause-circle-fill');
    song_a.classList.remove('bi-play-circle-fill');
    music.src = `audio/${index}.mp3`;
    let poster_d = `img/music/${index}.jpg`;
    poster_master_play.src = poster_d;
    music.play();
    title.innerHTML = songs[3].name;

    master_play.classList.remove('bi-play-fill');
    master_play.classList.add('bi-pause-fill');
    wave.classList.add('active2');  
   
})

//time of playing song control 

let current_start = document.getElementById('current_start');
let current_end = document.getElementById('current_end');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    current_end.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    current_start.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    master_play.classList.add('bi-play-fill');
    master_play.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

//volumen control 

let vol = document.getElementById('vol');
let vol_icon = document.getElementById('vol_icon');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})

//skip and back songs 

let back = document.getElementById('back');
let next = document.getElementById('next');
let j = index; 
let l = songs.length; 

back.addEventListener('click', ()=>{
    j -= 1;
    if (j < 1) {
        j = l;
    }
    music.src = `audio/${j}.mp3`;
    poster_master_play.src =`img/music/${j}.jpg`;
    music.play();

    songs.forEach((ele)=>{
        if (ele.id == j){
            title.innerHTML = songs[ele.id - 1].name;
            return;
        }
      
    })

    document.getElementById(`${j}`).classList.remove('bi-play-fill');
    document.getElementById(`${j}`).classList.add('bi-pause-fill');
    
})

next.addEventListener('click', ()=>{
    j += 1;
    if (j > l) {
        j = 1;
  }
    music.src = `audio/${j}.mp3`;
    poster_master_play.src =`img/music/${j}.jpg`;
    music.play();

    songs.forEach((ele)=>{
        if (ele.id == j){
            title.innerHTML = songs[ele.id - 1].name;
            return;
        }
      
    })

    document.getElementById(`${j}`).classList.remove('bi-play-fill');
    document.getElementById(`${j}`).classList.add('bi-pause-fill');
    
})



//scrolls 

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})

right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})

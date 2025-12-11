import { MediaPlayer } from 'dashjs';

const video = document.getElementById('video');
const dashUrl = '/dash/manifest.mpd';
const player = MediaPlayer().create();
let Subexsub = new dashjs.ExternalSubtitle({
  id: 'external_1',
  url: '/subs',
  mimeType: 'text/vtt',
  language: 'en',
  bandwidth: 256
});
player.initialize(video, dashUrl, true);
player.addExternalSubtitle(Subexsub);


//player.addExternalSubtitle()
// a

player.on("streamInitialized",() => {
    console.log('DASH stream loaded, ready to play');
    console.log(`is text enabled: `,player.isTextEnabled());

   
(async () => {

try {
  // just need to have the frtonend have the url
  // il just make it a button which fetches the subttiles

  let subURL = await fetch_sub();
  

    let track = video.querySelector("track");
    if (!track){
          track = document.createElement("track");
    track.kind = "subtitles";
    track.srclang = "en";
    track.label = "English";
    track.default = true;
    video.appendChild(track);
    console.log("inside sub url thing");
    }
    track.src = subURL;

  console.log("After SUB URL ",subURL);
  } catch (e) {
    console.error("subtutle setup error : ",e);
  }

  });


console.log(video);
    
    });



async function fetch_sub()  {
  //const subtitlespath = filePath.replace(/\.[^/.]+$/, ".vtt");

  const subURL = `/subs`

  try {
    const res = await fetch(subURL, { method: "HEAD" });
    if (!res.ok) {
      console.log("here would place logic for creaing the ffmpeg subtitles");

      throw new Error(`Failed to fetch subtitles (${res.status})`);
      
    }
  } catch (err) {
    console.error(`Could not find subtitles file for ${subURL}`, err);
      }

  return subURL;


}


// import Hls from 'hls.js';

// const video = document.getElementById('video');
// const hlsUrl = 'http://localhost:8080/hls/master.m3u8';

// if (Hls.isSupported()) {
//   const hls = new Hls();
//   hls.loadSource(hlsUrl);
//   hls.attachMedia(video);
//   hls.on(Hls.Events.MANIFEST_PARSED, () => {
//     console.log('Stream loaded, ready to play');
//   });
// } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//   // Safari native support
//   video.src = hlsUrl;
// }


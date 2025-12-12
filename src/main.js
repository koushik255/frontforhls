import { MediaPlayer } from 'dashjs';

const video = document.getElementById('video');
const dashUrl = '/dash/manifest.mpd';
const player = MediaPlayer().create();
let Subexsub = new dashjs.ExternalSubtitle({
  id: 'external_1',
  url: '/subs.vtt',
  mimeType: 'text/vtt',
  language: 'en',
  bandwidth: 256
});
player.getSettings().streaming.buffer.fastSwitchEnabled = true;
player.getSettings().streaming.abr.autoSwitchBitrate.video = true;
player.initialize(video, dashUrl, true);
player.addExternalSubtitle(Subexsub);


//player.addExternalSubtitle()
// a

player.on("streamInitialized",async () => {
    console.log('DASH stream loaded, ready to play');
    console.log(`is text enabled: `,player.isTextEnabled());
    video.currentTime = 300;
    let duration = player.duration();
    console.log(duration);
    let currentTime = 700;
    player.seek(currentTime +20);
       
    try {
    //const subtitlesURL = await fetch_sub('/subs.vtt');
    //console.log(subtitlesURL);
   // setupSubs(video,'/subs.vtt','en',"English");
   console.log("diddy");
    } catch (e) {
      console.log("subtitles no work");
      console.error("subtitles setup errore",e);
    }
console.log(video);
    
    });



 async function fetch_sub()  {
  //const subtitlespath = filePath.replace(/\.[^/.]+$/, ".vtt");

  const subURL = `/subs.vtt`

  try {
    const res =  await fetch(subURL, { method: "HEAD" });
    if (!res.ok) throw new Error(`Failed to fetch subtitles (${res.status})`);
    return url;
  } catch (err) {
    console.error(`Could not find subtitles file for ${subURL}`, err);
    return null
      }
}

function setupSubs(video,src,lang,label){
  if (!src) return;
  let track = video.querySelector(`track[srclang="${lang}"]`);
  if (!track) {
    track = document.createElement('track');
    track.kind = 'subtitles';
    track.srclang = lang;
    track.label = label;
    track.default = true;
    //track.currentTime = 300;
    
    video.appendChild(track);
  }
  
  track.src = src;
  console.log(`Subtitles track added : ${src}`);
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

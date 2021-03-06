var maxim,mmedia,play,bar,progress,mute,volume,loop;
function initiate(){
		maxim = 400;
		mmedia = document.getElementById('media');
		play = document.getElementById('play');
		bar = document.getElementById('bar');
		progress = document.getElementById('progress');
		mute = document.getElementById('mute');
		volume = document.getElementById('volume');
		
		play.addEventListener('click',push);
		mute.addEventListener('click',sound);
		bar.addEventListener('click',move);
		volume.addEventListener('change',level);
}

addEventListener('load',initiate);

function push(){
	if(!mmedia.paused && !mmedia.ended){
		mmedia.pause();
		play.value = 'Play';
		clearInterval(loop);
	}else{
		mmedia.play();
		play.value = 'Pause';
		loop = setInterval(status,1000);
	}
	//console.log('push');
}

function sound(){
	if(mute.value == 'Mute'){
		mmedia.muted = true;
		mute.value = 'Sound';
	}else{
		mmedia.muted = false;
		mute.valuse = 'Mute';
	}
	//console.log('sound');
}

function level(){
	mmedia.volume = volume.value;
}

function status(){
	if(!mmedia.ended){
		var size = parseInt(mmedia.currentTime * maxim/mmedia.duration);
		progress.style.width = size + 'px';
	}else{
		progress.style.width = '0px';
		play.innerHTML = 'Play';
		clearInterval(loop);
	}
	//console.log('status');
}

function move (e){
	if(!mmedia.paused && !mmedia.ended){
		var mouseX = e.pageX - bar.offsetLeft - $('.col-md-7').offset().left;
		var newtime = mouseX * mmedia.duration / maxim;
		mmedia.currentTime = newtime;
		progress.style.width = mouseX + 'px';
	}
	//console.log('move')
}
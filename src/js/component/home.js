import React from "react";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.audio = null; //inicia vacio sin ninguna cancion
		this.state = {
			//el orden de las cancionessssssss ojo con esto
			currentIndex: 1,
			songs: [
				{
					title: "South Park",
					id: "south-park",
					author: "Kyle",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/south-park.mp3"
				},
				{
					title: "Thunder Cats",
					id: "thundercats",
					author: "Moonra",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
				},
				{
					title: "X-Men",
					id: "x-men",
					author: "Profesor",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			]
		};
	}

	componentDidMount() {
		this.pauseButton.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs") //Extrae los items de la APIiiiiii aaaah
			.then(response => response.json())
			.then(songs => this.setState({ songs }));
	}

	changeTrack(i) {
		this.setState({ currentIndex: i });
		this.audio.current.pause();
		this.audio.current.load();
		this.audio.current.play();
	}

	play = i => {
		let url = this.state.songs[i].url;
		const songUrl = "https://assets.breatheco.de/apis/sound/" + url;
		this.audio.src = songUrl;
		this.audio.play();
		this.playButton.style.display = "none";
		this.pauseButton.style.display = "inline-block";
		this.setState({ currentIndex: i });
	};
	pause = () => {
		this.audio.pause();
		this.playButton.style.display = "inline-block";
		this.pauseButton.style.display = "none";
	};

	render() {
		const liList = this.state.songs.map((song, index) => {
			return (
				<li
					key={index}
					onClick={() => this.play(this.state.currentIndex)}>
					<span>{index + 1}</span>
					<span>{song.name}</span>
				</li>
			);
		});
		const audioPlayer = (
			<>
				<div className="audioPlayer">
					<button
						onClick={() => this.play(this.state.currentIndex - 1)}>
						<i className="fa fa-caret-left" aria-hidden="true" />
					</button>
					<button
						ref={element => (this.playButton = element)}
						onClick={() => this.play(this.state.currentIndex)}>
						<i className="fa fa-play" aria-hidden="true" />
					</button>
					<button
						ref={element => (this.pauseButton = element)}
						onClick={() => this.pause(this.state.currentIndex)}>
						<i className="fa fa-pause" aria-hidden="true" />
					</button>
					<button
						onClick={() => this.play(this.state.currentIndex + 1)}>
						<i className="fa fa-caret-right" aria-hidden="true" />
					</button>
				</div>
				<audio ref={element => (this.audio = element)} />

				<div className="kitty">
					<img
						src="https://data.whicdn.com/images/347916661/original.gif"
						alt="..."
						width="450"
						height="400"></img>
				</div>

				<div className="panda">
					<img
						src="https://3.bp.blogspot.com/-J3COO9ea2fg/WMnjX2vqbzI/AAAAAAAAACA/5zUQI6GjoagXs8wIwuiPbrTHPoJazqBFACLcB/s280/200.gif"
						alt="..."
						width="400"
						height="400"></img>
				</div>
			</>
		);
		return (
			<>
				{audioPlayer}
				{liList}
			</>
		);
	}
}

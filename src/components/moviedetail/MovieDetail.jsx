import React, { useState, useEffect } from "react";
import {
	fetchCasts,
	fetchMovieDetail,
	fetchMovieVideos,
	fetchSimilarMovie,
} from "../../service";
import {
	FaRegPlayCircle,
	FaFacebook,
	FaTwitter,
	FaYoutube,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhone,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export function MovieDetail({ match }) {
	let params = match.params;
	let genres = [];
	const [detail, setDetail] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [video, setVideo] = useState([]);
	const [casts, setCasts] = useState([]);
	const [similarMovie, setSimilarMovie] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDetail(await fetchMovieDetail(params.id));
			setVideo(await fetchMovieVideos(params.id));
			setCasts(await fetchCasts(params.id));
			setSimilarMovie(await fetchSimilarMovie(params.id));
		};
		fetchAPI();
	}, [params.id]);

	genres = detail.genres;

	const MoviePlayerModal = props => {
		const youtubeUrl = "https://wwww.youtube.com/watch?v=";
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title
						id="contained-modal-title-vcenter"
						style={{ color: "#000", fontWeight: "bold" }}
					>
						{detail.title}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ backgroundColor: "#000" }}>
					<ReactPlayer
						className="container-fluid"
						url={youtubeUrl + video.key}
						playing
						width="100%"
					></ReactPlayer>
				</Modal.Body>
			</Modal>
		);
	};

	let genresList;
	if (genres) {
		genresList = genres.map((g, i) => {
			return (
				<li className="list-inline-item" key={i}>
					<button type="button" className="btn btn-outline-info">
						{g.name}
					</button>
				</li>
			);
		});
	}

	const castList = casts.slice(0, 4).map((c, i) => {
		return (
			<div className="col-md-3 text-center" key={i}>
				<img
					style={{ maxWidth: "255px" }}
					className="persons img-fluid rounded-circle mx-auto d-block"
					src={c.img}
					alt={c.name}
				/>
				<p className="font-weight-bold text-center">{c.name}</p>
				<p
					className="font-weight-light text-center"
					style={{ color: "#5a606b" }}
				>
					{c.character}
				</p>
			</div>
		);
	});

	const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
		return (
			<div className="col-md-3 col-sm-6" key={index}>
				<div className="card">
					<Link to={`/movie/${item.id}`}>
						<img className="img-fluid" src={item.poster} alt={item.title} />
					</Link>
				</div>
				<div className="mt-3">
					<p style={{ fontWeight: "bolder" }}>{item.title}</p>
					<p>Rated: {item.rating}</p>
					<ReactStars
						count={item.rating}
						size={20}
						color={"#f4c10f"}
					></ReactStars>
				</div>
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row mt-2">
				<MoviePlayerModal
					show={isOpen}
					onHide={() => {
						setIsOpen(false);
					}}
				></MoviePlayerModal>
				<div className="col text-center" style={{ width: "100%" }}>
					<div className="detail-overlay">
						<img
							className="img-fluid "
							src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
							alt={detail.title}
						></img>
						<div className="mobile carousel-caption" style={{ fontSize: 35 }}>
							{detail.title}
						</div>
					</div>
					<FaRegPlayCircle
						onClick={() => setIsOpen(true)}
						className="play-icon"
						style={{ fontSize: 95, color: "#f4c10f" }}
					/>
				</div>
			</div>

			<div className="row mt-3">
				<div className="col">
					<p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
				</div>
			</div>

			<div className="row mt-3">
				<div className="col">
					<ul className="list-inline">{genres && genresList}</ul>
				</div>
			</div>

			<div className="row mt-3">
				<div className="col">
					<div className="text-center">
						<ReactStars
							count={detail.vote_average}
							size={20}
							colorl={"#f4c10f"}
						></ReactStars>
					</div>
					<div className="row mt-3">
						<div className="col">
							<p style={{ color: "#5a606b", fontWeight: "bold" }}>OVERVIEW</p>
							{detail.overview}
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-md-3">
							<p style={{ color: "#5a606b", fontWeight: "bold" }}>
								RELEASE DATE
							</p>
							<p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
						</div>
						<div className="col-md-2">
							<p style={{ color: "#5a606b", fontWeight: "bold" }}>RUN TIME</p>
							<p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
						</div>
						<div className="col-md-2">
							<p style={{ color: "#5a606b", fontWeight: "bold" }}>BUDGET</p>
							<p style={{ color: "#f4c10f" }}>{detail.budget}</p>
						</div>
						<div className="col-md-5 ">
							<p style={{ color: "#5a606b", fontWeight: "bold" }}>HOMEPAGE</p>
							<p style={{ color: "#f4c10f", wordBreak: "break-all" }}>
								{detail.homepage}
							</p>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col">
							<p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
						</div>
					</div>
					<div className="row mt-3">{castList}</div>
					<div className="row mt-3">
						<div className="col">
							<p style={{ color: "#5a606b", fontWeight: "bolder" }}>
								SIMILAR MOVIES
							</p>
						</div>
					</div>
					<div className="row mt-3">{similarMovieList}</div>
					<hr
						className="mt-5"
						style={{ borderTop: "1px solid #5a606b" }}
					/>{" "}
					<br />
					<div className="row mt-3 mb-5">
						<div className="col-md-8 col-ms-6" style={{ color: "#5a606b" }}>
							<h3>ABOUT ME</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
								molestiae architecto in eum placeat est voluptatibus molestias
								tempore harum ipsam.
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
								molestiae architecto in eum placeat est voluptatibus molestias
								tempore harum ipsam.
							</p>
							<ul className="list-inline">
								<li className="list-inline-item">
									<a href="/" style={{ color: "#f4c10f" }}>
										<FaFacebook />
									</a>
								</li>
								<li className="list-inline-item">
									<a href="/" style={{ color: "#f4c10f" }}>
										<FaInstagram />
									</a>
								</li>

								<li className="list-inline-item">
									<a href="/" style={{ color: "#f4c10f" }}>
										<FaTwitter />
									</a>
								</li>
								<li className="list-inline-item">
									<a href="/" style={{ color: "#f4c10f" }}>
										<FaYoutube />
									</a>
								</li>
							</ul>
						</div>
						<div className="col-md-4 col-ms-6" style={{ color: "#5a606b" }}>
							<h3>KEEP IN TOUCH</h3>
							<ul className="list-unstyled">
								<li>
									<p>
										<strong>
											<FaMapMarkerAlt /> Address:
										</strong>
										city, state, country
									</p>
								</li>
								<li>
									<p>
										<strong>
											<FaPhone /> Phone:
										</strong>
										+011 123-45-67
									</p>
								</li>
								<li>
									<p>
										<strong>
											<FiMail /> Email:
										</strong>
										infomail@info.com
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

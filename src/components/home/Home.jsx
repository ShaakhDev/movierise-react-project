import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
	fetchGenre,
	fetchMovieByGenre,
	fetchMovies,
	fetchPersons,
	fetchTopratedMovie,
} from "../../service/index";
import { Carousel } from "react-responsive-carousel";
import {
	FaRegPlayCircle,
	FaFacebook,
	FaTwitter,
	FaYoutube,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhone,
	FaArrowAltCircleRight,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export function Home() {
	const [nowPlaying, setNowPlaying] = useState([]);
	const [genres, setGenres] = useState([]);
	const [movieByGenre, setMovieByGenre] = useState([]);
	const [persons, setPersons] = useState([]);
	const [topRated, setTopRated] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setNowPlaying(await fetchMovies());
			setGenres(await fetchGenre());
			setMovieByGenre(await fetchMovieByGenre(28));
			setPersons(await fetchPersons());
			setTopRated(await fetchTopratedMovie());
		};
		fetchAPI();
	}, []);

	const handleGenreClick = async genre_id => {
		setMovieByGenre(await fetchMovieByGenre(genre_id));
	};

	const movies = nowPlaying.slice(0, 6).map((item, index) => {
		return (
			<div
				style={{ height: 500, width: "100%", alignItems: "center" }}
				key={index}
			>
				<FaRegPlayCircle
					className="play-icon"
					style={{ fontSize: 95, color: "#f4c10f" }}
				/>
				<div className="carousel-center">
					<img
						style={{ height: 600, width: "100%", objectFit: "cover" }}
						src={item.backPoster}
						alt={item.title}
					/>
				</div>

				<div className="carousel-caption">{item.title}</div>
			</div>
		);
	});
	const genreList = genres.map((item, index) => {
		return (
			<li className="list-inline-item" key={index}>
				<button
					type="button"
					className="btn btn-outline-info"
					onClick={() => {
						handleGenreClick(item.id);
					}}
				>
					{item.name}
				</button>
			</li>
		);
	});

	const movieList = movieByGenre.slice(0, 4).map((item, index) => {
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

	const trendingPersons = persons.slice(0, 4).map((p, i) => {
		return (
			<div className="col-md-3  text-center" key={i}>
				<img
					style={{ maxWidth: "200px", objectFit: "cover" }}
					className="persons img-fluid rounded-circle mx-auto d-block"
					src={p.profileImg}
					alt={p.name}
				/>
				<p className="font-weight-bold text-center">{p.name}</p>
				<p
					className="font-weight-light text-center"
					style={{ color: "#5a606b" }}
				>
					Trending for {p.known}
				</p>
			</div>
		);
	});

	const topRatedList = topRated.slice(0, 4).map((item, index) => {
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
				<div className="col ">
					<Carousel
						autoPlay={true}
						interval={3000}
						showStatus={false}
						showIndicators={false}
						infiniteLoop={true}
						showThumbs={false}
					>
						{movies}
					</Carousel>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col">
					<ul className="list-inline">{genreList}</ul>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col">
					<FaArrowAltCircleRight className="arrow-right float-right" />
				</div>
			</div>
			<div className="row mt-3">{movieList}</div>
			<div className="row mt-3">
				<div className="col">
					<p className="font-weight-bold" style={{ color: "#5a606b" }}>
						TRENDING PERSONS ON THIS WEEK
					</p>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col">
					<FaArrowAltCircleRight className="arrow-right float-right" />
				</div>
			</div>
			<div className="row mt-3">{trendingPersons}</div>
			<div className="row mt-3">
				<div className="col">
					<p className="font-weight-bold" style={{ color: "#5a606b" }}>
						TOP RATED MOVIES
					</p>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col">
					<FaArrowAltCircleRight className="arrow-right float-right" />
				</div>
			</div>
			<div className="row mt-3">{topRatedList}</div>
			<hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} /> <br />
			<div className="row mt-3 mb-5">
				<div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
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
				<div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
					<h3>KEEP IN TOUCH</h3>
					<ul className="list-unstyled">
						<li>
							<p>
								<strong>
									<FaMapMarkerAlt /> Address:
								</strong>{" "}
								city, state, country
							</p>
						</li>
						<li>
							<p>
								<strong>
									<FaPhone /> Phone:
								</strong>{" "}
								+011 123-45-67
							</p>
						</li>
						<li>
							<p>
								<strong>
									<FiMail /> Email:
								</strong>{" "}
								infomail@info.com
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

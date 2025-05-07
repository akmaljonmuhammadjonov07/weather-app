import React, { useEffect, useState } from 'react';

import axios from 'axios';
import WeatherCard from './Components/WeatherCard';
import video from './video.mp4';
import { WifiOff } from 'lucide-react';
import SearchBar from './Components/Searchbar';
export default function App() {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const API_KEY = import.meta.env.VITE_API_KEY;
	const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

	const fetchWeather = async city => {
		setLoading(true);
		setError('');
		try {
			const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
			const response = await axios.get(url);
			console.log(response.data);
			setWeather(response.data);
		} catch (err) {
			if (err.response && err.response.status === 404) {
				setError('City not found. Please try again.');
			} else {
				setError('An error occurred. Please try again later.');
			}
			setWeather(null);
		} finally {
			setLoading(false);
		}
	};

	const getWeatherByCoords = async (lat, lon) => {
		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
			);
			const data = await res.json();
			setWeather(data);
		} catch (err) {
			setError("Ma'lumotni yuklashda xatolik yuz berdi.", err);
		}
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				getWeatherByCoords(latitude, longitude);
			},
			err => {
				console.error("Joylashuvni aniqlab bo'lmadi:", err);
				setError('Joylashuvga ruxsat berilmadi.');
			}
		);
	}, []);
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-blue-100 relative overflow-hidden'>
			<video
				className='absolute top-0 left-0 w-full h-full object-cover'
				autoPlay
				loop
				muted
			>
				<source src={video} type='video/mp4' />
				Your browser does not support the video tag
			</video>
			<div className='absolute top-0 left-0 w-full h-full bg-black/20 z-10'></div>
			<div className='bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-md w-full sm:w-auto max-sm:w-auto z-10'>
				<h1 className='text-3xl font-bold text-center mb-6'>Weather App</h1>
				<SearchBar fetchWeather={fetchWeather} />
				{loading && <p className='text-center mt-4'>Loading...</p>}
				{error && <p className='text-red-500 text-center mt-4'>{error}</p>}
				{weather ? (
					<WeatherCard weather={weather} />
				) : (
					<div className='mt-6'>
						<p className='text-center mt-4 flex justify-center gap-2'>
							<WifiOff />
							No Inthernet connection
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

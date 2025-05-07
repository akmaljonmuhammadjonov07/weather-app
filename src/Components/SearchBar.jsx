import React, { useState } from 'react';

export default function Searchbar({ fetchWeather }) {
	const [city, setCity] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if (city.trim()) {
			fetchWeather(city);
			setCity('');
		}
	};

	return (
		<div>
			<form className='flex' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Enter city name'
					value={city}
					onChange={e => setCity(e.target.value)}
					className='flex-1 p-2 border border-gray-300 border-r-0 rounded-l-lg outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					type='submit'
					className='bg-blue-500 border-l-0 border cursor-pointer p-2 hover:bg-blue-600 text-white rounded-r-lg '
				>
					Search
				</button>
			</form>
		</div>
	);
}

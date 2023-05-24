import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Header.css';
import {fetchData, fetchDataShows} from '../../features/movie/movieSlice';


const Header = () => {
    const [val, setVal] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchData(val))
        dispatch(fetchDataShows(val))
    }
    return (
        <nav className='nav-bar'>
            Movie
            <>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={val} onChange={(e) => setVal(e.target.value)}
                        placeholder='search'
                    />
                    <button type="submit">Search</button>
                </form>
            </>
        </nav>
    )
};

export default Header;

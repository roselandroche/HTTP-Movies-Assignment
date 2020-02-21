import React, { useState } from 'react'
import axios from 'axios'

function AddMovie(props) {
    const [newMovie, addNewMovie] = useState({
        id: Date.now(),
        title: '',
        director: '',
        metascore: 1,
        stars: []
    })

    const handleSubmit = event => {
        event.preventDefault()

        axios
            .post('http://localhost:5000/api/movies/', newMovie)
            .then(res => {
                console.log('Movie added!')
                addNewMovie({
                    id: Date.now(),
                    title: '',
                    director: '',
                    metascore: 1,
                    stars: []
                })
                props.history.push('/')
            })
    }

    const handleChange = event => {
        addNewMovie({
            ...newMovie,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={newMovie.title}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='Director'
                    value={newMovie.director}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='metascore'
                    placeholder='Metascore'
                    value={newMovie.metascore}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='stars'
                    placeholder='Stars'
                    value={newMovie.stars}
                    onChange={handleChange}
                />

                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default AddMovie

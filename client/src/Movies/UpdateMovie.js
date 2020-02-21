import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UpdateMovie(props) {
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleSubmit = event => {
        event.preventDefault()

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                setMovie({
                    id: '',
                    title: '',
                    director: '',
                    metascore: '',
                    stars: []
                })
                props.history.push('/')
            })
    }

    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={movie.title}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='Director'
                    value={movie.director}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='metascore'
                    placeholder='Metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />
                {movie.stars.map(star => {
                    return (
                        <>
                            <label>Starring: </label>
                            <input
                                type='text'
                                name='stars'
                                placeholder='Stars'
                                value={star}
                                onChange={handleChange}
                            />
                        </>
                    )
                })}
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default UpdateMovie

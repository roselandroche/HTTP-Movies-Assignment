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
            .get(`/movies/${props.match.params.id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleSubmit = event => {
        event.preventDefault()

        axios
            .put(`/update-movie/${movie.id}`, movie)
            .then(res => {
                setMovie({
                    id: '',
                    title: '',
                    director: '',
                    metascore: '',
                    stars: []
                })
                props.history.push('/movies')
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
                        <input
                            type='text'
                            name='stars'
                            placeholder='Stars'
                            value={movie.stars}
                            onChange={handleChange}
                        />)
                })}
                
            </form>
        </div>
    )
}

export default UpdateMovie

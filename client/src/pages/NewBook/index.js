import React, { useState } from 'react';

import api from '../../services/api';

import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';



export default function NewBook() {

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');


    const navigator = useNavigate();


    async function createNewBook(e) {
        e.preventDefault();

        const data = {
            title,
            author,
            launchDate,
            price,

        }


        const accessToken = localStorage.getItem('accessToken');

        console.log(data);

        try {

            await api.post('api/Book/v1', data, {

                headers: {
                    Authorization: `Bearer ${accessToken}`

                }
            });

        }
        catch (error) {
            alert('Error while recoding Book! Try again.');

        }

        navigator('/books');

    }



    return (

        <div className="new-book-container">

            <div className="content">

                <section className="form">

                    <img scr={logoImage} alt="Erudio" />

                    <h1>Add new book</h1>

                    <p>Enter the book information and click on 'Add'</p>


                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={16} color="#251FC5" />
                        Home
                    </Link>

                </section>


                <form onSubmit={createNewBook}>

                    <input
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <input
                        placeholder="Author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />

                    <input
                        type="date"
                        value={launchDate}
                        onChange={e => setLaunchDate(e.target.value)}
                    />

                    <input
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />


                    <button className="button" type="submit">Add</button>

                </form>

            </div>


        </div>

    );
}
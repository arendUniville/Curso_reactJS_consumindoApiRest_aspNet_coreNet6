import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';



export default function NewBook() {

    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');


    const { bookId } = useParams();

    const navigator = useNavigate();


    const accessToken = localStorage.getItem('accessToken');


    //Header de authorization
    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }


    //Verifica se é um new book ou um edit book
    useEffect(() => {

        if (bookId == '0') return;
        else loadBook();

    }, bookId);


    //Carrega um book caso seja uma edição
    async function loadBook() {

        try {

            const response = await api.get(`api/book/v1/${bookId}`, authorization);


            let adjustedDate = response.data.launchDate.split("T", 10)[0];

            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setLaunchDate(adjustedDate);

        } catch (error) {
            alert('Error recovering book! Try again.');

            navigator('/books');

        }

    }


    //Novo book
    async function createNewBook(e) {
        e.preventDefault();

        const data = {
            title,
            author,
            launchDate,
            price,

        }


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

                    <p>Enter the book information and click on 'Add' #### ${bookId}</p>


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
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';



export default function NewBook() {
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


                <form>

                    <input placeholder="Title" />
                    <input placeholder="Author" />
                    <input type="date" />
                    <input placeholder="Price" />


                    <button className="button" type="submit">Add</button>

                </form>

            </div>


        </div>

        );
}
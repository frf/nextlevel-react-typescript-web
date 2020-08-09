import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/1245164?s=460&u=fb25ed62f2ab9572f9bf596b1a80770cdf064933&v=4" alt=""/>
                <div>
                    <strong>Fabio Rocha</strong>
                    <span>Quimica</span>
                </div>
            </header>
            <p>
            Balablb xcxxxxxxxBalablb xcxxxxxxxBalablb xcxxxxxxx <br/><br/>
            Balablb xcxxxxxxxBalablb xcxxxxxxxBalablb xcxxxxxxx Balablb xcxxxxxxxBalablb xcxxxxxxxBalablb xcxxxxxxx 
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>

                <button type="button">
                        <img src={whatsappIcon} alt="WhatsApp"/>
                        Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;
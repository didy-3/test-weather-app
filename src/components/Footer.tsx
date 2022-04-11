import React from 'react';
import '../scss/footer.scss'
export default function Footer() {
    return(
        <footer>
            <ul className={'footer'}>
                <li className={'footer-item'}>
                    <p className={'hand'}>👋</p>
                </li>
                <li className={'footer-item'}><a href="https://t.me/didy_3">Telegram</a></li>
                <li className={'footer-item'}><a href="mailto:dasha030@gmail.com">Email</a></li>
                <li className={'footer-item'}><a href="https://github.com/didy">Github</a></li>
            </ul>
        </footer>
    )
}
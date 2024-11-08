import React from 'react';

const Footer = () => {
  return (
    <footer>
      <nav>
        <div>
          <ul>
            <li>
              <a href='/about'>A propos</a>
            </li>
            <li>
              <p>Copyright © 2024 Agharmiou. </p>
            </li>
              <p>All rights reserved.</p>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <a href='/mention'>Mentions légales</a>
            </li>
            <li>
              <a href='/faq'>FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://bca-lovat.vercel.app">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com/intent/tweet?url=https://bca-lovat.vercel.app&text=Découvrez%20BCA-Lovat%20:%20une%20plateforme%20moderne%20pour%20la%20gestion%20de%20livres!">Twitter</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://bca-lovat.vercel.app&title=BCA-Lovat&summary=Découvrez%20BCA-Lovat%20:%20une%20plateforme%20moderne%20pour%20la%20gestion%20de%20livres!&source=">LikedIn</a>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

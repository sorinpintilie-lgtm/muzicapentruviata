import React from 'react';

export default function GalleryPage() {
  return (
    <div className="app-content">
      <section className="app-section gallery-section" aria-labelledby="galerie-title">
        <div className="app-section-header">
          <span className="app-section-overline">Fragmente din emoție</span>
          <h1 id="galerie-title" className="app-section-title">
            Chipuri, lumini și momente din Reșița care dăruiește.
          </h1>
          <p className="app-section-lead">
            Fiecare fotografie surprinde același lucru: oameni care se opresc din drum,
            ascultă o melodie și aleg să schimbe o viață.
          </p>
        </div>

        <div className="gallery-grid">
          <figure className="gallery-item">
            <img
              src="/WhatsApp Image 2025-12-02 at 16.19.50.jpeg"
              alt="Public adunat în fața căsuței de sticlă la Muzică pentru Viață"
            />
            <figcaption className="gallery-caption">
              Reșița se oprește pentru câteva minute și ascultă. Apoi donează.
            </figcaption>
          </figure>
          <figure className="gallery-item">
            <img
              src="/16.jpg"
              alt="Lumini calde și atmosferă de seară la evenimentul caritabil Muzică pentru Viață"
            />
            <figcaption className="gallery-caption">
              Lumini calde, voci tremurate, promisiunea unui spital nou.
            </figcaption>
          </figure>
          <figure className="gallery-item">
            <img
              src="/Logo Muzica pentru viata.svg"
              alt="Sigla campaniei Muzică pentru Viață"
            />
            <figcaption className="gallery-caption">
              Un logo, o melodie și o comunitate întreagă în spate.
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
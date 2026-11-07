'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { EVENTS, EVENT_CATEGORIES } from '@/data/events';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1` : null;
}

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeMediaTab, setActiveMediaTab] = useState('video'); // 'video' | 'photos'
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  const filteredEvents = EVENTS.filter((ev) => {
    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'Videos') return ev.hasVideo;
    return ev.category === activeFilter;
  });

  useEffect(() => {
    if (!selectedEvent) return undefined;
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [selectedEvent]);

  const openEventModal = (eventItem, defaultTab = 'video') => {
    setSelectedEvent(eventItem);
    setActiveMediaTab(eventItem.hasVideo ? defaultTab : 'photos');
    setActivePhotoIndex(0);
  };

  return (
    <section id="eventos" className="section events-section">
      <div className="container">
        <div className="events-header-row">
          <div>
            <span className="section-eyebrow">Comunidad &amp; Cobertura Multimedia</span>
            <h2 className="section-title" style={{ color: 'var(--ram-black)', marginTop: '0.4rem' }}>
              EVENTOS RECIENTES EN MARACAIBO
            </h2>
            <p className="section-subtitle" style={{ color: 'var(--ink-secondary)', marginTop: '0.35rem' }}>
              Revive en video y fotografía nuestras expediciones 4x4, noches de lanzamiento VIP y
              exhibiciones oficiales desde nuestra sede en Maracaibo.
            </p>
          </div>

          <div className="events-filter-tabs" role="tablist" aria-label="Filtrar eventos">
            {EVENT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeFilter === category}
                className={`brand-tab-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map((eventItem) => (
            <article key={eventItem.id} className="event-card">
              <div
                className="event-media-preview"
                onClick={() => openEventModal(eventItem, eventItem.hasVideo ? 'video' : 'photos')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openEventModal(eventItem, eventItem.hasVideo ? 'video' : 'photos');
                  }
                }}
                aria-label={`Ver video y galería de ${eventItem.title}`}
              >
                <Image
                  src={eventItem.coverImage}
                  alt={eventItem.title}
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                />
                <div className="event-media-overlay">
                  <span className="event-category-badge">{eventItem.category}</span>

                  {eventItem.hasVideo && (
                    <span className="event-play-button" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="8 5 19 12 8 19 8 5" />
                      </svg>
                    </span>
                  )}

                  <div className="event-media-badges">
                    {eventItem.hasVideo && (
                      <span className="media-pill media-pill-video">
                        ▶ Video ({eventItem.videoDuration})
                      </span>
                    )}
                    <span className="media-pill">
                      📷 {eventItem.gallery.length} Fotos
                    </span>
                  </div>
                </div>
              </div>

              <div className="event-card-body">
                <div className="event-meta-row">
                  <span className="event-date">{eventItem.date}</span>
                  <span>•</span>
                  <span className="event-location">{eventItem.location}</span>
                </div>

                <h3 className="event-title">{eventItem.title}</h3>
                <p className="event-summary">{eventItem.summary}</p>

                <div className="event-card-actions">
                  {eventItem.hasVideo && (
                    <button
                      type="button"
                      className="btn-event-video"
                      onClick={() => openEventModal(eventItem, 'video')}
                    >
                      ▶ Reproducir Video
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-event-photos"
                    onClick={() => openEventModal(eventItem, 'photos')}
                  >
                    Ver Galería ({eventItem.gallery.length}) →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Multimedia de Evento (Video + Galería de Fotos + Detalles) */}
      {selectedEvent && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            ref={modalRef}
            className="modal-content event-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="event-category-badge" style={{ marginBottom: '0.35rem', display: 'inline-block' }}>
                  {selectedEvent.category} • {selectedEvent.date}
                </span>
                <h2 id="event-modal-title" style={{ fontSize: '1.25rem' }}>
                  {selectedEvent.title}
                </h2>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedEvent(null)}
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="event-modal-body">
              <div className="event-media-stage">
                <div className="event-media-switcher">
                  {selectedEvent.hasVideo && (
                    <button
                      type="button"
                      className={`pill-btn ${activeMediaTab === 'video' ? 'active' : ''}`}
                      onClick={() => setActiveMediaTab('video')}
                    >
                      ▶ Video del Evento ({selectedEvent.videoDuration})
                    </button>
                  )}
                  <button
                    type="button"
                    className={`pill-btn ${activeMediaTab === 'photos' ? 'active' : ''}`}
                    onClick={() => setActiveMediaTab('photos')}
                  >
                    📷 Galería de Fotos ({selectedEvent.gallery.length})
                  </button>
                </div>

                {activeMediaTab === 'video' && selectedEvent.hasVideo ? (
                  <div className="event-video-wrapper">
                    {getYouTubeEmbedUrl(selectedEvent.videoUrl) ? (
                      <iframe
                        src={getYouTubeEmbedUrl(selectedEvent.videoUrl)}
                        title={selectedEvent.title}
                        width="100%"
                        height="380"
                        style={{ border: 0, display: 'block' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        key={selectedEvent.videoUrl}
                        controls
                        autoPlay
                        playsInline
                        poster={selectedEvent.coverImage}
                        className="event-video-player"
                      >
                        <source src={selectedEvent.videoUrl} type="video/mp4" />
                        Tu navegador no soporta la reproducción de video.
                      </video>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="gallery-main">
                      <Image
                        src={selectedEvent.gallery[activePhotoIndex]}
                        alt={`${selectedEvent.title} - foto ${activePhotoIndex + 1}`}
                        fill
                        sizes="(max-width: 1080px) 100vw, 640px"
                      />
                    </div>
                    <div className="gallery-thumbs">
                      {selectedEvent.gallery.map((imgUrl, idx) => (
                        <button
                          key={imgUrl}
                          type="button"
                          className={`thumb-btn ${activePhotoIndex === idx ? 'active' : ''}`}
                          onClick={() => setActivePhotoIndex(idx)}
                        >
                          <Image
                            src={imgUrl}
                            alt={`Miniatura ${idx + 1}`}
                            fill
                            sizes="160px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="event-info-column">
                <div className="spec-item" style={{ marginBottom: '1rem' }}>
                  <div className="spec-item-label">Ubicación del Evento</div>
                  <div className="spec-item-value">{selectedEvent.location}</div>
                </div>

                <p style={{ color: 'var(--ram-chrome)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                  {selectedEvent.summary}
                </p>

                <h3 style={{ fontSize: '1rem', marginTop: '1.25rem', color: 'var(--jeep-gold)' }}>
                  Lo más destacado de la jornada
                </h3>
                <ul className="feature-list">
                  {selectedEvent.highlights.map((item) => (
                    <li key={item}>
                      <span className="feature-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#test-drive"
                  className="btn btn-primary"
                  style={{ marginTop: 'auto', width: '100%' }}
                  onClick={() => setSelectedEvent(null)}
                >
                  Inscribirme a Próximos Eventos en Maracaibo →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

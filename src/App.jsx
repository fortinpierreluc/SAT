import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('accueil')
  
  // États pour le calculateur
  const [nombreUtilisateurs, setNombreUtilisateurs] = useState('')
  const [ulearnActif, setUlearnActif] = useState(false)
  const [ubreachActif, setUbreachActif] = useState(false)
  const [nombreDomaines, setNombreDomaines] = useState('')
  const [campagneActif, setCampagneActif] = useState(false)
  const [campagnePersonnalisees, setCampagnePersonnalisees] = useState('Non')
  const [fraisImplantation, setFraisImplantation] = useState('')
  const [mensualite, setMensualite] = useState('')
  const [calculEnCours, setCalculEnCours] = useState(false)

  const tabs = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'uLearn', label: 'uLearn' },
    { id: 'uBreach', label: 'uBreach' },
    { id: 'uPhish', label: 'uPhish' },
    { id: 'calculer', label: 'Calculer ma mensualité' }
  ]

  // Fonction de calcul
  const calculerPrix = () => {
    const users = parseInt(nombreUtilisateurs) || 0
    
    if (users < 1 || users > 300) {
      alert('Le nombre d\'utilisateurs doit être entre 1 et 300')
      return
    }

    // Afficher le message de calcul en cours
    setCalculEnCours(true)
    setFraisImplantation('Calcul en cours...')
    setMensualite('Calcul en cours...')

    // Attendre 3 secondes avant d'afficher les résultats
    setTimeout(() => {
      // Calcul des frais d'implantation
      let fraisImp = 0
      if (users >= 1 && users <= 10) {
        fraisImp = 350
      } else if (users >= 11 && users <= 25) {
        fraisImp = 400
      } else if (users >= 26 && users <= 50) {
        fraisImp = 450
      } else if (users > 50) {
        fraisImp = 500
      }

      // Calcul de la mensualité
      let mens = 0

      // uLearn
      if (ulearnActif) {
        mens += users * 3.25
      }

      // uBreach
      if (ubreachActif) {
        const domaines = parseInt(nombreDomaines) || 0
        if (domaines < 1 || domaines > 10) {
          alert('Le nombre de domaines doit être entre 1 et 10')
          setCalculEnCours(false)
          setFraisImplantation('')
          setMensualite('')
          return
        }
        mens += domaines * 12
      }

      // Campagne de hameçonnage (toujours calculé)
      if (users >= 1 && users <= 10) {
        mens += 35
      } else if (users >= 11 && users <= 25) {
        mens += 50
      } else if (users >= 26 && users <= 50) {
        mens += 65
      } else if (users >= 51) {
        mens += 80
      }

      setFraisImplantation(`$${fraisImp.toFixed(2)}`)
      setMensualite(`$${mens.toFixed(2)}`)
      setCalculEnCours(false)
    }, 3000)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img 
            src="/logo-bz.png" 
            alt="Logo BZ" 
            className="logo clickable-logo logo-bz"
            onClick={() => setActiveTab('accueil')}
          />
          <span className="logo-separator">×</span>
          <img 
            src="/usecure-logo.avif" 
            alt="Logo Usecure" 
            className="logo usecure-logo"
          />
        </div>
        <h1>Plateforme de formation et sensibilisation à la Cybersécurité</h1>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'accueil' ? (
            <div className="accueil-content">
              <div className="accueil-top-section">
                <div className="accueil-text">
                  <h2 className="accueil-title">Rendez votre organisation cyber résistante tout en contrôlant en direct la progression globale et individuelle de vos <span className="no-wrap">employés !</span></h2>
                  
                  <div className="accueil-options">
                    <h3 className="accueil-subtitle">Trois options distinctes pour augmenter votre posture de sécurité !</h3>
                    <ul className="accueil-list">
                      <li><strong>uLearn</strong> : Capsules de formations personnalisés pour chaque membre de votre équipe !</li>
                      <li><strong>uBreach</strong> : Surveillance en continu du Dark Web pour détecter toute fuite d'information provenant de vos adresses courriel</li>
                      <li><strong>uPhish</strong> : Testez vos employés avec des campagnes d'hameçonnage automatisées et personnalisées !</li>
                    </ul>
                  </div>
                </div>
                <div className="accueil-images-right">
                  <div className="accueil-cadran">
                    <img src="/Cadran.png" alt="Cadran" className="cadran-image" />
                  </div>
                  <div className="accueil-liste">
                    <img src="/Liste.png" alt="Liste" className="liste-image" />
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'uLearn' ? (
            <div className="ulearn-content">
              <div className="ulearn-top-section">
                <div className="ulearn-video">
                  <img src="/Video.png" alt="Video" className="video-image" />
                </div>
                <div className="ulearn-text">
                  <p className="ulearn-paragraph">
                    Avec la campagne de formation uLearn, chaque employé remplit un questionnaire pour identifier ses forces et ses faiblesses. Ensuite, il reçoit des courtes capsules vidéo avec questions pour tester ses éléments à travailler.
                  </p>
                  <p className="ulearn-paragraph">
                    Ces capsules sont envoyées de façon automatique et périodiquement, à un intervalle déterminé par vous.
                  </p>
                  <p className="ulearn-paragraph">
                    Votre administrateur est aussi en mesure de suivre l'évolution des participants à l'aide d'un tableau de bord intégré.
                  </p>
                </div>
              </div>
              <div className="ulearn-dashboard">
                <img src="/Dashboard uLearn.png" alt="Dashboard uLearn" className="dashboard-image" />
              </div>
            </div>
          ) : activeTab === 'uBreach' ? (
            <div className="ubreach-content">
              <div className="ubreach-image">
                <img src="/uBreach.png" alt="uBreach" className="ubreach-image-file" />
              </div>
              <div className="ubreach-top-section">
                <div className="ubreach-text">
                  <p className="ubreach-paragraph">
                    Avec uBreach, pas besoin de vous demander si vos adresses courriel ont été compromises : On s'en occupe pour vous !
                  </p>
                  <p className="ubreach-paragraph">
                    Chaque nom de domaine est analysé en continu et vous recevrez un avis si des informations ont pu fuir votre réseau professionnel.
                  </p>
                </div>
                <div className="ubreach-cyberto">
                  <img src="/Cyberto.png" alt="Cyberto" className="cyberto-image" />
                </div>
              </div>
            </div>
          ) : activeTab === 'uPhish' ? (
            <div className="uphish-content">
              <div className="uphish-text">
                <p className="uphish-paragraph">
                  uPhish est votre outil ultime pour savoir si votre organisation est prudente en termes de courriels suspects !
                </p>
                <p className="uphish-paragraph">
                  Envoyez-leur des courriels suspects à intervalle réguliers et suivez les résultats !
                </p>
                <p className="uphish-paragraph">
                  Lorsque vous les sentez prêts, faites-leur parvenir un courriel personnalisé à l'aide de notre équipe de cybersécurité pour voir jusqu'où leur prudence se rend !
                </p>
              </div>
              <div className="uphish-image">
                <img src="/uphish.png" alt="uPhish" className="uphish-image-file" />
              </div>
            </div>
          ) : activeTab === 'calculer' ? (
            <div className="calculer-content">
              <div className="calculer-form">
                <div className="form-group form-group-utilisateurs">
                  <label htmlFor="utilisateurs">Nombre d'utilisateurs :</label>
                  <input
                    type="number"
                    id="utilisateurs"
                    min="1"
                    max="300"
                    value={nombreUtilisateurs}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 300)) {
                        setNombreUtilisateurs(val)
                      }
                    }}
                    className="form-input input-utilisateurs"
                  />
                </div>

                <div className="form-group">
                  <label>Capsules uLearn :</label>
                  <div className="toggle-switch">
                    <div 
                      className={`toggle-container ${ulearnActif ? 'active' : ''}`}
                      onClick={() => setUlearnActif(!ulearnActif)}
                    >
                      <span className="toggle-option toggle-non">Non</span>
                      <span className="toggle-option toggle-oui">Oui</span>
                      <div className="toggle-slider"></div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Surveillance du Dark Web uBreach :</label>
                  <div className="toggle-switch">
                    <div 
                      className={`toggle-container ${ubreachActif ? 'active' : ''}`}
                      onClick={() => setUbreachActif(!ubreachActif)}
                    >
                      <span className="toggle-option toggle-non">Non</span>
                      <span className="toggle-option toggle-oui">Oui</span>
                      <div className="toggle-slider"></div>
                    </div>
                  </div>
                  {ubreachActif && (
                    <div className="form-group-sub">
                      <label htmlFor="domaines">Nombre de domaine à surveiller :</label>
                      <input
                        type="number"
                        id="domaines"
                        min="1"
                        max="10"
                        value={nombreDomaines}
                        onChange={(e) => {
                          const val = e.target.value
                          if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 10)) {
                            setNombreDomaines(val)
                          }
                        }}
                        className="form-input"
                      />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Campagne de hameçonnage automatisées :</label>
                  <div className="toggle-switch">
                    <div 
                      className={`toggle-container ${campagneActif ? 'active' : ''}`}
                      onClick={() => setCampagneActif(!campagneActif)}
                    >
                      <span className="toggle-option toggle-non">Non</span>
                      <span className="toggle-option toggle-oui">Oui</span>
                      <div className="toggle-slider"></div>
                    </div>
                  </div>
                  {campagneActif && (
                    <div className="form-group-sub">
                      <label htmlFor="campagne-perso">Ajout de campagne personnalisées :</label>
                      <select
                        id="campagne-perso"
                        value={campagnePersonnalisees}
                        onChange={(e) => setCampagnePersonnalisees(e.target.value)}
                        className="form-select"
                      >
                        <option value="Non">Non</option>
                        <option value="1">1</option>
                        <option value="2">2 (recommandé)</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={calculerPrix}
                  className="calculer-btn"
                  disabled={(!ulearnActif && !ubreachActif && !campagneActif) || calculEnCours}
                >
                  {calculEnCours ? 'Calcul en cours...' : 'Calculer mon prix'}
                </button>

                <div className="result-group">
                  <div className="form-group">
                    <label>Frais d'implantation :</label>
                    <input
                      type="text"
                      value={fraisImplantation}
                      readOnly
                      className="form-input result-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Mensualité :</label>
                    <input
                      type="text"
                      value={mensualite}
                      readOnly
                      className="form-input result-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-placeholder">
              <p>Contenu de l'onglet {tabs.find(t => t.id === activeTab)?.label}</p>
              <p className="coming-soon">Le contenu sera ajouté prochainement.</p>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <a href="mailto:ventes@bzinc.ca" className="contact-link">
          Je veux plus de détails !
        </a>
      </footer>
    </div>
  )
}

export default App





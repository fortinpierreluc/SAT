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
  const [rapportActif, setRapportActif] = useState(false)
  const [rapportFrequence, setRapportFrequence] = useState('Annuel')
  const [fraisImplantation, setFraisImplantation] = useState('')
  const [mensualite, setMensualite] = useState('')
  const [calculEnCours, setCalculEnCours] = useState(false)
  
  // États pour le popup de contact
  const [popupVisible, setPopupVisible] = useState(false)
  const [nom, setNom] = useState('')
  const [titre, setTitre] = useState('')
  const [courriel, setCourriel] = useState('')
  const [entreprise, setEntreprise] = useState('')
  
  // État pour le popup "Pourquoi BZ"
  const [popupPourquoiBZVisible, setPopupPourquoiBZVisible] = useState(false)
  
  // État pour le popup "Plus de détails"
  const [popupDetailsVisible, setPopupDetailsVisible] = useState(false)

  const tabs = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'pourquoi', label: 'Bénéfices' },
    { id: 'uLearn', label: 'uLearn' },
    { id: 'uBreach', label: 'uBreach' },
    { id: 'uPhish', label: 'uPhish' },
    { id: 'calculer', label: 'Calculer ma mensualité' },
    { id: 'allerPlusLoin', label: 'Aller plus loin !' }
  ]

  // Fonction pour générer le résumé du courriel (calculateur)
  const genererResumeEmail = () => {
    let resume = "Bonjour,\n\n"
    resume += "Je suis intéressé(e) par la Plateforme de formation et sensibilisation à la Cybersécurité.\n\n"
    
    // Informations de contact
    if (nom || titre || courriel || entreprise) {
      resume += "Mes coordonnées :\n"
      if (nom) resume += `- Nom : ${nom}\n`
      if (titre) resume += `- Titre : ${titre}\n`
      if (courriel) resume += `- Courriel : ${courriel}\n`
      if (entreprise) resume += `- Entreprise/Organisation : ${entreprise}\n`
      resume += "\n"
    }
    
    resume += "Voici un résumé de ma demande de devis :\n\n"
    
    resume += `Nombre d'utilisateurs : ${nombreUtilisateurs || 'Non spécifié'}\n\n`
    
    resume += "Options sélectionnées :\n"
    resume += `- Capsules uLearn : ${ulearnActif ? 'Oui' : 'Non'}\n`
    resume += `- Surveillance du Dark Web uBreach : ${ubreachActif ? 'Oui' : 'Non'}`
    if (ubreachActif && nombreDomaines) {
      resume += ` (${nombreDomaines} domaine${parseInt(nombreDomaines) > 1 ? 's' : ''} à surveiller)`
    }
    resume += "\n"
    resume += `- Campagnes d'hameçonnage automatisées uPhish : ${campagneActif ? 'Oui' : 'Non'}`
    if (campagneActif && campagnePersonnalisees !== 'Non') {
      resume += ` (${campagnePersonnalisees} campagne${parseInt(campagnePersonnalisees) > 1 ? 's' : ''} personnalisée${parseInt(campagnePersonnalisees) > 1 ? 's' : ''})`
    }
    resume += "\n"
    resume += `- Rapport : ${rapportActif ? 'Oui' : 'Non'}`
    if (rapportActif) {
      resume += ` (Fréquence : ${rapportFrequence})`
    }
    resume += "\n\n"
    
    resume += "Coûts calculés :\n"
    resume += `- Frais d'implantation : ${fraisImplantation}\n`
    resume += `- Mensualité : ${mensualite}\n\n`
    
    resume += "Je serais ravi(e) d'avoir plus d'informations sur ces services.\n\n"
    resume += "Merci,\n"
    
    return resume
  }
  
  // Fonction pour générer le courriel de demande de détails
  const genererEmailDetails = () => {
    let resume = "Bonjour,\n\n"
    resume += "Je souhaiterais obtenir plus de détails sur la Plateforme de formation et sensibilisation à la Cybersécurité.\n\n"
    
    resume += "Mes coordonnées :\n"
    resume += `- Nom : ${nom}\n`
    resume += `- Titre : ${titre}\n`
    resume += `- Courriel : ${courriel}\n`
    resume += `- Entreprise/Organisation : ${entreprise}\n\n`
    
    resume += "J'aimerais en savoir plus sur vos solutions uLearn, uBreach et uPhish.\n\n"
    resume += "Merci de me contacter pour discuter de mes besoins.\n\n"
    resume += "Cordialement,\n"
    
    return resume
  }
  
  // Fonction pour vérifier si tous les champs du popup sont remplis
  const tousLesChampsRemplis = () => {
    return nom.trim() !== '' && titre.trim() !== '' && courriel.trim() !== '' && entreprise.trim() !== ''
  }
  
  // Fonction pour envoyer le courriel et fermer le popup (calculateur)
  const envoyerCourriel = () => {
    if (tousLesChampsRemplis()) {
      window.location.href = `mailto:ventes@bzinc.ca?subject=Demande de devis - Plateforme de formation et sensibilisation&body=${encodeURIComponent(genererResumeEmail())}`
      setPopupVisible(false)
    }
  }
  
  // Fonction pour envoyer le courriel de demande de détails
  const envoyerCourrielDetails = () => {
    if (tousLesChampsRemplis()) {
      window.location.href = `mailto:ventes@bzinc.ca?subject=Demande d'information - Plateforme de formation et sensibilisation&body=${encodeURIComponent(genererEmailDetails())}`
      setPopupDetailsVisible(false)
      // Réinitialiser les champs
      setNom('')
      setTitre('')
      setCourriel('')
      setEntreprise('')
    }
  }

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
        mens += domaines * 15
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

      // Campagnes personnalisées (25$ par campagne mensuelle)
      if (campagneActif && campagnePersonnalisees !== 'Non') {
        const nbCampagnes = parseInt(campagnePersonnalisees) || 0
        mens += nbCampagnes * 25
      }

      // Rapport (frais mensuels selon la fréquence)
      if (rapportActif) {
        if (rapportFrequence === 'Annuel') {
          mens += 45 // 45$ par mois
        } else if (rapportFrequence === 'Bi-annuel') {
          mens += 75 // 75$ par mois
        } else if (rapportFrequence === 'Trimestriels') {
          mens += 120 // 120$ par mois
        }
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
            src="/Logobz-gros.png" 
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
        <button 
          className="pourquoi-bz-btn"
          onClick={() => setPopupPourquoiBZVisible(true)}
        >
          Pourquoi la cybersécurité chez BZ ?
        </button>
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
                  <h2 className="accueil-title">Rendez votre organisation cyber‑résistante, tout en suivant en temps réel la progression globale et individuelle de vos <span className="no-wrap">employés !</span></h2>
                  
                  <div className="accueil-options">
                    <h3 className="accueil-subtitle">Trois solutions clés pour renforcer votre posture de sécurité :</h3>
                    <ul className="accueil-list">
                      <li><strong>uLearn</strong> : Capsules de formation personnalisées pour chaque membre de votre équipe.</li>
                      <li><strong>uBreach</strong> : Surveillance continue du Dark Web pour détecter toute fuite d'informations provenant de vos adresses courriel.</li>
                      <li><strong>uPhish</strong> : Testez vos employés avec des campagnes d'hameçonnage automatisées et/ou sur mesure.</li>
                    </ul>
                  </div>
                </div>
                <div className="accueil-images-right">
                  <div className="accueil-cadran">
                    <img src="/Cadran.png" alt="Cadran" className="cadran-image" />
                  </div>
                <div className="accueil-liste">
                  <img src="/Liste V2.jpg" alt="Liste" className="liste-image" />
                </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'pourquoi' ? (
            <div className="pourquoi-content">
              <div className="pourquoi-top-section">
                <div className="pourquoi-image">
                  <a href="https://bzinc.ca/" target="_blank" rel="noopener noreferrer" className="logobz-gros-link">
                    <img src="/Logobz-gros.png" alt="Logo BZ" className="logobz-gros-image" />
                  </a>
                </div>
                <div className="pourquoi-text">
                  <h2 className="pourquoi-title">Dès le départ, vous verrez les avantages de la plateforme de sensibilisation USecure !</h2>
                  <ul className="pourquoi-list">
                    <li className="pourquoi-item">
                      Plus de 80 % des cyberattaques proviennent d'une erreur humaine (clic sur un pourriel, mauvaise gestion des mots de passe, connexion à un réseau non sécurisé). Il est donc crucial de renforcer la vigilance de votre équipe !
                    </li>
                    <li className="pourquoi-item">
                      La grande majorité des assureurs exige désormais une formation continue pour les employés des organisations bénéficiant d'une assurance « cyber risque ».
                    </li>
                    <li className="pourquoi-item pourquoi-item-with-sublist">
                      BZ met son expertise à votre service pour :
                      <ul className="pourquoi-sublist">
                        <li>Former votre personnel</li>
                        <li>Évaluer votre posture de cybersécurité</li>
                        <li>Vous accompagner dans les prochaines étapes de votre renforcement technologique (Loi 25, formations, IA, infrastructure TI, Cloud)</li>
                      </ul>
                    </li>
                  </ul>
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
                    Avec la campagne de formation uLearn, chaque employé remplit un questionnaire afin d'identifier ses forces et ses axes d'amélioration. Ensuite, il reçoit des capsules vidéo courtes, accompagnées de questions pour tester les compétences à développer.
                  </p>
                  <p className="ulearn-paragraph">
                    Ces capsules sont envoyées automatiquement et de manière périodique, selon un intervalle défini par vous.
                  </p>
                  <p className="ulearn-paragraph">
                    Votre administrateur est aussi en mesure de suivre l'évolution des participants grâce à un tableau de bord intégré.
                  </p>
                </div>
              </div>
              <div className="ulearn-dashboard">
                <img src="/uLearn V2.png" alt="Dashboard uLearn" className="dashboard-image" />
              </div>
            </div>
          ) : activeTab === 'uBreach' ? (
            <div className="ubreach-content">
              <div className="ubreach-image">
                <img src="/V3.png" alt="uBreach" className="ubreach-image-file" />
              </div>
              <div className="ubreach-top-section">
                <div className="ubreach-text">
                  <p className="ubreach-paragraph">
                    Avec uBreach, plus besoin de vous demander si vos adresses courriel ont été compromises : On s'en occupe pour vous !
                  </p>
                  <p className="ubreach-paragraph">
                    Chaque nom de domaine est surveillé en continu et vous recevrez un avertissement si des informations ont pu fuir depuis votre réseau professionnel.
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
                  uPhish vous permet de créer plusieurs campagnes d'hameçonnage afin de mesurer la réactivité et la prudence de vos utilisateurs.
                </p>
                <p className="uphish-paragraph">
                  Deux approches complémentaires s'offrent à vous :
                </p>
                <p className="uphish-paragraph">
                  <strong>Auto-Phish</strong><br />
                  Configurez des campagnes automatisées qui envoient régulièrement des courriels frauduleux à vos équipes. Ces tests reproduisent des scénarios réalistes et permettent de suivre les taux de clics et de compromission sur une base régulière.
                </p>
                <p className="uphish-paragraph">
                  <strong>Campagnes personnalisées</strong><br />
                  Concevez des courriels sur mesure adaptés à votre contexte organisationnel pour tester des scénarios plus sophistiqués. Notre équipe de cybersécurité vous accompagnera dans la création d'attaques ciblées afin d'identifier les faiblesses spécifiques et vous fournit un rapport détaillé visant à renforcer la formation de l'ensemble de votre personnel.
                </p>
              </div>
              <div className="uphish-image">
                <img src="/uphish V2.png" alt="uPhish" className="uphish-image-file" />
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
                      <label htmlFor="domaines">Nombre de domaine(s) à surveiller :</label>
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
                        className="form-input input-domaines"
                      />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Campagnes d'hameçonnage automatisées uPhish :</label>
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
                      <label htmlFor="campagne-perso">Ajout de campagne(s) personnalisée(s) :</label>
                      <select
                        id="campagne-perso"
                        value={campagnePersonnalisees}
                        onChange={(e) => setCampagnePersonnalisees(e.target.value)}
                        className="form-select input-campagnes"
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

                <div className="form-group">
                  <label>Rapport :</label>
                  <div className="toggle-switch">
                    <div 
                      className={`toggle-container ${rapportActif ? 'active' : ''}`}
                      onClick={() => setRapportActif(!rapportActif)}
                    >
                      <span className="toggle-option toggle-non">Non</span>
                      <span className="toggle-option toggle-oui">Oui</span>
                      <div className="toggle-slider"></div>
                    </div>
                  </div>
                  {rapportActif && (
                    <div className="form-group-sub">
                      <label htmlFor="rapport-frequence">Fréquence du rapport :</label>
                      <select
                        id="rapport-frequence"
                        value={rapportFrequence}
                        onChange={(e) => setRapportFrequence(e.target.value)}
                        className="form-select"
                      >
                        <option value="Annuel">Annuel</option>
                        <option value="Bi-annuel">Bi-annuel</option>
                        <option value="Trimestriels">Trimestriels</option>
                      </select>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={calculerPrix}
                  className="calculer-btn"
                  disabled={(!ulearnActif && !ubreachActif && !campagneActif && !rapportActif) || calculEnCours}
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

                {mensualite && mensualite !== 'Calcul en cours...' && fraisImplantation && fraisImplantation !== 'Calcul en cours...' && (
                  <button
                    onClick={() => setPopupVisible(true)}
                    className="go-btn"
                    style={{
                      display: 'inline-block',
                      marginTop: '20px',
                      padding: '12px 30px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      textDecoration: 'none',
                      border: 'none',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '16px'
                    }}
                  >
                    Je veux aller de l'avant !
                  </button>
                )}
              </div>
            </div>
          ) : activeTab === 'allerPlusLoin' ? (
            <div className="aller-plus-loin-content">
              <div className="aller-plus-loin-header">
                <h2 className="aller-plus-loin-title">Prêt à transformer votre cybersécurité ?</h2>
                <p className="aller-plus-loin-subtitle">Découvrez nos services premium pour une protection complète et sur mesure</p>
              </div>
              <div className="service-cards-grid">
                <div className="service-card service-card-purple">
                  <div className="service-card-icon-centered">🛡️</div>
                  <h3 className="service-card-title">Prise en charge cybersécurité</h3>
                  <p className="service-card-description">
                    De l'évaluation initiale au suivi continu : planification stratégique, implémentation progressive, documentation professionnelle et amélioration continue de votre posture de sécurité
                  </p>
                </div>

                <div className="service-card service-card-teal">
                  <div className="service-card-icon-centered">🎓</div>
                  <h3 className="service-card-title">Formations aux employés</h3>
                  <p className="service-card-description">
                    Programmes adaptés pour réduire les risques humains et renforcer la culture sécuritaire
                  </p>
                </div>

                <div className="service-card service-card-pink">
                  <div className="service-card-icon-centered">📋</div>
                  <h3 className="service-card-title">Conformité Loi 25</h3>
                  <p className="service-card-description">
                    Protection des données personnelles et accompagnement pour atteindre la conformité
                  </p>
                </div>
              </div>
              
              <div className="aller-plus-loin-cta">
                <a 
                  href="https://outlook.office.com/bookwithme/user/9e650cafaac84e6eb1c82dee6c83154c@bzinc.ca/meetingtype/8XcuW2p9ZEGNzbv6-3wpWQ2?anonymous&ep=mlink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aller-plus-loin-btn"
                >
                  Prêt à passer la prochaine étape ?<br />
                  Rencontrez un de nos directeurs de compte
                </a>
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

      {/* Popup "Pourquoi BZ" */}
      {popupPourquoiBZVisible && (
        <div className="popup-overlay" onClick={() => setPopupPourquoiBZVisible(false)}>
          <div className="popup-bz-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-bz-title">Pourquoi choisir BZ pour votre cybersécurité ?</h2>
            <p className="popup-bz-subtitle">Une approche complète basée sur le cadre NIST 2.0</p>
            
            {/* Section Approche Collaborative */}
            <div className="bz-collaborative-section">
              <h3 className="bz-collaborative-title">Notre Approche Collaborative</h3>
              
              <div className="bz-collaborative-grid">
                <div className="bz-collaborative-card">
                  <div className="bz-collaborative-icon">🎯</div>
                  <h4 className="bz-collaborative-card-title">Vision Stratégique</h4>
                  <p className="bz-collaborative-card-text">
                    Alignement des initiatives TI avec vos objectifs d'affaires
                  </p>
                </div>
                
                <div className="bz-collaborative-card">
                  <div className="bz-collaborative-icon">💡</div>
                  <h4 className="bz-collaborative-card-title">Innovation Continue</h4>
                  <p className="bz-collaborative-card-text">
                    Identification d'opportunités de croissance et de différenciation
                  </p>
                </div>
                
                <div className="bz-collaborative-card">
                  <div className="bz-collaborative-icon">⚙️</div>
                  <h4 className="bz-collaborative-card-title">Excellence Technique</h4>
                  <p className="bz-collaborative-card-text">
                    Solutions robustes et évolutives adaptées à vos besoins
                  </p>
                </div>
              </div>
            </div>

            {/* Section Cadre NIST 2.0 */}
            <div className="bz-nist-section">
              <h3 className="bz-section-title">Notre Maîtrise du Cadre NIST 2.0</h3>
              <div className="bz-features-grid">
                <div className="bz-feature-card">
                  <div className="bz-feature-icon">⚡</div>
                  <h3 className="bz-feature-title">Maîtrise Approfondie</h3>
                  <p className="bz-feature-text">
                    Notre équipe possède une expertise approfondie du cadre NIST 2.0. Nous maîtrisons non seulement ses principes fondamentaux, mais également leur mise en œuvre efficace à travers les six fonctions clés : Gouverner, Identifier, Protéger, Détecter, Répondre et Reprendre.
                  </p>
                </div>
                
                <div className="bz-feature-card">
                  <div className="bz-feature-icon">🎯</div>
                  <h3 className="bz-feature-title">Approche Holistique</h3>
                  <p className="bz-feature-text">
                    Nous ne faisons pas les choses à moitié. Nous implémentons le NIST 2.0 de manière complète, en couvrant tous les aspects de la cybersécurité à travers trois axes : l'humain, les processus et la technologie.
                  </p>
                </div>
                
                <div className="bz-feature-card">
                  <div className="bz-feature-icon">📈</div>
                  <h3 className="bz-feature-title">Résultats Mesurables</h3>
                  <p className="bz-feature-text">
                    Nous mesurons votre progression selon le cadre NIST 2.0. Vous voyez clairement où vous en êtes et où vous allez avec nos programmes personnalisables adaptés à vos besoins spécifiques.
                  </p>
                </div>
                
                <div className="bz-feature-card">
                  <div className="bz-feature-icon">🏆</div>
                  <h3 className="bz-feature-title">Excellence Continue</h3>
                  <p className="bz-feature-text">
                    L'excellence n'est pas un objectif, c'est un processus continu. Nous vous accompagnons dans votre évolution constante pour renforcer votre cyber-résilience.
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              className="popup-bz-close-btn"
              onClick={() => setPopupPourquoiBZVisible(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup de contact (calculateur) */}
      {popupVisible && (
        <div className="popup-overlay" onClick={() => setPopupVisible(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-title">Vos informations</h2>
            <p className="popup-description">Veuillez remplir tous les champs pour continuer</p>
            
            <div className="popup-form">
              <div className="popup-form-group">
                <label htmlFor="popup-nom">Nom *</label>
                <input
                  type="text"
                  id="popup-nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="popup-input"
                  placeholder="Votre nom"
                />
              </div>
              
              <div className="popup-form-group">
                <label htmlFor="popup-titre">Titre *</label>
                <input
                  type="text"
                  id="popup-titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="popup-input"
                  placeholder="Votre titre"
                />
              </div>
              
              <div className="popup-form-group">
                <label htmlFor="popup-courriel">Courriel *</label>
                <input
                  type="email"
                  id="popup-courriel"
                  value={courriel}
                  onChange={(e) => setCourriel(e.target.value)}
                  className="popup-input"
                  placeholder="votre@courriel.com"
                />
              </div>
              
              <div className="popup-form-group">
                <label htmlFor="popup-entreprise">Entreprise/Organisation *</label>
                <input
                  type="text"
                  id="popup-entreprise"
                  value={entreprise}
                  onChange={(e) => setEntreprise(e.target.value)}
                  className="popup-input"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              
              <div className="popup-buttons">
                <button
                  onClick={() => setPopupVisible(false)}
                  className="popup-btn popup-btn-cancel"
                >
                  Annuler
                </button>
                <button
                  onClick={envoyerCourriel}
                  className={`popup-btn popup-btn-submit ${!tousLesChampsRemplis() ? 'disabled' : ''}`}
                  disabled={!tousLesChampsRemplis()}
                >
                  Prêt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup de demande de détails */}
      {popupDetailsVisible && (
        <div className="popup-overlay" onClick={() => setPopupDetailsVisible(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup-title">Demande d'information</h2>
            <p className="popup-description">Veuillez remplir tous les champs pour continuer</p>
            
            <div className="popup-form">
              <div className="popup-form-group">
                <label htmlFor="popup-details-nom">Nom *</label>
                <input
                  type="text"
                  id="popup-details-nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="popup-input"
                  placeholder="Votre nom"
                />
              </div>
              
              <div className="popup-form-group">
                <label htmlFor="popup-details-titre">Titre *</label>
                <input
                  type="text"
                  id="popup-details-titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="popup-input"
                  placeholder="Votre titre"
                />
              </div>
              
              <div className="popup-form-group">
                <label htmlFor="popup-details-courriel">Courriel *</label>
                <input
                  type="email"
                  id="popup-details-courriel"
                  value={courriel}
                  onChange={(e) => setCourriel(e.target.value)}
                  className="popup-input"
                  placeholder="votre@courriel.com"
                />
              </div>
              
              <div className="popup-form-group">
                <label htmlFor="popup-details-entreprise">Entreprise/Organisation *</label>
                <input
                  type="text"
                  id="popup-details-entreprise"
                  value={entreprise}
                  onChange={(e) => setEntreprise(e.target.value)}
                  className="popup-input"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              
              <div className="popup-buttons">
                <button
                  onClick={() => setPopupDetailsVisible(false)}
                  className="popup-btn popup-btn-cancel"
                >
                  Annuler
                </button>
                <button
                  onClick={envoyerCourrielDetails}
                  className={`popup-btn popup-btn-submit ${!tousLesChampsRemplis() ? 'disabled' : ''}`}
                  disabled={!tousLesChampsRemplis()}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <button 
          onClick={() => setPopupDetailsVisible(true)}
          className="contact-link"
        >
          Je veux plus de détails !
        </button>
      </footer>
    </div>
  )
}

export default App





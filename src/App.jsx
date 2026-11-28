import React, { useState, useMemo } from 'react';

// Selected images from prompt
const LOOKBOOK_IMAGES = {
  hero: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1794556017527",
  look2: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1794536591675",
  look3: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1794536612918",
  look4: "https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1794536428065",
};

const INITIAL_LOOKS = [
  {
    id: 'look-1',
    title: 'Modern Minimal Silhouette',
    subtitle: '에디토리얼 커버 룩 · 2025 S/S 메인',
    category: '모던 미니멀',
    season: '2025 S/S',
    image: LOOKBOOK_IMAGES.hero,
    tagline: '정제된 라인과 절제된 실루엣이 완성하는 우아함',
    designer: 'SEOUL ATELIER',
    likes: 342,
    colors: ['#1C1C1C', '#EAE6E1', '#8C857B'],
    items: [
      { category: 'Outer', name: '아키텍처럴 오버사이즈 블레이저', brand: 'Studio Silhouette', price: '₩389,000' },
      { category: 'Top', name: '실크 블렌드 시어 카디건', brand: 'Seoul Mood', price: '₩168,000' },
      { category: 'Bottom', name: '하이웨이스트 핀턱 턱드 트라우저', brand: 'Atelier K', price: '₩215,000' },
      { category: 'Acc', name: '미니멀 클래식 이어링', brand: 'Maison de K', price: '₩89,000' },
    ],
    stylingTip: '톤온톤 컬러 매치와 선이 살아있는 오버핏 재킷으로 현대적이면서도 강렬한 분위기를 연출합니다.'
  },
  {
    id: 'look-2',
    title: 'Urban Chic Layering',
    subtitle: '어반 스트릿 & 슬레이트 시크',
    category: '어반 럭스',
    season: '2025 S/S',
    image: LOOKBOOK_IMAGES.look2,
    tagline: '도심 속 자연스러운 레이어링과 소프트 감성',
    designer: 'URBAN VIBE',
    likes: 289,
    colors: ['#2B2A28', '#D3C4B6', '#5E5A54'],
    items: [
      { category: 'Outer', name: '드레이프 벨티드 트렌치 코트', brand: 'Urban Vibe', price: '₩420,000' },
      { category: 'Top', name: '파인 롤넥 골지 니트', brand: 'K-Archive', price: '₩129,000' },
      { category: 'Bottom', name: '스트레이트 핏 데님 트라우저', brand: 'Raw Seoul', price: '₩145,000' },
      { category: 'Acc', name: '레더 슈즈 & 슬링백', brand: 'Maison Noir', price: '₩230,000' }
    ],
    stylingTip: '가볍게 감싸는 벨티드 코트 스타일링으로 편안하면서도 스타일리시한 어반 룩을 연출하세요.'
  },
  {
    id: 'look-3',
    title: 'Modern Heritage Tailoring',
    subtitle: '클래식 재해석 & 테일러드 룩',
    category: '페미닌 클래식',
    season: '2024 F/W',
    image: LOOKBOOK_IMAGES.look3,
    tagline: '클래식 테일러링과 세련된 감각의 완벽한 조화',
    designer: 'HERITAGE LINE',
    likes: 415,
    colors: ['#191817', '#B8A390', '#3D3631'],
    items: [
      { category: 'Outer', name: '스트럭처드 울 테일러드 재킷', brand: 'Heritage Line', price: '₩458,000' },
      { category: 'Top', name: '클래식 버튼다운 오가닉 셔츠', brand: 'Studio Silhouette', price: '₩148,000' },
      { category: 'Bottom', name: '슬림 플리츠 미디 스커트', brand: 'Seoul Atelier', price: '₩198,000' },
      { category: 'Acc', name: '골드 부클 보스턴 백', brand: 'Maison de K', price: '₩310,000' }
    ],
    stylingTip: '선명한 어깨 라인과 깔끔하게 떨어지는 테일러드 핏으로 자신감 있는 프레젠테이션 룩을 완성합니다.'
  },
  {
    id: 'look-4',
    title: 'Casual Luxe Essential',
    subtitle: '내추럴 엘레강스 & 데일리 무드',
    category: '스트릿 시크',
    season: '2025 S/S',
    image: LOOKBOOK_IMAGES.look4,
    tagline: '부드러운 소재감과 세련된 데일리 시크',
    designer: 'ESSENTIAL MOOD',
    likes: 310,
    colors: ['#EDE6DE', '#3B3835', '#9C8F84'],
    items: [
      { category: 'Outer', name: '소프트 레더 라이더 재킷', brand: 'Essential Mood', price: '₩390,000' },
      { category: 'Top', name: '크루넥 캐시미어 블렌드 블라우스', brand: 'K-Archive', price: '₩175,000' },
      { category: 'Bottom', name: '와이드 핏 슬래시 팬츠', brand: 'Raw Seoul', price: '₩189,000' },
      { category: 'Acc', name: '스퀘어 토 뮬', brand: 'Studio Silhouette', price: '₩195,000' }
    ],
    stylingTip: '자연스러운 웨이브 헤어와 오버핏 가죽 라이더를 매치해 시크한 분위기를 뽐내보세요.'
  }
];

export default function App() {
  const [looks, setLooks] = useState(INITIAL_LOOKS);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeSeason, setActiveSeason] = useState('전체');
  const [selectedLook, setSelectedLook] = useState(null);
  const [bookmarks, setBookmarks] = useState(['look-1']);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'editorial' | 'saved'
  const [showStyleQuizModal, setShowStyleQuizModal] = useState(false);
  const [showAddLookModal, setShowAddLookModal] = useState(false);

  // Style Quiz state
  const [quizAnswer, setQuizAnswer] = useState({ mood: '모던', color: '모노톤', occasion: '데일리' });
  const [quizResult, setQuizResult] = useState(null);

  // New look form state
  const [newLook, setNewLook] = useState({
    title: '',
    subtitle: '',
    category: '모던 미니멀',
    season: '2025 S/S',
    image: LOOKBOOK_IMAGES.hero,
    tagline: '',
    designer: 'MY PERSONAL COLLECTION',
    items: [
      { category: 'Top', name: '', brand: '', price: '' },
      { category: 'Bottom', name: '', brand: '', price: '' }
    ]
  });

  const categories = ['전체', '모던 미니멀', '어반 럭스', '페미닌 클래식', '스트릿 시크'];
  const seasons = ['전체', '2025 S/S', '2024 F/W'];

  const filteredLooks = useMemo(() => {
    return looks.filter(look => {
      const matchCat = activeCategory === '전체' || look.category === activeCategory;
      const matchSeason = activeSeason === '전체' || look.season === activeSeason;
      if (viewMode === 'saved') {
        return bookmarks.includes(look.id) && matchCat && matchSeason;
      }
      return matchCat && matchSeason;
    });
  }, [looks, activeCategory, activeSeason, viewMode, bookmarks]);

  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const handleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLooks(prev =>
      prev.map(look => look.id === id ? { ...look, likes: look.likes + 1 } : look)
    );
  };

  const handleQuizSubmit = () => {
    // Pick recommendation based on choice
    let matched = looks[0];
    if (quizAnswer.mood === '시크') matched = looks[1];
    if (quizAnswer.mood === '클래식') matched = looks[2];
    if (quizAnswer.mood === '내추럴') matched = looks[3];
    setQuizResult(matched);
  };

  const handleCreateLook = (e) => {
    e.preventDefault();
    if (!newLook.title) return;
    const created = {
      ...newLook,
      id: `look-${Date.now()}`,
      likes: 1,
      colors: ['#222222', '#888888', '#D4AF37'],
      stylingTip: newLook.tagline || '나만의 스타일 감각으로 완성된 컬렉션 피스입니다.'
    };
    setLooks([created, ...looks]);
    setShowAddLookModal(false);
    setNewLook({
      title: '',
      subtitle: '',
      category: '모던 미니멀',
      season: '2025 S/S',
      image: LOOKBOOK_IMAGES.hero,
      tagline: '',
      designer: 'MY PERSONAL COLLECTION',
      items: [{ category: 'Top', name: '', brand: '', price: '' }]
    });
  };

  return (
    <div className="lookbook-app">
      {/* Top Navigation Bar */}
      <header className="header">
        <div className="header-container">
          <div className="logo-group">
            <span className="brand-sub">K-FASHION EDITORIAL ARCHIVE</span>
            <h1 className="brand-title">SEOUL SILHOUETTE</h1>
          </div>
          
          <nav className="nav-links">
            <button 
              className={`nav-btn ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
            >
              룩북 갤러리
            </button>
            <button 
              className={`nav-btn ${viewMode === 'editorial' ? 'active' : ''}`} 
              onClick={() => setViewMode('editorial')}
            >
              에디토리얼 피처
            </button>
            <button 
              className={`nav-btn ${viewMode === 'saved' ? 'active' : ''}`} 
              onClick={() => setViewMode('saved')}
            >
              위시 룩북 ({bookmarks.length})
            </button>
          </nav>

          <div className="header-actions">
            <button className="action-btn secondary" onClick={() => setShowStyleQuizModal(true)}>
              ✨ 스타일 AI 진단
            </button>
            <button className="action-btn primary" onClick={() => setShowAddLookModal(true)}>
              + 나만의 룩 등록
            </button>
            <button className="action-btn secondary" onClick={() => alert('로그인 모달 준비 중입니다.')}>
              로그인
            </button>
          </div>
        </div>
      </header>

      {/* Hero Editorial Banner */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <img src={LOOKBOOK_IMAGES.hero} alt="2025 S/S Seoul Silhouette Cover" className="hero-img" />
        <div className="hero-content">
          <span className="hero-badge">2025 S/S COLLECTION EDITORIAL</span>
          <h2 className="hero-title">SEOUL STYLE ARCHIVE</h2>
          <p className="hero-desc">
            가장 한국적인 20대 여성의 섬세한 아우라와 모던 클래식 패션의 우아한 마주함.
            당신만의 퍼스널 스타일 룩북을 탐색하고 커스텀하세요.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn-main" onClick={() => { setViewMode('grid'); window.scrollTo({ top: 600, behavior: 'smooth' }); }}>
              룩북 컬렉션 보기
            </button>
            <button className="hero-btn-sub" onClick={() => setSelectedLook(INITIAL_LOOKS[0])}>
              커버 룩 상세보기
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="main-container">
        {/* Filter Controls Bar */}
        <div className="filter-bar">
          <div className="filter-group">
            <span className="filter-label">카테고리:</span>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span className="filter-label">시즌:</span>
            {seasons.map(sea => (
              <button
                key={sea}
                className={`filter-chip ${activeSeason === sea ? 'active' : ''}`}
                onClick={() => setActiveSeason(sea)}
              >
                {sea}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display based on view mode */}
        {viewMode === 'editorial' ? (
          <div className="editorial-view">
            <h2 className="section-heading">FEATURED EDITORIAL LOOKS</h2>
            <p className="section-subtext">2025 S/S 시즌 트렌드를 이끄는 대표 룩북 피쳐링</p>

            <div className="editorial-grid">
              <div className="editorial-card main" onClick={() => setSelectedLook(LOOKBOOK_IMAGES && looks[0])}>
                <div className="editorial-img-wrapper">
                  <img src={LOOKBOOK_IMAGES.hero} alt={looks[0].title} />
                  <span className="editorial-tag">COVER STORY</span>
                </div>
                <div className="editorial-info">
                  <span className="cat">{looks[0].category} · {looks[0].season}</span>
                  <h3>{looks[0].title}</h3>
                  <p>{looks[0].tagline}</p>
                  <span className="read-more">스타일 디테일 탐색 →</span>
                </div>
              </div>

              <div className="editorial-side-grid">
                {looks.slice(1, 4).map((look) => (
                  <div key={look.id} className="editorial-card side" onClick={() => setSelectedLook(look)}>
                    <img src={look.image} alt={look.title} />
                    <div className="side-info">
                      <span className="cat">{look.category}</span>
                      <h4>{look.title}</h4>
                      <p>{look.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid-header">
              <h2>
                {viewMode === 'saved' ? '위시리스트 저장 룩북' : '전체 룩북 컬렉션'} 
                <span className="count">({filteredLooks.length})</span>
              </h2>
            </div>

            {filteredLooks.length === 0 ? (
              <div className="empty-state">
                <p>선택하신 조건에 해당하는 룩북이 없습니다.</p>
                <button 
                  className="reset-btn"
                  onClick={() => { setActiveCategory('전체'); setActiveSeason('전체'); setViewMode('grid'); }}
                >
                  필터 초기화
                </button>
              </div>
            ) : (
              <div className="look-grid">
                {filteredLooks.map((look) => {
                  const isBookmarked = bookmarks.includes(look.id);
                  return (
                    <div 
                      key={look.id} 
                      className="look-card"
                      onClick={() => setSelectedLook(look)}
                    >
                      <div className="card-image-box">
                        <img src={look.image} alt={look.title} loading="lazy" />
                        <div className="card-overlay">
                          <button 
                            className={`bookmark-btn ${isBookmarked ? 'saved' : ''}`}
                            onClick={(e) => toggleBookmark(look.id, e)}
                            title={isBookmarked ? "위시리스트 삭제" : "위시리스트 저장"}
                          >
                            {isBookmarked ? '★ Saved' : '☆ Save'}
                          </button>
                          <button className="quick-view-btn">
                            디테일 뷰
                          </button>
                        </div>
                        <span className="season-badge">{look.season}</span>
                      </div>

                      <div className="card-content">
                        <div className="card-meta">
                          <span className="category-tag">{look.category}</span>
                          <button 
                            className="like-btn"
                            onClick={(e) => handleLike(look.id, e)}
                          >
                            ♥ {look.likes}
                          </button>
                        </div>
                        <h3 className="card-title">{look.title}</h3>
                        <p className="card-subtitle">{look.subtitle}</p>
                        
                        {look.colors && (
                          <div className="color-dots">
                            {look.colors.map((c, i) => (
                              <span key={i} className="color-dot" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Look Detail Modal */}
      {selectedLook && (
        <div className="modal-backdrop" onClick={() => setSelectedLook(null)}>
          <div className="modal-content look-detail-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedLook(null)}>✕</button>
            
            <div className="modal-body-split">
              <div className="modal-image-col">
                <img src={selectedLook.image} alt={selectedLook.title} />
              </div>

              <div className="modal-info-col">
                <div className="modal-header-meta">
                  <span className="badge-category">{selectedLook.category}</span>
                  <span className="badge-season">{selectedLook.season}</span>
                </div>

                <h2 className="modal-title">{selectedLook.title}</h2>
                <p className="modal-subtitle">{selectedLook.subtitle}</p>

                <div className="designer-tag">
                  Designed by <strong>{selectedLook.designer}</strong>
                </div>

                <div className="tip-box">
                  <span className="tip-title">💡 Styling Recipe & Note</span>
                  <p>{selectedLook.stylingTip || selectedLook.tagline}</p>
                </div>

                <div className="items-section">
                  <h4 className="section-title">착장 아이템 브레이크다운</h4>
                  <ul className="items-list">
                    {selectedLook.items?.map((item, idx) => (
                      <li key={idx} className="item-row">
                        <span className="item-cat">{item.category}</span>
                        <div className="item-details">
                          <span className="item-name">{item.name}</span>
                          <span className="item-brand">{item.brand}</span>
                        </div>
                        <span className="item-price">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  <button 
                    className={`btn-save ${bookmarks.includes(selectedLook.id) ? 'active' : ''}`}
                    onClick={(e) => toggleBookmark(selectedLook.id, e)}
                  >
                    {bookmarks.includes(selectedLook.id) ? '★ 위시리스트 저장됨' : '☆ 위시리스트에 담기'}
                  </button>
                  <button className="btn-share" onClick={() => alert('룩북 링크가 복사되었습니다.')}>
                    공유하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Style AI Quiz Modal */}
      {showStyleQuizModal && (
        <div className="modal-backdrop" onClick={() => { setShowStyleQuizModal(false); setQuizResult(null); }}>
          <div className="modal-content quiz-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => { setShowStyleQuizModal(false); setQuizResult(null); }}>✕</button>
            
            <h2>✨ Personal Style AI Curator</h2>
            <p className="quiz-desc">선호하는 분위기와 드레스코드를 선택하시면 맞춤형 룩북을 추천해드립니다.</p>

            {!quizResult ? (
              <div className="quiz-form">
                <div className="quiz-question">
                  <label>1. 선호하는 분위기 (Mood)</label>
                  <div className="chip-options">
                    {['모던', '시크', '클래식', '내추럴'].map(m => (
                      <button 
                        key={m} 
                        className={`chip-btn ${quizAnswer.mood === m ? 'selected' : ''}`}
                        onClick={() => setQuizAnswer({ ...quizAnswer, mood: m })}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quiz-question">
                  <label>2. 선호하는 메인 팔레트 (Color)</label>
                  <div className="chip-options">
                    {['모노톤', '어스톤', '크림&베이지', '파스텔'].map(c => (
                      <button 
                        key={c} 
                        className={`chip-btn ${quizAnswer.color === c ? 'selected' : ''}`}
                        onClick={() => setQuizAnswer({ ...quizAnswer, color: c })}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quiz-question">
                  <label>3. 스타일링 착용 씬 (Occasion)</label>
                  <div className="chip-options">
                    {['데일리', '오피스', '주말/데이트', '특별한 이벤트'].map(o => (
                      <button 
                        key={o} 
                        className={`chip-btn ${quizAnswer.occasion === o ? 'selected' : ''}`}
                        onClick={() => setQuizAnswer({ ...quizAnswer, occasion: o })}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn-primary-large" onClick={handleQuizSubmit}>
                  맞춤 룩북 추천받기
                </button>
              </div>
            ) : (
              <div className="quiz-result">
                <h3>추천 매칭 룩북</h3>
                <div className="result-card" onClick={() => { setSelectedLook(quizResult); setShowStyleQuizModal(false); setQuizResult(null); }}>
                  <img src={quizResult.image} alt={quizResult.title} />
                  <div className="result-info">
                    <span className="badge">{quizResult.category}</span>
                    <h4>{quizResult.title}</h4>
                    <p>{quizResult.tagline}</p>
                    <span className="click-hint">클릭하여 전체 스타일 보기 →</span>
                  </div>
                </div>
                <button className="btn-secondary" onClick={() => setQuizResult(null)}>다시 진단하기</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add New Lookbook Modal */}
      {showAddLookModal && (
        <div className="modal-backdrop" onClick={() => setShowAddLookModal(false)}>
          <div className="modal-content add-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowAddLookModal(false)}>✕</button>

            <h2>+ 나만의 룩북 추가하기</h2>
            <p className="quiz-desc">나만의 스타일링 노하우와 코디 아이템을 룩북에 기록해 보세요.</p>

            <form onSubmit={handleCreateLook} className="add-form">
              <div className="form-group">
                <label>룩 타이틀</label>
                <input 
                  type="text" 
                  placeholder="예: 미니멀 시티 카디건 룩" 
                  value={newLook.title}
                  onChange={e => setNewLook({ ...newLook, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>카테고리</label>
                  <select 
                    value={newLook.category}
                    onChange={e => setNewLook({ ...newLook, category: e.target.value })}
                  >
                    <option value="모던 미니멀">모던 미니멀</option>
                    <option value="어반 럭스">어반 럭스</option>
                    <option value="페미닌 클래식">페미닌 클래식</option>
                    <option value="스트릿 시크">스트릿 시크</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>시즌</label>
                  <select 
                    value={newLook.season}
                    onChange={e => setNewLook({ ...newLook, season: e.target.value })}
                  >
                    <option value="2025 S/S">2025 S/S</option>
                    <option value="2024 F/W">2024 F/W</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>이미지 스틸 (선택 지정 이미지 사용)</label>
                <select 
                  value={newLook.image}
                  onChange={e => setNewLook({ ...newLook, image: e.target.value })}
                >
                  <option value={LOOKBOOK_IMAGES.hero}>패션화보 커버 (모던 수트)</option>
                  <option value={LOOKBOOK_IMAGES.look2}>패션화보 (어반 트렌치)</option>
                  <option value={LOOKBOOK_IMAGES.look3}>패션화보 (헤리티지 블레이저)</option>
                  <option value={LOOKBOOK_IMAGES.look4}>패션화보 (내추럴 라이더)</option>
                </select>
              </div>

              <div className="form-group">
                <label>스타일링 포인트 / 한줄 소개</label>
                <input 
                  type="text" 
                  placeholder="예: 무심한 듯 시크하게 연출한 오버핏 룩" 
                  value={newLook.tagline}
                  onChange={e => setNewLook({ ...newLook, tagline: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary-large">룩북 생성 및 완료</button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-title">SEOUL SILHOUETTE</span>
            <p>한국 여성 패션 화보 & 개인 맞춤형 룩북 디지털 아카이브 서비스</p>
          </div>
          <div className="footer-links">
            <div>
              <h5>LOOKBOOK</h5>
              <ul>
                <li>2025 S/S Archive</li>
                <li>2024 F/W Archive</li>
                <li>Editorial Stories</li>
              </ul>
            </div>
            <div>
              <h5>SERVICES</h5>
              <ul>
                <li>Style AI Diagnosis</li>
                <li>Personal Curation</li>
                <li>Brand Partnerships</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SEOUL SILHOUETTE LOOKBOOK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

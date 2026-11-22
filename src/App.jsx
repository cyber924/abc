import React, { useState } from 'react';

// Images provided in prompt
const IMAGES = {
  lifestyle: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1793925850570',
  mobileApp: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/7iLRc6oD_1793769907772',
  stockReport: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/external_ad50b82301cc759beac659444f2698abbfd49220b8a0581c9690bd7e70db531d',
  techReport: 'https://image-hub-studio.herestay-4226.chatgpt.site/api/images/external_029bfbc75b95cd90d58a9185568aa808cabc32a064de196c931e332bffed21f7',
};

const ARTICLES = [
  {
    id: 'art-1',
    category: '재테크/투자',
    tag: '초보 투자 가이드',
    title: '300만원, 당신의 경제적 자유를 위한 첫걸음: 초보자를 위한 소수 우량주 분할 매수 전략',
    image: IMAGES.stockReport,
    readTime: '5분 읽기',
    author: '김현우 자산운용 수석',
    date: '2025.02.20',
    summary: '소액 자본으로도 안정적인 포트폴리오 구축이 가능합니다. 주가 변동성 위험을 줄이고 장기적 수익을 극대화하는 분할 매수(DCA) 실전 템플릿과 핀테일러 추천 주식 리스트를 소개합니다.',
    highlights: ['초보자를 위한 우량주 선택 3대 기준', '월 50만원 분할 매수 자동화 설정법', '리스크 방어를 위한 현금 비중 20% 법칙'],
    isFeatured: true
  },
  {
    id: 'art-2',
    category: '스마트 소비',
    tag: '테크 & 가성비 리포트',
    title: '100만원 미만 최강 업무 파트너: AI 개발자를 위한 휴대성과 디스플레이 완벽 경량 노트북',
    image: IMAGES.techReport,
    readTime: '4분 읽기',
    author: '이민호 스마트소비 큐레이터',
    date: '2025.02.18',
    summary: '고성능 업무 환경 구축과 구독 비용 절감을 한번에! 가성비와 NPU 성능, 배터리 타임을 완벽 교집시킨 2025 최신 경량 노트북 비교 분석 리포트입니다.',
    highlights: ['100만원 이하 3가지 추천 라인업 성능 비교', '코딩 및 프롬프트 작업 시 램/SSD 최적 조합', '구독 회원 전용 최저가 파트너스 제휴 쿠폰'],
    isFeatured: true
  },
  {
    id: 'art-3',
    category: '라이프스타일',
    tag: '소비 패턴 분기',
    title: '여행부터 디저트까지: 내 카드 포인트 100% 현금화 및 카테고리별 혜택 극대화 전략',
    image: IMAGES.lifestyle,
    readTime: '6분 읽기',
    author: '박서연 금융분석팀',
    date: '2025.02.15',
    summary: '패션, 뷰티, 여행, 푸드 소비를 즐기면서도 월 평균 14만원을 환급받는 핀테일러 마이데이터 소비 매칭 가이드.',
    highlights: ['숨어있는 미사용 카드 포인트 5분 조회', '맞춤형 주중/주말 혜택 카드 조합', '핀테일러 리워드 파트너십 상시 할인'],
    isFeatured: false
  },
  {
    id: 'art-4',
    category: '재테크/투자',
    tag: '세금절약 필수',
    title: 'ISA계좌와 연금저축을 활용한 2025 연말정산 최강절세 전략 맵',
    image: IMAGES.mobileApp,
    readTime: '7분 읽기',
    author: '최유진 전문 세무사',
    date: '2025.02.10',
    summary: '소득 수준에 맞춘 절세 세팅법으로 연 최대 118만 8천원 환급 혜택을 챙기는 실전 프로세스를 공개합니다.',
    highlights: ['직장인 소득대별 비과세한도 극대화', 'ETF 자동 투자 결합 노하우'],
    isFeatured: false
  }
];

export default function App() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [isDiagModalOpen, setIsDiagModalOpen] = useState(false);
  const [diagStep, setDiagStep] = useState(1);
  const [diagData, setDiagData] = useState({
    income: '300~500만원',
    goal: '자산증식 & 주식투자',
    lifestyle: '여행 & 쇼핑',
    monthlySavings: '100만원'
  });
  const [diagResult, setDiagResult] = useState(null);
  
  // Interactive Calculator State
  const [calcSpend, setCalcSpend] = useState(150);
  const [calcCategory, setCalcCategory] = useState('all');

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleDiagSubmit = () => {
    // Generate simple AI recommendation based on data
    const estimatedSavings = Math.round(calcSpend * 0.12 * 12);
    setDiagResult({
      score: 84,
      persona: '스마트 파이낸스 가디언',
      topPlan: 'Pro 패키지',
      expectedYearlySavings: `${estimatedSavings}만원`,
      recommendations: [
        '우량주 분할매수 자동 리포트 수신 추천',
        '여행/쇼핑 특화 혜택 카드 큐레이션 제공',
        '월간 세금 절세 알림톡 세팅'
      ]
    });
    setDiagStep(3);
  };

  const filteredArticles = activeTab === 'all' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeTab);

  const calculateReturn = () => {
    const baseSavings = Math.round(calcSpend * 0.08 * 12);
    const investmentYield = Math.round(calcSpend * 0.06);
    return {
      monthlyReturn: Math.round((baseSavings + investmentYield) / 12),
      yearlyReturn: baseSavings + investmentYield
    };
  };

  const calculated = calculateReturn();

  return (
    <div className="app-container">
      {/* Top Banner Notice */}
      <div className="top-banner">
        <span>✨ FinTailor 신규 가입 혜택: 첫 달 100원 체험 & 1:1 자산 진단 리포트 증정</span>
        <button className="banner-btn" onClick={() => setIsSubscribeModalOpen(true)}>혜택 받기 →</button>
      </div>

      {/* Header / Navbar */}
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-area">
            <span className="logo-badge">AI</span>
            <span className="logo-text">FinTailor</span>
            <span className="logo-sub">핀테일러</span>
          </div>

          <nav className="main-nav">
            <a href="#features">서비스 특징</a>
            <a href="#plans">구독 요금제</a>
            <a href="#lifestyle">소비 혜택</a>
            <a href="#reports">AI 금융 리포트</a>
            <a href="#calculator">절감 계산기</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-actions">
            <button className="btn-secondary" onClick={() => { setDiagStep(1); setDiagResult(null); setIsDiagModalOpen(true); }}>
              AI 자산 진단하기
            </button>
            <button className="btn-primary" onClick={() => setIsSubscribeModalOpen(true)}>
              구독 시작하기
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="pill-badge">
              <span className="dot"></span> 2025 맞춤형 개인 금융 구독 서비스 스타트업
            </div>
            <h1 className="hero-title">
              복잡한 재테크와 소비, <br />
              <span className="highlight-text">AI 핀테일러</span>가 매월 당신 맞춤으로 설계합니다
            </h1>
            <p className="hero-desc">
              소비 패턴 분석부터 소액 우량주 분할 매수 전략, 카테고리별 제휴 할인까지.
              매월 이메일과 앱으로 전달되는 전용 마이데이터 금융 큐레이션을 경험해보세요.
            </p>

            <div className="hero-cta-group">
              <button className="btn-primary hero-btn" onClick={() => setIsSubscribeModalOpen(true)}>
                7일 무료 체험 시작하기
              </button>
              <button className="btn-outline hero-btn" onClick={() => { setDiagStep(1); setDiagResult(null); setIsDiagModalOpen(true); }}>
                🔍 나의 AI 재무 점수 확인
              </button>
            </div>

            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-value">98.4%</span>
                <span className="metric-label">구독자 재계약률</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-value">평균 154만원</span>
                <span className="metric-label">연간 맞춤 절감/수익</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-value">4.9 / 5.0</span>
                <span className="metric-label">사용자 만족도 평가</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-card">
              <img 
                src={IMAGES.mobileApp} 
                alt="FinTailor 모바일 앱 메인 뷰 - 도심 빌딩 숲 배경" 
                className="hero-img"
              />
              <div className="image-overlay-card top-right">
                <div className="card-icon">📈</div>
                <div>
                  <div className="card-label">AI 우량주 포트폴리오</div>
                  <div className="card-value">+14.2% 수익률 달성</div>
                </div>
              </div>
              <div className="image-overlay-card bottom-left">
                <div className="card-icon">🎁</div>
                <div>
                  <div className="card-label">이번 달 소비 환급액</div>
                  <div className="card-value">128,500원 절감</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-section" id="features">
        <div className="section-header text-center">
          <span className="section-subtitle">WHY FINTAILOR</span>
          <h2 className="section-title">왜 핀테일러 개인 금융 구독인가요?</h2>
          <p className="section-desc">일반 자산 관리 서비스와 차별화된 핀테일러만의 4가지 스마트 구독 솔루션</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon font-blue">📊</div>
            <h3>소액 우량주 분할 매수 큐레이션</h3>
            <p>300만원 자금으로도 위험 부담 없이 분할 매수할 수 있는 맞춤 종목 포트폴리오와 주간 매수 타임라인을 제공합니다.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon font-purple">🛍️</div>
            <h3>라이프스타일 혜택 매칭</h3>
            <p>여행, 푸드, 화장품, 패션, 가전 등 본인의 소비 성향에 맞춰 최대 제휴 할인을 적용받는 쿠폰 및 캐시백 리포트.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon font-green">💻</div>
            <h3>스마트 업무&기기 가성비 리포트</h3>
            <p>AI 개발자 및 직장인을 위한 100만원 이하 최강 경량 노트북, 업무 생산성 툴 가성비 분석 및 세액공제 가이드.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon font-amber">🔔</div>
            <h3>실시간 마이데이터 위험 알림</h3>
            <p>과소비 경고, 미사용 카드 포인트 소멸 알림, 연말정산 절세 기한 카운트다운을 카카오톡과 앱으로 전달합니다.</p>
          </div>
        </div>
      </section>

      {/* Subscription Pricing Section */}
      <section className="pricing-section" id="plans">
        <div className="section-header text-center">
          <span className="section-subtitle">PLANS & PRICING</span>
          <h2 className="section-title">합리적인 월 구독으로 시작하는 경제적 자유</h2>
          <p className="section-desc">필요한 기능만 선택하여 구독하고 언제든지 자유롭게 해지하세요.</p>

          <div className="billing-toggle">
            <span className={!isAnnual ? 'active' : ''}>월간 결제</span>
            <button 
              className={`toggle-btn ${isAnnual ? 'annual' : ''}`}
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div className="toggle-thumb"></div>
            </button>
            <span className={isAnnual ? 'active' : ''}>
              연간 결제 <span className="discount-tag">20% 할인</span>
            </span>
          </div>
        </div>

        <div className="plans-grid">
          {/* Plan 1 */}
          <div className="plan-card">
            <div className="plan-header">
              <span className="plan-badge basic">BASIC</span>
              <h3>스타터 플랜</h3>
              <p>기초 자산 관리 및 소소한 소비 혜택</p>
              <div className="plan-price">
                <span className="amount">{isAnnual ? '₩3,900' : '₩4,900'}</span>
                <span className="period">/ 월</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>✓ 월간 기초 소비 패턴 진단 리포트</li>
              <li>✓ 미사용 카드 포인트 조회 & 현금화</li>
              <li>✓ 카테고리별 주간 베스트 쿠폰팩</li>
              <li className="disabled">✕ AI 소수 우량주 분할 매수 시그널</li>
              <li className="disabled">✕ 1:1 세무 & 재무 전문 상담</li>
            </ul>
            <button className="btn-plan-outline" onClick={() => { setSelectedPlan('Starter'); setIsSubscribeModalOpen(true); }}>
              스타터 시작하기
            </button>
          </div>

          {/* Plan 2: Highlighted */}
          <div className="plan-card popular">
            <div className="popular-badge">인기 1위 추천</div>
            <div className="plan-header">
              <span className="plan-badge pro">PRO</span>
              <h3>프로 파이낸스 플랜</h3>
              <p>자산 증식 + 최적의 소비 환급 리포트 세트</p>
              <div className="plan-price">
                <span className="amount">{isAnnual ? '₩11,900' : '₩14,900'}</span>
                <span className="period">/ 월</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>✓ <strong>스타터 플랜의 모든 기능 포함</strong></li>
              <li>✓ <strong>300만원 우량주 분할 매수 주간 포트폴리오</strong></li>
              <li>✓ <strong>여행·뷰티·패션 혜택 카테고리 맞춤 매칭</strong></li>
              <li>✓ <strong>100만원 미만 테크/업무기기 가성비 리포트</strong></li>
              <li>✓ 연말정산 절세 가이드 및 카톡 알림톡</li>
            </ul>
            <button className="btn-plan-primary" onClick={() => { setSelectedPlan('Pro'); setIsSubscribeModalOpen(true); }}>
              프로 플랜 7일 무료 체험
            </button>
          </div>

          {/* Plan 3 */}
          <div className="plan-card">
            <div className="plan-header">
              <span className="plan-badge vip">VIP EXECUTIVE</span>
              <h3>프라이빗 VIP 플랜</h3>
              <p>고소득자 & 프라이빗 자산관리를 위한 에디션</p>
              <div className="plan-price">
                <span className="amount">{isAnnual ? '₩23,900' : '₩29,900'}</span>
                <span className="period">/ 월</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>✓ <strong>프로 플랜의 모든 혜택 포함</strong></li>
              <li>✓ <strong>분기별 1:1 자산운용가/세무사 줌 상담 (30분)</strong></li>
              <li>✓ <strong>부동산/해외주식 특화 시그널 리포트</strong></li>
              <li>✓ <strong>프라이빗 오프라인 세미나 초청권</strong></li>
              <li>✓ 전담 파이낸스 매니저 배정</li>
            </ul>
            <button className="btn-plan-outline" onClick={() => { setSelectedPlan('VIP Executive'); setIsSubscribeModalOpen(true); }}>
              VIP 플랜 선택하기
            </button>
          </div>
        </div>
      </section>

      {/* Category Lifestyle Section with Image 1 */}
      <section className="lifestyle-section" id="lifestyle">
        <div className="lifestyle-grid">
          <div className="lifestyle-content">
            <span className="section-subtitle">LIFESTYLE & CATEGORY BENEFIT</span>
            <h2 className="section-title">
              여행, 음식, 뷰티, 패션부터 테크까지 <br />
              내 라이프스타일에 맞춘 매월의 스마트 혜택
            </h2>
            <p className="section-desc">
              핀테일러는 사용자의 일상 소비 성향을 5가지 주요 분야로 분석하여, 
              실질적인 할인가와 현금 환급 혜택을 매월 1일에 큐레이션해 드립니다.
            </p>

            <div className="lifestyle-categories">
              <div className="category-pill active">✈️ 여행 & 레저</div>
              <div className="category-pill">🍽️ 음식 & 외식</div>
              <div className="category-pill">💄 화장품 & 뷰티</div>
              <div className="category-pill">👗 패션 & 쇼핑</div>
              <div className="category-pill">💻 스마트 가전 & 노트북</div>
            </div>

            <div className="lifestyle-stats-box">
              <div className="stat-box-item">
                <span className="num">월 평균 14.8만원</span>
                <span className="txt">구독자 전용 카테고리 혜택 환급</span>
              </div>
              <div className="stat-box-item">
                <span className="num">120+ 파트너사</span>
                <span className="txt">국내외 프리미엄 제휴 브랜드</span>
              </div>
            </div>
          </div>

          <div className="lifestyle-image-col">
            <div className="lifestyle-img-card">
              <img 
                src={IMAGES.lifestyle} 
                alt="여행, 음식, 화장품, 패션, 제품 등 다양한 분야 분 소비 패턴 혜택" 
                className="lifestyle-img"
              />
              <div className="lifestyle-badge-floating">
                <span>🎨 AI 소비 분석 리포트 수신 중</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings & Investment Calculator */}
      <section className="calc-section" id="calculator">
        <div className="calc-card-container">
          <div className="calc-header text-center">
            <span className="section-subtitle">SMART CALCULATOR</span>
            <h2>핀테일러 구독 시 예상 절감 및 수익 시뮬레이터</h2>
            <p>월 평균 지출액을 조절해 예상되는 연간 체감 이득을 직접 확인해보세요.</p>
          </div>

          <div className="calc-body">
            <div className="calc-controls">
              <div className="control-group">
                <label className="label">월 평균 신용/체크카드 지출 금액: <strong>{calcSpend}만원</strong></label>
                <input 
                  type="range" 
                  min="50" 
                  max="500" 
                  step="10" 
                  value={calcSpend} 
                  onChange={(e) => setCalcSpend(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="range-ticks">
                  <span>50만원</span>
                  <span>250만원</span>
                  <span>500만원</span>
                </div>
              </div>

              <div className="control-group">
                <label className="label">주요 관심 소비 영역</label>
                <div className="category-btn-group">
                  <button className={`cat-btn ${calcCategory === 'all' ? 'active' : ''}`} onClick={() => setCalcCategory('all')}>전체 균형</button>
                  <button className={`cat-btn ${calcCategory === 'travel' ? 'active' : ''}`} onClick={() => setCalcCategory('travel')}>여행 & 패션</button>
                  <button className={`cat-btn ${calcCategory === 'tech' ? 'active' : ''}`} onClick={() => setCalcCategory('tech')}>가전 & IT기기</button>
                  <button className={`cat-btn ${calcCategory === 'invest' ? 'active' : ''}`} onClick={() => setCalcCategory('invest')}>우량주 재테크</button>
                </div>
              </div>
            </div>

            <div className="calc-result-box">
              <div className="result-row">
                <span>월간 예상 종합 체감 이득</span>
                <span className="result-val font-accent">약 +{calculated.monthlyReturn.toLocaleString()}만원 / 월</span>
              </div>
              <div className="result-row highlight">
                <span>연간 예상 총 이득 (할인 + 투자수익)</span>
                <span className="result-val main-price">약 +{calculated.yearlyReturn.toLocaleString()}만원 / 년</span>
              </div>

              <div className="calc-breakdown">
                <div className="b-item">
                  <span>🛍️ 포인트/할인 혜택:</span>
                  <strong>약 {Math.round(calcSpend * 0.08 * 12)}만원/년</strong>
                </div>
                <div className="b-item">
                  <span>📈 AI 우량주 분할매수 기대효과:</span>
                  <strong>약 {Math.round(calcSpend * 0.06)}만원/년</strong>
                </div>
              </div>

              <button className="btn-primary full-width" onClick={() => setIsSubscribeModalOpen(true)}>
                이 혜택으로 구독 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Articles & AI Financial Reports (With Images 3 & 4) */}
      <section className="reports-section" id="reports">
        <div className="section-header">
          <div>
            <span className="section-subtitle">MONTHLY CURATED INSIGHTS</span>
            <h2 className="section-title">핀테일러 구독 회원 전용 최신 금융 리포트</h2>
          </div>
          <p className="section-desc">매월 전문가 분석과 마이데이터 AI가 엄선한 아티클을 받아보세요.</p>
        </div>

        {/* Category Filters */}
        <div className="filter-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            전체 리포트
          </button>
          <button 
            className={`tab-btn ${activeTab === '재테크/투자' ? 'active' : ''}`}
            onClick={() => setActiveTab('재테크/투자')}
          >
            📈 재테크 / 우량주 투자
          </button>
          <button 
            className={`tab-btn ${activeTab === '스마트 소비' ? 'active' : ''}`}
            onClick={() => setActiveTab('스마트 소비')}
          >
            💻 스마트 소비 & IT
          </button>
          <button 
            className={`tab-btn ${activeTab === '라이프스타일' ? 'active' : ''}`}
            onClick={() => setActiveTab('라이프스타일')}
          >
            ✈️ 라이프스타일 혜택
          </button>
        </div>

        {/* Featured Articles Grid */}
        <div className="articles-grid">
          {filteredArticles.map((article) => (
            <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
              <div className="article-image-box">
                <img src={article.image} alt={article.title} />
                <span className="article-tag">{article.tag}</span>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span className="cat">{article.category}</span>
                  <span className="dot">•</span>
                  <span className="time">{article.readTime}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-summary">{article.summary}</p>

                <div className="article-footer">
                  <div className="author-info">
                    <span className="author-name">{article.author}</span>
                    <span className="date">{article.date}</span>
                  </div>
                  <button className="read-more-btn">리포트 전문 보기 →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews & Testimonials */}
      <section className="testimonials-section">
        <div className="section-header text-center">
          <span className="section-subtitle">SUBSCRIBER REVIEWS</span>
          <h2 className="section-title">실제 구독자들이 말하는 핀테일러의 변화</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="review-text">
              "300만원으로 초보 우량주 분할 매수를 어떻게 할지 늘 막막했는데, 핀테일러 월간 리포트대로 따라하니 안전하게 포트폴리오를 구성할 수 있었어요!"
            </p>
            <div className="user-profile">
              <div className="avatar font-purple">K</div>
              <div>
                <span className="user-name">김성훈 (31세, 백엔드 개발자)</span>
                <span className="user-plan">프로 플랜 8개월 차 구독중</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="review-text">
              "업무용 노트북 사려고 알아보던 차에 100만원 이하 가성비 분석 리포트를 보고 산 노트북이 대만족입니다. 제휴 할인으로 12만원 추가 할인까지 챙겼네요."
            </p>
            <div className="user-profile">
              <div className="avatar font-blue">L</div>
              <div>
                <span className="user-name">이이지 (28세, UX 디자이너)</span>
                <span className="user-plan">프로 플랜 1년 구독중</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="review-text">
              "여행과 화장품 지출이 많은 편인데 내 생활 패턴에 딱 맞는 할인 리포트가 전송되어서 매월 구독료 15,000원의 몇 배 이상 혜택을 돌려받고 있습니다."
            </p>
            <div className="user-profile">
              <div className="avatar font-green">P</div>
              <div>
                <span className="user-name">박지수 (35세, 마케팅 팀장)</span>
                <span className="user-plan">VIP 플랜 5개월 차 구독중</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="section-header text-center">
          <span className="section-subtitle">FAQ</span>
          <h2 className="section-title">자주 묻는 질문</h2>
        </div>

        <div className="faq-list">
          {[
            {
              q: '금융 구독 서비스는 정확히 어떤 형식으로 전달되나요?',
              a: '핀테일러 구독 서비스는 웹/모바일 전용 파이낸스 대시보드와 함께 매주 카카오톡 알림톡 및 매월 1일 발행되는 PDF 프리미엄 맞춤 리포트로 전달됩니다.'
            },
            {
              q: '300만원 우량주 분할 매수 전략은 초보자도 쉽게 따라 할 수 있나요?',
              a: '네! 주식 초보자도 이해하기 쉬운 단순 매수 타이밍 계산식과 종목 비중 템플릿을 제공합니다. 클릭 한 번으로 미니스탁/소수점 투자 계좌와 연동 가능합니다.'
            },
            {
              q: '구독 해지는 언제든지 가능한가요?',
              a: '네, 약정 없이 언제든지 마이페이지에서 클릭 한번으로 중도 해지할 수 있으며 남은 기간에 대해 일할 계산 혹은 환불 정책이 명확하게 적용됩니다.'
            },
            {
              q: '1:1 자산 진단 리포트는 어떤 내용을 담고 있나요?',
              a: '사용자의 수입, 고정지출, 변동지출, 금융 목표 데이터를 기반으로 AI가 최적의 절세/투자/소비 비율을 템플릿화하여 제공합니다.'
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${expandedFaq === idx ? 'open' : ''}`}
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
            >
              <div className="faq-question">
                <span>Q. {item.q}</span>
                <span className="faq-icon">{expandedFaq === idx ? '−' : '+'}</span>
              </div>
              {expandedFaq === idx && (
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>지금 핀테일러와 함께 똑똑한 금융 라이프를 시작하세요</h2>
          <p>첫 7일간 전 기능 0원 무료 체험. 언제든 해지 가능합니다.</p>
          <div className="cta-btn-group">
            <button className="btn-primary btn-large" onClick={() => setIsSubscribeModalOpen(true)}>
              7일 무료 체험 신청하기
            </button>
            <button className="btn-secondary btn-large" onClick={() => { setDiagStep(1); setDiagResult(null); setIsDiagModalOpen(true); }}>
              AI 진단 키트 시작
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-area">
              <span className="logo-badge">AI</span>
              <span className="logo-text">FinTailor</span>
            </div>
            <p className="footer-desc">
              (주)핀테일러 | 맞춤형 개인 금융 구독 서비스 스타트업<br />
              서울특별시 강남구 테헤란로 427 핀테크타워 12층<br />
              사업자 등록번호: 214-88-09124 | 통신판매업신고: 2025-서울강남-01928
            </p>
          </div>

          <div className="footer-links-group">
            <div className="link-col">
              <h4>서비스</h4>
              <a href="#features">기능 소개</a>
              <a href="#plans">구독 요금제</a>
              <a href="#lifestyle">라이프스타일 혜택</a>
              <a href="#reports">금융 리포트</a>
            </div>

            <div className="link-col">
              <h4>고객지원</h4>
              <a href="#faq">자주 묻는 질문</a>
              <a href="#terms">이용약관</a>
              <a href="#privacy">개인정보처리방침</a>
              <a href="#contact">1:1 문의하기</a>
            </div>

            <div className="link-col">
              <h4>구독 뉴스레터</h4>
              <p className="small-text">무료 금융 꿀팁 아티클을 매주 이메일로 전달해드립니다.</p>
              <div className="newsletter-input-box">
                <input type="email" placeholder="이메일 주소를 입력하세요" />
                <button onClick={() => alert('구독 신청이 완료되었습니다!')}>신청</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 FinTailor Inc. All rights reserved. 본 서비스는 투자 권유가 아닌 정보 제공용 맞춤 리포트입니다.</p>
        </div>
      </footer>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="modal-card article-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedArticle(null)}>✕</button>
            <div className="modal-header">
              <span className="article-modal-tag">{selectedArticle.tag}</span>
              <h2>{selectedArticle.title}</h2>
              <div className="modal-meta">
                <span>작성자: {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            <div className="modal-body">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="modal-article-img" />
              
              <div className="modal-summary-box">
                <h4>📌 리포트 요약 및 핵심 포인트</h4>
                <p>{selectedArticle.summary}</p>
                <ul>
                  {selectedArticle.highlights.map((h, i) => (
                    <li key={i}>✓ {h}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-text-content">
                <h3>1. 데이터 기반의 개인화 접근 방식</h3>
                <p>
                  기존의 일률적인 금융 상품 추천과 달리, 핀테일러의 AI 마이데이터 엔진은 사용자의 지난 6개월간의 고정 지출과 카테고리별 성향을 정밀 분석합니다. 
                  자산의 15~20% 범위 내에서 위험 부담을 분산하며 안정적인 우량주 분할 매수 타이밍을 도출합니다.
                </p>

                <h3>2. 실전 적용 템플릿 안내</h3>
                <p>
                  본 리포트에서 제시하는 포트폴리오는 시가총액 상위 종목과 배당 수익률 4% 이상의 우량주를 7:3 비율로 배분하여 월 단위로 정기 매수하는 자동화 템플릿입니다. 
                  구독 회원은 아래 버튼을 클릭하여 본인의 증권사 앱으로 자동 시그널을 연동할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" onClick={() => { setSelectedArticle(null); setIsSubscribeModalOpen(true); }}>
                리포트 템플릿 내 포트폴리오에 적용하기
              </button>
              <button className="btn-secondary" onClick={() => setSelectedArticle(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Checkout Modal */}
      {isSubscribeModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsSubscribeModalOpen(false)}>
          <div className="modal-card subscribe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsSubscribeModalOpen(false)}>✕</button>
            
            <div className="subscribe-modal-header">
              <h2>FinTailor 개인 금융 구독 신청</h2>
              <p>첫 7일간 0원으로 모든 리포트와 AI 큐레이션을 체험하세요!</p>
            </div>

            <div className="plan-selection-bar">
              <label>선택한 요금제:</label>
              <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <option value="Starter">스타터 플랜 (₩4,900/월)</option>
                <option value="Pro">프로 파이낸스 플랜 (₩14,900/월 - 추천)</option>
                <option value="VIP Executive">프라이빗 VIP 플랜 (₩29,900/월)</option>
              </select>
            </div>

            <form className="subscribe-form" onSubmit={(e) => { e.preventDefault(); alert('구독 신청이 완료되었습니다! 첫 7일간 무료 체험이 적용됩니다.'); setIsSubscribeModalOpen(false); }}>
              <div className="form-group">
                <label>이름</label>
                <input type="text" placeholder="홍길동" required />
              </div>

              <div className="form-group">
                <label>이메일 주소 (리포트 수신용)</label>
                <input type="email" placeholder="example@fintailor.com" required />
              </div>

              <div className="form-group">
                <label>휴대폰 번호 (알림톡 수신용)</label>
                <input type="tel" placeholder="010-1234-5678" required />
              </div>

              <div className="form-group">
                <label>주요 관심 카테고리 (복수 선택 가능)</label>
                <div className="checkbox-grid">
                  <label><input type="checkbox" defaultChecked /> 📈 소수 우량주 분할매수</label>
                  <label><input type="checkbox" defaultChecked /> 💻 업무/IT기기 가성비 리포트</label>
                  <label><input type="checkbox" defaultChecked /> ✈️ 여행 & 패션 혜택</label>
                  <label><input type="checkbox" defaultChecked /> 🏛️ 연말정산 절세 팁</label>
                </div>
              </div>

              <div className="payment-summary">
                <div className="summary-row">
                  <span>7일 체험 기간 요금:</span>
                  <span className="font-accent">0원</span>
                </div>
                <div className="summary-row">
                  <span>체험 종료 후 결제 예정액:</span>
                  <span><strong>{selectedPlan === 'Starter' ? '₩4,900' : selectedPlan === 'Pro' ? '₩14,900' : '₩29,900'} / 월</strong></span>
                </div>
              </div>

              <button type="submit" className="btn-primary full-width btn-large">
                7일 무료 체험 구독 시작하기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AI Financial Checkup / Diagnosis Modal */}
      {isDiagModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsDiagModalOpen(false)}>
          <div className="modal-card diag-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsDiagModalOpen(false)}>✕</button>

            {diagStep === 1 && (
              <div>
                <div className="diag-header">
                  <span className="step-tag">STEP 1 / 2</span>
                  <h2>나의 맞춤 AI 금융 스타일 진단</h2>
                  <p>간단한 3가지 질의응답을 통해 최적의 금융 구독 리포트를 매칭합니다.</p>
                </div>

                <div className="diag-form">
                  <div className="form-group">
                    <label>월 평균 소득 구간</label>
                    <select 
                      value={diagData.income}
                      onChange={(e) => setDiagData({...diagData, income: e.target.value})}
                    >
                      <option value="250만원 이하">250만원 이하</option>
                      <option value="300~500만원">300~500만원</option>
                      <option value="500~800만원">500~800만원</option>
                      <option value="800만원 이상">800만원 이상</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>가장 바라는 2025 금융 목표</label>
                    <select 
                      value={diagData.goal}
                      onChange={(e) => setDiagData({...diagData, goal: e.target.value})}
                    >
                      <option value="자산증식 & 주식투자">300만원 자금으로 소수 우량주 안전 투자</option>
                      <option value="스마트 소비 & 절약">지출 절감 및 테크/업무기기 가성비 구매</option>
                      <option value="라이프스타일 혜택">여행/쇼핑/푸드 카드 혜택 현금 환급</option>
                      <option value="연말정산 절세">소득공제 & 연금저축 세금 환급 극대화</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>월 평균 저축/투자 가능 금액</label>
                    <select 
                      value={diagData.monthlySavings}
                      onChange={(e) => setDiagData({...diagData, monthlySavings: e.target.value})}
                    >
                      <option value="50만원 이하">50만원 이하</option>
                      <option value="100만원">약 100만원</option>
                      <option value="200만원 이상">200만원 이상</option>
                    </select>
                  </div>

                  <button className="btn-primary full-width" onClick={() => setDiagStep(2)}>
                    다음 단계로 이동 →
                  </button>
                </div>
              </div>
            )}

            {diagStep === 2 && (
              <div>
                <div className="diag-header">
                  <span className="step-tag">STEP 2 / 2</span>
                  <h2>AI 마이데이터 분석 엔진 가동 중...</h2>
                  <p>입력하신 데이터와 핀테일러 12만 회원 데이터를 대조하고 있습니다.</p>
                </div>

                <div className="loading-animation-box">
                  <div className="spinner"></div>
                  <p className="loading-text">소비 패턴 & 300만원 우량주 분할 매수 시뮬레이션 매칭 중...</p>
                </div>

                <button className="btn-primary full-width" onClick={handleDiagSubmit}>
                  AI 진단 결과 확인하기
                </button>
              </div>
            )}

            {diagStep === 3 && diagResult && (
              <div>
                <div className="diag-header text-center">
                  <span className="result-badge">진단 완료</span>
                  <h2>당신의 금융 페르소나: <span className="highlight-text">{diagResult.persona}</span></h2>
                  <p>AI 진단 재무 건강도: <strong>{diagResult.score}점 / 100점</strong></p>
                </div>

                <div className="diag-result-card">
                  <div className="result-metric-box">
                    <div>
                      <span>추천 맞춤 구독 요금제</span>
                      <h3>{diagResult.topPlan}</h3>
                    </div>
                    <div>
                      <span>예상 연간 혜택 환급</span>
                      <h3 className="font-accent">{diagResult.expectedYearlySavings}</h3>
                    </div>
                  </div>

                  <div className="rec-list-box">
                    <h4>🎯 핀테일러 맞춤 솔루션 제언</h4>
                    <ul>
                      {diagResult.recommendations.map((rec, idx) => (
                        <li key={idx}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="modal-footer-btn-group">
                  <button className="btn-primary full-width" onClick={() => { setIsDiagModalOpen(false); setIsSubscribeModalOpen(true); }}>
                    이 맞춤 플랜으로 7일 무료 체험하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

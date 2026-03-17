// --- 1. 扩充的数据库 (16个场馆数据) ---
const initialPhotos = [
    // 体育场
    {
        id: 1,
        venue: "Santiago Bernabéu",
        city: "Madrid",
        type: "sport",
        section: "South End",
        seat: "Section 112, Row 5",
        comment: "伯纳乌的气氛太疯狂了！这个位置离球门很近。",
        user: "Madridista_99",
        img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        venue: "Wembley Stadium",
        city: "London",
        type: "sport",
        section: "Level 5",
        seat: "Block 501, Row 20",
        comment: "虽然很高，但是温布利的视野完全无遮挡，统揽全局。",
        user: "UK_Football",
        img: "https://images.unsplash.com/photo-1516478335943-93ae88681614?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        venue: "Allianz Arena",
        city: "Munich",
        type: "sport",
        section: "North Tribune",
        seat: "Block 130, Standing",
        comment: "拜仁的主场红得让人热血沸腾！",
        user: "BayernFan",
        img: "https://images.unsplash.com/photo-1562827550-38244406a8c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        venue: "Crypto.com Arena",
        city: "Los Angeles",
        type: "sport",
        section: "Loge Level",
        seat: "Section 111",
        comment: "看湖人队比赛的最佳角度，侧面视野很好。",
        user: "KobeForever",
        img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        venue: "Rod Laver Arena",
        city: "Melbourne",
        type: "sport",
        section: "Upper Baseline",
        seat: "Row HH",
        comment: "澳网公开赛，蓝色硬地非常漂亮。",
        user: "TennisLvr",
        img: "https://images.unsplash.com/photo-1531315630201-bb15dbef08b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        venue: "Tokyo Dome",
        city: "Tokyo",
        type: "sport",
        section: "Infield",
        seat: "1st Base Side",
        comment: "巨蛋内部非常震撼，看棒球或者演唱会都很棒。",
        user: "TokyoTraveler",
        img: "https://images.unsplash.com/photo-1595861161269-8984a504049b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    // 演唱会
    {
        id: 7,
        venue: "Red Rocks Amphitheatre",
        city: "Colorado",
        type: "concert",
        section: "General Admission",
        seat: "Row 40",
        comment: "世界上最美的户外剧场，自然岩石的音效绝了。",
        user: "NatureRocker",
        img: "https://images.unsplash.com/photo-1543552272-e7197374cb42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        venue: "Madison Square Garden",
        city: "New York",
        type: "concert",
        section: "Floor A",
        seat: "Row 10",
        comment: "传奇场馆！离舞台非常近，感觉像在做梦。",
        user: "NYC_Beats",
        img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        venue: "The O2",
        city: "London",
        type: "concert",
        section: "Level 1",
        seat: "Block 102",
        comment: "视野很好，而且座椅比想象中舒服。",
        user: "LondonPop",
        img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        venue: "Coachella Main Stage",
        city: "Indio",
        type: "concert",
        section: "VIP Area",
        seat: "Standing",
        comment: "加州的日落配上音乐节，氛围感拉满。",
        user: "FestivalQueen",
        img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        venue: "Royal Albert Hall",
        city: "London",
        type: "concert",
        section: "Rausing Circle",
        seat: "Seat 40",
        comment: "古典与现代的结合，灯光效果迷人。",
        user: "ClassicFan",
        img: "https://images.unsplash.com/photo-1514306191717-452ec28c7c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    // 剧院/艺术
    {
        id: 12,
        venue: "Sydney Opera House",
        city: "Sydney",
        type: "theater",
        section: "Stalls",
        seat: "Row G, Seat 22",
        comment: "建筑本身就是艺术品，音响效果无可挑剔。",
        user: "AussieArts",
        img: "https://images.unsplash.com/photo-1598546716842-795238c75605?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 13,
        venue: "Palais Garnier",
        city: "Paris",
        type: "theater",
        section: "Balcony",
        seat: "Box 5",
        comment: "富丽堂皇的巴黎歌剧院，仿佛穿越回了19世纪。",
        user: "ParisDreamer",
        img: "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 14,
        venue: "Broadway Theatre",
        city: "New York",
        type: "theater",
        section: "Mezzanine",
        seat: "Row A",
        comment: "看音乐剧的最佳位置，能看到整个舞台编排。",
        user: "BroadwayFan",
        img: "https://images.unsplash.com/photo-1503095392237-305039261c09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 15,
        venue: "Elbphilharmonie",
        city: "Hamburg",
        type: "theater",
        section: "Great Hall",
        seat: "Level 15",
        comment: "现代声学设计的巅峰，每个角落听得都很清楚。",
        user: "MusicTech",
        img: "https://images.unsplash.com/photo-1535903024912-1bb658306dc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 16,
        venue: "La Scala",
        city: "Milan",
        type: "theater",
        section: "Plateau",
        seat: "Row 8",
        comment: "米兰斯卡拉大剧院，歌剧爱好者的圣地。",
        user: "OperaLvr",
        img: "https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// --- 状态与路由 ---
let photos = [...initialPhotos];
let currentUser = null; 
let currentFilter = 'all';

function router(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    document.getElementById(`${pageId}-page`).classList.add('active');
    window.scrollTo(0, 0);
}

// --- 认证逻辑 ---
function checkAuth() {
    const navLinks = document.getElementById('navLinks');
    if (currentUser) {
        navLinks.innerHTML = `
            <li><span class="nav-item-link">Hi, ${currentUser}</span></li>
            <li><button class="btn-signup" onclick="toggleModal(true)"><i class="fas fa-plus"></i> 上传</button></li>
            <li><a href="#" class="nav-item-link" onclick="handleLogout()">退出</a></li>
        `;
    } else {
        navLinks.innerHTML = `
            <li><a href="#" class="nav-item-link btn-login" onclick="router('login')">登录</a></li>
            <li><button class="btn-signup" onclick="router('register')">注册</button></li>
        `;
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    if(email) {
        currentUser = email.split('@')[0];
        checkAuth();
        router('home');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    if(name) {
        currentUser = name;
        checkAuth();
        router('home');
    }
}

function handleLogout() {
    currentUser = null;
    checkAuth();
    router('home');
}

// --- 渲染核心逻辑 ---
function renderPhotos(data) {
    const grid = document.getElementById('photoGrid');
    const emptyState = document.getElementById('emptyState');
    
    grid.innerHTML = '';
    
    if (data.length === 0) {
        emptyState.style.display = 'block';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        // 只有在 'all' 模式下才显示类型角标，不然有点冗余
        const badge = currentFilter === 'all' ? `<span class="type-badge">${item.type}</span>` : '';
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                ${badge}
                <img src="${item.img}" class="card-img" loading="lazy" alt="${item.venue}">
            </div>
            <div class="card-content">
                <div class="venue-name">${item.venue}</div>
                <div class="seat-info">
                    <i class="fas fa-chair"></i> ${item.section} · ${item.seat}
                </div>
                <div class="comment-box">
                    "${item.comment}"
                </div>
                <div class="user-meta">
                    <span><i class="far fa-user"></i> ${item.user}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${item.city}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- 搜索与筛选 ---
function handleSearch() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    filterData(keyword, currentFilter);
}

function filterTag(type) {
    currentFilter = type;
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    // 找到点击的按钮添加active (这里简化处理，实际可用e.target)
    const buttons = document.querySelectorAll('.tag');
    if(type === 'all') buttons[0].classList.add('active');
    if(type === 'concert') buttons[1].classList.add('active');
    if(type === 'sport') buttons[2].classList.add('active');
    if(type === 'theater') buttons[3].classList.add('active');

    const keyword = document.getElementById('searchInput').value.toLowerCase();
    filterData(keyword, currentFilter);
}

function filterData(keyword, type) {
    const filtered = photos.filter(item => {
        const matchKeyword = item.venue.toLowerCase().includes(keyword) || 
                           item.city.toLowerCase().includes(keyword) ||
                           item.comment.toLowerCase().includes(keyword);
        const matchType = type === 'all' || item.type === type;
        return matchKeyword && matchType;
    });
    renderPhotos(filtered);
}

// --- 上传 ---
function toggleModal(show) {
    if (show && !currentUser) {
        router('login');
        return;
    }
    document.getElementById('uploadModal').style.display = show ? 'block' : 'none';
}

function handleUpload(e) {
    e.preventDefault();
    const venue = document.getElementById('upVenue').value;
    const type = document.getElementById('upType').value;
    const section = document.getElementById('upSection').value;
    const seat = document.getElementById('upSeat').value;
    const comment = document.getElementById('upComment').value;
    const imgInput = document.getElementById('upImg').value;
    
    // 默认占位图
    const defaultImg = "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&w=800&q=80";

    const newPhoto = {
        id: Date.now(),
        venue: venue,
        city: "Unknown", // 简化
        type: type,
        section: section,
        seat: seat,
        comment: comment,
        user: currentUser,
        img: imgInput || defaultImg
    };

    photos.unshift(newPhoto);
    renderPhotos(photos);
    toggleModal(false);
    e.target.reset();
    alert("发布成功！");
}

// 初始化
window.onload = () => {
    renderPhotos(photos);
    checkAuth();
};

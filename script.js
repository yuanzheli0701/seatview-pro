// SeatView Pro - Complete JavaScript

// Global State
let photos = [];
let currentUser = null;
let currentFilter = 'all';
let currentView = 'grid';
let map = null;
let favorites = JSON.parse(localStorage.getItem('seatview_favorites') || '[]');
let userUploads = JSON.parse(localStorage.getItem('seatview_uploads') || '[]');
let comments = JSON.parse(localStorage.getItem('seatview_comments') || '{}');
let currentRating = 0;

// Extended venue data with coordinates
const initialPhotos = [
    { id: 1, venue: "Santiago Bernabéu", city: "Madrid", country: "Spain", type: "sport", section: "South End", seat: "Section 112, Row 5", comment: "伯纳乌的气氛太疯狂了！这个位置离球门很近。", user: "Madridista_99", img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800", rating: 5, lat: 40.4531, lng: -3.6883 },
    { id: 2, venue: "Wembley Stadium", city: "London", country: "UK", type: "sport", section: "Level 5", seat: "Block 501, Row 20", comment: "虽然很高，但是温布利的视野完全无遮挡，统揽全局。", user: "UK_Football", img: "https://images.unsplash.com/photo-1516478335943-93ae88681614?w=800", rating: 4, lat: 51.5560, lng: -0.2795 },
    { id: 3, venue: "Allianz Arena", city: "Munich", country: "Germany", type: "sport", section: "North Tribune", seat: "Block 130, Standing", comment: "拜仁的主场红得让人热血沸腾！", user: "BayernFan", img: "https://images.unsplash.com/photo-1562827550-38244406a8c3?w=800", rating: 5, lat: 48.2188, lng: 11.6247 },
    { id: 4, venue: "Crypto.com Arena", city: "Los Angeles", country: "USA", type: "sport", section: "Loge Level", seat: "Section 111", comment: "看湖人队比赛的最佳角度，侧面视野很好。", user: "KobeForever", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800", rating: 4, lat: 34.0430, lng: -118.2673 },
    { id: 5, venue: "Rod Laver Arena", city: "Melbourne", country: "Australia", type: "sport", section: "Upper Baseline", seat: "Row HH", comment: "澳网公开赛，蓝色硬地非常漂亮。", user: "TennisLvr", img: "https://images.unsplash.com/photo-1531315630201-bb15dbef08b9?w=800", rating: 4, lat: -37.8216, lng: 144.9785 },
    { id: 6, venue: "Tokyo Dome", city: "Tokyo", country: "Japan", type: "sport", section: "Infield", seat: "1st Base Side", comment: "巨蛋内部非常震撼，看棒球或者演唱会都很棒。", user: "TokyoTraveler", img: "https://images.unsplash.com/photo-1595861161269-8984a504049b?w=800", rating: 5, lat: 35.7056, lng: 139.7519 },
    { id: 7, venue: "Red Rocks Amphitheatre", city: "Colorado", country: "USA", type: "concert", section: "General Admission", seat: "Row 40", comment: "世界上最美的户外剧场，自然岩石的音效绝了。", user: "NatureRocker", img: "https://images.unsplash.com/photo-1543552272-e7197374cb42?w=800", rating: 5, lat: 39.6654, lng: -105.2057 },
    { id: 8, venue: "Madison Square Garden", city: "New York", country: "USA", type: "concert", section: "Floor A", seat: "Row 10", comment: "传奇场馆！离舞台非常近，感觉像在做梦。", user: "NYC_Beats", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800", rating: 5, lat: 40.7505, lng: -73.9934 },
    { id: 9, venue: "The O2", city: "London", country: "UK", type: "concert", section: "Level 1", seat: "Block 102", comment: "视野很好，而且座椅比想象中舒服。", user: "LondonPop", img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800", rating: 4, lat: 51.5030, lng: 0.0032 },
    { id: 10, venue: "Coachella Main Stage", city: "Indio", country: "USA", type: "concert", section: "VIP Area", seat: "Standing", comment: "加州的日落配上音乐节，氛围感拉满。", user: "FestivalQueen", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800", rating: 5, lat: 33.6820, lng: -116.2382 },
    { id: 11, venue: "Royal Albert Hall", city: "London", country: "UK", type: "concert", section: "Rausing Circle", seat: "Seat 40", comment: "古典与现代的结合，灯光效果迷人。", user: "ClassicFan", img: "https://images.unsplash.com/photo-1514306191717-452ec28c7c31?w=800", rating: 5, lat: 51.5009, lng: -0.1774 },
    { id: 12, venue: "Sydney Opera House", city: "Sydney", country: "Australia", type: "theater", section: "Stalls", seat: "Row G, Seat 22", comment: "建筑本身就是艺术品，音响效果无可挑剔。", user: "AussieArts", img: "https://images.unsplash.com/photo-1598546716842-795238c75605?w=800", rating: 5, lat: -33.8568, lng: 151.2153 },
    { id: 13, venue: "Palais Garnier", city: "Paris", country: "France", type: "theater", section: "Balcony", seat: "Box 5", comment: "富丽堂皇的巴黎歌剧院，仿佛穿越回了19世纪。", user: "ParisDreamer", img: "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?w=800", rating: 5, lat: 48.8720, lng: 2.3316 },
    { id: 14, venue: "Broadway Theatre", city: "New York", country: "USA", type: "theater", section: "Mezzanine", seat: "Row A", comment: "看音乐剧的最佳位置，能看到整个舞台编排。", user: "BroadwayFan", img: "https://images.unsplash.com/photo-1503095392237-305039261c09?w=800", rating: 4, lat: 40.7590, lng: -73.9845 },
    { id: 15, venue: "Elbphilharmonie", city: "Hamburg", country: "Germany", type: "theater", section: "Great Hall", seat: "Level 15", comment: "现代声学设计的巅峰，每个角落听得都很清楚。", user: "MusicTech", img: "https://images.unsplash.com/photo-1535903024912-1bb658306dc9?w=800", rating: 5, lat: 53.5431, lng: 9.9856 },
    { id: 16, venue: "La Scala", city: "Milan", country: "Italy", type: "theater", section: "Plateau", seat: "Row 8", comment: "米兰斯卡拉大剧院，歌剧爱好者的圣地。", user: "OperaLvr", img: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800", rating: 5, lat: 45.4676, lng: 9.1895 }
];

// Initialize
window.onload = () => {
    const savedPhotos = localStorage.getItem('seatview_photos');
    photos = savedPhotos ? JSON.parse(savedPhotos) : [...initialPhotos];
    
    const savedUser = localStorage.getItem('seatview_user');
    if (savedUser) currentUser = JSON.parse(savedUser);
    
    const savedTheme = localStorage.getItem('seatview_theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeIcon').className = 'fas fa-sun';
    }
    
    renderPhotos(photos);
    checkAuth();
};

// Router
function router(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    const page = document.getElementById(`${pageId}-page`);
    if (page) page.classList.add('active');
    window.scrollTo(0, 0);
    if (pageId === 'home' && currentView === 'map') setTimeout(initMap, 100);
}

// Authentication
function checkAuth() {
    const navLinks = document.getElementById('navLinks');
    if (currentUser) {
        navLinks.innerHTML = `
            <li><a href="#" class="nav-item-link" onclick="router('profile')"><i class="fas fa-user"></i> ${currentUser.name}</a></li>
            <li><button class="btn-signup" onclick="toggleModal(true)"><i class="fas fa-plus"></i> 上传</button></li>
            <li><a href="#" class="nav-item-link" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i></a></li>
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
    const password = document.getElementById('loginPass').value;
    if (email && password) {
        currentUser = { name: email.split('@')[0], email: email, id: Date.now() };
        localStorage.setItem('seatview_user', JSON.stringify(currentUser));
        checkAuth();
        router('home');
        showNotification('登录成功！', 'success');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPass').value;
    const confirmPass = document.getElementById('regPassConfirm').value;
    if (password !== confirmPass) {
        showNotification('两次输入的密码不一致', 'error');
        return;
    }
    if (name && email && password) {
        currentUser = { name: name, email: email, id: Date.now() };
        localStorage.setItem('seatview_user', JSON.stringify(currentUser));
        checkAuth();
        router('home');
        showNotification('注册成功！', 'success');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('seatview_user');
    checkAuth();
    router('home');
    showNotification('已退出登录', 'info');
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('seatview_theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
        localStorage.setItem('seatview_theme', 'dark');
    }
}

// View Toggle
function toggleView() {
    const grid = document.getElementById('photoGrid');
    const map = document.getElementById('mapView');
    const icon = document.getElementById('viewIcon');
    const text = document.getElementById('viewText');
    if (currentView === 'grid') {
        currentView = 'map';
        grid.style.display = 'none';
        map.style.display = 'block';
        icon.className = 'fas fa-map';
        text.textContent = '地图视图';
        setTimeout(initMap, 100);
    } else {
        currentView = 'grid';
        grid.style.display = 'grid';
        map.style.display = 'none';
        icon.className = 'fas fa-th-large';
        text.textContent = '网格视图';
    }
}

// Initialize Map
function initMap() {
    if (map) map.remove();
    map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    photos.forEach(photo => {
        if (photo.lat && photo.lng) {
            const marker = L.marker([photo.lat, photo.lng]).addTo(map);
            marker.bindPopup(`
                <div style="text-align: center; min-width: 200px;">
                    <img src="${photo.img}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
                    <h3 style="margin: 0 0 4px 0; font-size: 1rem;">${photo.venue}</h3>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">${photo.city}</p>
                    <button onclick="showDetail(${photo.id})" style="margin-top: 8px; padding: 6px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">查看详情</button>
                </div>
            `);
        }
    });
}

// Render Photos
function renderPhotos(data) {
    const grid = document.getElementById('photoGrid');
    const emptyState = document.getElementById('emptyState');
    grid.innerHTML = '';
    if (data.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';
    data.forEach(item => {
        const isFavorited = favorites.includes(item.id);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrapper" onclick="showDetail(${item.id})">
                <span class="type-badge">${getTypeLabel(item.type)}</span>
                <div class="card-actions" onclick="event.stopPropagation()">
                    <button class="card-action-btn ${isFavorited ? 'active' : ''}" onclick="toggleFavorite(${item.id}, this)">
                        <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                ${item.rating ? `<span class="rating-badge"><i class="fas fa-star"></i> ${item.rating}</span>` : ''}
                <img src="${item.img}" class="card-img" loading="lazy" alt="${item.venue}">
            </div>
            <div class="card-content" onclick="showDetail(${item.id})">
                <div class="venue-name">${item.venue}</div>
                <div class="seat-info"><i class="fas fa-chair"></i> ${item.section} · ${item.seat}</div>
                <div class="comment-box">"${item.comment}"</div>
                <div class="user-meta">
                    <div class="user-meta-left">
                        <div class="user-avatar">${item.user.charAt(0).toUpperCase()}</div>
                        <span>${item.user}</span>
                    </div>
                    <span><i class="fas fa-map-marker-alt"></i> ${item.city}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function getTypeLabel(type) {
    const labels = { concert: '演唱会', sport: '体育', theater: '剧院' };
    return labels[type] || type;
}

// Search & Filter
function handleSearch() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    filterData(keyword, currentFilter);
}

function filterTag(type) {
    currentFilter = type;
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    const buttons = document.querySelectorAll('.tag');
    const typeMap = { all: 0, concert: 1, sport: 2, theater: 3 };
    buttons[typeMap[type]].classList.add('active');
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    filterData(keyword, currentFilter);
}

function filterData(keyword, type) {
    const filtered = photos.filter(item => {
        const matchKeyword = item.venue.toLowerCase().includes(keyword) || 
                           item.city.toLowerCase().includes(keyword) ||
                           item.comment.toLowerCase().includes(keyword) ||
                           item.country.toLowerCase().includes(keyword);
        const matchType = type === 'all' || item.type === type;
        return matchKeyword && matchType;
    });
    renderPhotos(filtered);
}

// Detail Page
function showDetail(id) {
    const photo = photos.find(p => p.id === id);
    if (!photo) return;
    const detailContent = document.getElementById('detailContent');
    const isFavorited = favorites.includes(id);
    const photoComments = comments[id] || [];
    detailContent.innerHTML = `
        <div class="detail-content">
            <img src="${photo.img}" class="detail-image" alt="${photo.venue}">
            <div class="detail-info">
                <div class="detail-header">
                    <div>
                        <h1 class="detail-title">${photo.venue}</h1>
                        <div class="detail-location"><i class="fas fa-map-marker-alt"></i> ${photo.city}, ${photo.country}</div>
                    </div>
                    ${photo.rating ? `<div class="detail-rating"><span class="stars">${'★'.repeat(photo.rating)}${'☆'.repeat(5-photo.rating)}</span><span>${photo.rating}/5</span></div>` : ''}
                </div>
                <div class="detail-sections">
                    <div class="detail-section"><h4>区域</h4><p>${photo.section}</p></div>
                    <div class="detail-section"><h4>座位</h4><p>${photo.seat}</p></div>
                    <div class="detail-section"><h4>类型</h4><p>${getTypeLabel(photo.type)}</p></div>
                    <div class="detail-section"><h4>分享者</h4><p>@${photo.user}</p></div>
                </div>
                <div class="detail-comment">"${photo.comment}"</div>
                <div class="detail-actions">
                    <button class="detail-action-btn ${isFavorited ? 'active' : ''}" onclick="toggleFavorite(${photo.id}, null, true)"><i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i> ${isFavorited ? '已收藏' : '收藏'}</button>
                    <button class="detail-action-btn" onclick="sharePhoto(${photo.id})"><i class="fas fa-share-alt"></i> 分享</button>
                    <button class="detail-action-btn primary" onclick="openImageModal('${photo.img}', '${photo.venue}', '${photo.comment}')"><i class="fas fa-expand"></i> 查看大图</button>
                </div>
                <div class="comments-section">
                    <h3><i class="fas fa-comments"></i> 评论 (${photoComments.length})</h3>
                    ${currentUser ? `<div class="comment-form"><textarea id="commentInput" placeholder="分享你的想法..."></textarea><button class="btn-primary" onclick="addComment(${photo.id})" style="width: auto; padding: 12px 32px;"><i class="fas fa-paper-plane"></i> 发表评论</button></div>` : '<p style="color: var(--text-gray); margin-bottom: 24px;"><a href="#" onclick="router(\'login\')">登录</a> 后发表评论</p>'}
                    <div class="comment-list">${photoComments.length > 0 ? photoComments.map(c => `<div class="comment-item"><div class="comment-header"><div class="comment-author"><div class="comment-author-avatar">${c.author.charAt(0).toUpperCase()}</div><div class="comment-author-info"><h5>${c.author}</h5><span>${new Date(c.date).toLocaleDateString('zh-CN')}</span></div></div></div><div class="comment-text">${c.text}</div></div>`).join('') : '<p style="color: var(--text-gray);">暂无评论，来发表第一条评论吧！</p>'}</div>
                </div>
            </div>
        </div>
    `;
    router('detail');
}

// Favorites
function toggleFavorite(id, btn, isDetail = false) {
    if (!currentUser) { router('login'); return; }
    const index = favorites.indexOf(id);
    if (index > -1) { favorites.splice(index, 1); showNotification('已取消收藏', 'info'); }
    else { favorites.push(id); showNotification('已添加到收藏', 'success'); }
    localStorage.setItem('seatview_favorites', JSON.stringify(favorites));
    if (btn) { btn.classList.toggle('active'); btn.innerHTML = `<i class="${favorites.includes(id) ? 'fas' : 'far'} fa-heart"></i>`; }
    else if (isDetail) showDetail(id);
}

// Comments
function addComment(photoId) {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    if (!text) return;
    if (!comments[photoId]) comments[photoId] = [];
    comments[photoId].unshift({ author: currentUser.name, text: text, date: new Date().toISOString() });
    localStorage.setItem('seatview_comments', JSON.stringify(comments));
    showDetail(photoId);
    showNotification('评论发表成功', 'success');
}

// Share
function sharePhoto(id) {
    const photo = photos.find(p => p.id === id);
    if (navigator.share) navigator.share({ title: photo.venue, text: photo.comment, url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); showNotification('链接已复制到剪贴板', 'success'); }
}

// Image Modal
function openImageModal(src, title, desc) {
    document.getElementById('modalImage').src = src;
    document.getElementById('modalImageTitle').textContent = title;
    document.getElementById('modalImageDesc').textContent = desc;
    document.getElementById('imageModal').classList.add('active');
}

function closeImageModal() {
    document.getElementById('imageModal').classList.remove('active');
}

// Upload Modal
function toggleModal(show) {
    if (show && !currentUser) { router('login'); return; }
    document.getElementById('uploadModal').style.display = show ? 'block' : 'none';
    if (!show) { currentRating = 0; updateStarDisplay(); }
}

// Star Rating
function setRating(rating) {
    currentRating = rating;
    updateStarDisplay();
    document.getElementById('upRating').value = rating;
}

function updateStarDisplay() {
    const stars = document.querySelectorAll('#starInput i');
    stars.forEach((star, index) => {
        star.className = index < currentRating ? 'fas fa-star active' : 'far fa-star';
    });
}

// Handle Upload
function handleUpload(e) {
    e.preventDefault();
    const venue = document.getElementById('upVenue').value;
    const city = document.getElementById('upCity').value;
    const type = document.getElementById('upType').value;
    const section = document.getElementById('upSection').value;
    const seat = document.getElementById('upSeat').value;
    const comment = document.getElementById('upComment').value;
    const img = document.getElementById('upImg').value;
    const rating = parseInt(document.getElementById('upRating').value) || 0;
    const lng = parseFloat(document.getElementById('upLng').value) || 0;
    const lat = parseFloat(document.getElementById('upLat').value) || 0;
    const newPhoto = {
        id: Date.now(), venue: venue, city: city, country: 'Unknown', type: type,
        section: section, seat: seat, comment: comment, user: currentUser.name,
        img: img || 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800',
        rating: rating, lat: lat, lng: lng
    };
    photos.unshift(newPhoto);
    userUploads.push(newPhoto.id);
    localStorage.setItem('seatview_photos', JSON.stringify(photos));
    localStorage.setItem('seatview_uploads', JSON.stringify(userUploads));
    renderPhotos(photos);
    toggleModal(false);
    e.target.reset();
    currentRating = 0;
    updateStarDisplay();
    showNotification('发布成功！', 'success');
}

// Profile Page
function switchTab(tab) {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    const content = document.getElementById('profileContent');
    if (tab === 'uploads') {
        const userPhotos = photos.filter(p => userUploads.includes(p.id));
        content.innerHTML = userPhotos.length > 0 ? `<div class="photo-grid">${userPhotos.map(item => `<div class="card" onclick="showDetail(${item.id})"><div class="card-img-wrapper"><img src="${item.img}" class="card-img" alt="${item.venue}"></div><div class="card-content"><div class="venue-name">${item.venue}</div><div class="seat-info">${item.section}</div></div></div>`).join('')}</div>` : '<p style="color: var(--text-gray); text-align: center;">还没有上传任何视角</p>';
    } else if (tab === 'favorites') {
        const favPhotos = photos.filter(p => favorites.includes(p.id));
        content.innerHTML = favPhotos.length > 0 ? `<div class="photo-grid">${favPhotos.map(item => `<div class="card" onclick="showDetail(${item.id})"><div class="card-img-wrapper"><img src="${item.img}" class="card-img" alt="${item.venue}"></div><div class="card-content"><div class="venue-name">${item.venue}</div><div class="seat-info">${item.city}</div></div></div>`).join('')}</div>` : '<p style="color: var(--text-gray); text-align: center;">还没有收藏任何视角</p>';
    } else if (tab === 'settings') {
        content.innerHTML = `<div style="max-width: 500px;"><h3 style="margin-bottom: 24px;">账号设置</h3><div class="input-group"><label>昵称</label><input type="text" value="${currentUser?.name || ''}" id="settingName"></div><div class="input-group"><label>邮箱</label><input type="email" value="${currentUser?.email || ''}" disabled></div><button class="btn-primary" onclick="saveSettings()" style="width: auto; padding: 12px 32px;">保存更改</button></div>`;
    }
}

function saveSettings() {
    const name = document.getElementById('settingName').value;
    if (name && currentUser) {
        currentUser.name = name;
        localStorage.setItem('seatview_user', JSON.stringify(currentUser));
        checkAuth();
        showNotification('设置已保存', 'success');
    }
}

function updateProfileStats() {
    document.getElementById('profileName').textContent = currentUser?.name || '用户名';
    document.getElementById('profileEmail').textContent = currentUser?.email || 'user@example.com';
    document.getElementById('uploadCount').textContent = userUploads.length;
    document.getElementById('favoriteCount').textContent = favorites.length;
    let commentCount = 0;
    Object.values(comments).forEach(c => { commentCount += c.filter(item => item.author === currentUser?.name).length; });
    document.getElementById('reviewCount').textContent = commentCount;
}

// Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `position: fixed; top: 90px; right: 20px; padding: 16px 24px; border-radius: 12px; color: white; font-weight: 500; z-index: 1000; animation: slideIn 0.3s ease; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);`;
    const colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6' };
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.animation = 'fadeOut 0.3s ease'; setTimeout(() => notification.remove(), 300); }, 3000);
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { toggleModal(false); closeImageModal(); }
});

// Initialize profile stats when profile page is shown
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'profile-page' && mutation.target.classList.contains('active')) {
            updateProfileStats();
            switchTab('uploads');
        }
    });
});
observer.observe(document.getElementById('profile-page'), { attributes: true, attributeFilter: ['class'] });

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
`;
document.head.appendChild(style);

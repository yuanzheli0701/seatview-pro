-- SeatView Pro Database Schema
-- PostgreSQL

-- Create database
CREATE DATABASE seatview_db;

-- Connect to database
\c seatview_db;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Photos table
CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    venue VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'Unknown',
    type VARCHAR(50) NOT NULL CHECK (type IN ('concert', 'sport', 'theater')),
    section VARCHAR(100) NOT NULL,
    seat VARCHAR(100) NOT NULL,
    comment TEXT,
    img VARCHAR(500) NOT NULL,
    rating INTEGER CHECK (rating >= 0 AND rating <= 5),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, photo_id)
);

-- Insert sample data
INSERT INTO users (name, email, password) VALUES 
('Madridista_99', 'madrid@example.com', '$2y$10$hashedpassword'),
('UK_Football', 'uk@example.com', '$2y$10$hashedpassword'),
('BayernFan', 'bayern@example.com', '$2y$10$hashedpassword'),
('KobeForever', 'kobe@example.com', '$2y$10$hashedpassword'),
('TennisLvr', 'tennis@example.com', '$2y$10$hashedpassword'),
('TokyoTraveler', 'tokyo@example.com', '$2y$10$hashedpassword'),
('NatureRocker', 'nature@example.com', '$2y$10$hashedpassword'),
('NYC_Beats', 'nyc@example.com', '$2y$10$hashedpassword'),
('LondonPop', 'london@example.com', '$2y$10$hashedpassword'),
('FestivalQueen', 'festival@example.com', '$2y$10$hashedpassword'),
('ClassicFan', 'classic@example.com', '$2y$10$hashedpassword'),
('AussieArts', 'aussie@example.com', '$2y$10$hashedpassword'),
('ParisDreamer', 'paris@example.com', '$2y$10$hashedpassword'),
('BroadwayFan', 'broadway@example.com', '$2y$10$hashedpassword'),
('MusicTech', 'music@example.com', '$2y$10$hashedpassword'),
('OperaLvr', 'opera@example.com', '$2y$10$hashedpassword');

-- Insert sample photos
INSERT INTO photos (venue, city, country, type, section, seat, comment, img, rating, lat, lng, user_id) VALUES
('Santiago Bernabéu', 'Madrid', 'Spain', 'sport', 'South End', 'Section 112, Row 5', '伯纳乌的气氛太疯狂了！这个位置离球门很近。', 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800', 5, 40.4531, -3.6883, 1),
('Wembley Stadium', 'London', 'UK', 'sport', 'Level 5', 'Block 501, Row 20', '虽然很高，但是温布利的视野完全无遮挡，统揽全局。', 'https://images.unsplash.com/photo-1516478335943-93ae88681614?w=800', 4, 51.5560, -0.2795, 2),
('Allianz Arena', 'Munich', 'Germany', 'sport', 'North Tribune', 'Block 130, Standing', '拜仁的主场红得让人热血沸腾！', 'https://images.unsplash.com/photo-1562827550-38244406a8c3?w=800', 5, 48.2188, 11.6247, 3),
('Crypto.com Arena', 'Los Angeles', 'USA', 'sport', 'Loge Level', 'Section 111', '看湖人队比赛的最佳角度，侧面视野很好。', 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800', 4, 34.0430, -118.2673, 4),
('Rod Laver Arena', 'Melbourne', 'Australia', 'sport', 'Upper Baseline', 'Row HH', '澳网公开赛，蓝色硬地非常漂亮。', 'https://images.unsplash.com/photo-1531315630201-bb15dbef08b9?w=800', 4, -37.8216, 144.9785, 5),
('Tokyo Dome', 'Tokyo', 'Japan', 'sport', 'Infield', '1st Base Side', '巨蛋内部非常震撼，看棒球或者演唱会都很棒。', 'https://images.unsplash.com/photo-1595861161269-8984a504049b?w=800', 5, 35.7056, 139.7519, 6),
('Red Rocks Amphitheatre', 'Colorado', 'USA', 'concert', 'General Admission', 'Row 40', '世界上最美的户外剧场，自然岩石的音效绝了。', 'https://images.unsplash.com/photo-1543552272-e7197374cb42?w=800', 5, 39.6654, -105.2057, 7),
('Madison Square Garden', 'New York', 'USA', 'concert', 'Floor A', 'Row 10', '传奇场馆！离舞台非常近，感觉像在做梦。', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800', 5, 40.7505, -73.9934, 8),
('The O2', 'London', 'UK', 'concert', 'Level 1', 'Block 102', '视野很好，而且座椅比想象中舒服。', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 4, 51.5030, 0.0032, 9),
('Coachella Main Stage', 'Indio', 'USA', 'concert', 'VIP Area', 'Standing', '加州的日落配上音乐节，氛围感拉满。', 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800', 5, 33.6820, -116.2382, 10),
('Royal Albert Hall', 'London', 'UK', 'concert', 'Rausing Circle', 'Seat 40', '古典与现代的结合，灯光效果迷人。', 'https://images.unsplash.com/photo-1514306191717-452ec28c7c31?w=800', 5, 51.5009, -0.1774, 11),
('Sydney Opera House', 'Sydney', 'Australia', 'theater', 'Stalls', 'Row G, Seat 22', '建筑本身就是艺术品，音响效果无可挑剔。', 'https://images.unsplash.com/photo-1598546716842-795238c75605?w=800', 5, -33.8568, 151.2153, 12),
('Palais Garnier', 'Paris', 'France', 'theater', 'Balcony', 'Box 5', '富丽堂皇的巴黎歌剧院，仿佛穿越回了19世纪。', 'https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?w=800', 5, 48.8720, 2.3316, 13),
('Broadway Theatre', 'New York', 'USA', 'theater', 'Mezzanine', 'Row A', '看音乐剧的最佳位置，能看到整个舞台编排。', 'https://images.unsplash.com/photo-1503095392237-305039261c09?w=800', 4, 40.7590, -73.9845, 14),
('Elbphilharmonie', 'Hamburg', 'Germany', 'theater', 'Great Hall', 'Level 15', '现代声学设计的巅峰，每个角落听得都很清楚。', 'https://images.unsplash.com/photo-1535903024912-1bb658306dc9?w=800', 5, 53.5431, 9.9856, 15),
('La Scala', 'Milan', 'Italy', 'theater', 'Plateau', 'Row 8', '米兰斯卡拉大剧院，歌剧爱好者的圣地。', 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800', 5, 45.4676, 9.1895, 16);

-- Create indexes for better performance
CREATE INDEX idx_photos_type ON photos(type);
CREATE INDEX idx_photos_city ON photos(city);
CREATE INDEX idx_photos_user ON photos(user_id);
CREATE INDEX idx_comments_photo ON comments(photo_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_photo ON favorites(photo_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_photos_updated_at BEFORE UPDATE ON photos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
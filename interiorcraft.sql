CREATE DATABASE interiorcraft;
USE interiorcraft;
CREATE TABLE users(
    id int AUTO_INCRMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(150) NOT NULL,
    design_type VARCHAR(50) NOT NULL,
    room_type VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS uploaded_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    ai_suggestion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ai_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prompt TEXT NOT NULL,
    design_result TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    theme VARCHAR(50) DEFAULT 'light',
    notifications TINYINT(1) DEFAULT 1,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL,
   ame VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    image VARCHAR(255),
    model_3d VARCHAR(255),
    default_width DECIMAL(10,2) DEFAULT 100,
    default_depth DECIMAL(10,2) DEFAULT 100,
    default_height DECIMAL(10,2) DEFAULT 100,
    price DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); description TEXT NOT NULL
);

INSERT INTO rooms (room_name, description) VALUES
('Living Room', 'Design your dream living space for relaxation and comfort.'),
('Bedroom', 'Create a relaxing and comfortable bedroom.'),
('Kitchen', 'Design a modern and functional kitchen.'),
('Bathroom', 'Create a clean and stylish bathroom.'),
('Dining Room', 'Design a perfect space for family meals.'),
('Study Room', 'Create a productive and inspiring workspace.');

CREATE TABLE styles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    style_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO styles (style_name, description) VALUES
('Modern', 'Clean lines and elegant modern furniture'),
('Luxury', 'Premium interior design with rich decoration'),
('Minimalist', 'Simple clutter free space with modern look'),
('Industrial', 'Dark Urban theme with raw texture'),
('Scandinavian', 'Light colors, natural material and functional furniture'),
('Japanese', 'Zen inspired calm and balanced interior design'),
('Traditional', 'Timeless classic and warm interior design'),
('Bohemian', 'Vibrant artistic and naturally eclectic style');

CREATE TABLE designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    style_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (style_id) REFERENCES styles(id)
);
CREATE TABLE furniture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    model_3d VARCHAR(255),
    default_width DECIMAL(10,2) DEFAULT 100,
    default_depth DECIMAL(10,2) DEFAULT 100,
    default_height DECIMAL(10,2) DEFAULT 100,
    price DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Example furniture data

INSERT INTO furniture
(name, category, image, model_3d, default_width, default_depth, default_height, price)
VALUES
('Modern Sofa', 'Sofa', 'sofa.jpg', 'sofa.glb', 220, 90, 85, 50000),

('Double Bed', 'Bed', 'bed.jpg', 'bed.glb', 200, 180, 100, 75000),

('Dining Table', 'Table', 'table.jpg', 'table.glb', 160, 90, 75, 40000),
('Chair', 'Chair', 'chair.jpg', 'chair.glb', 50, 50, 90, 10000),

('Wardrobe', 'Storage', 'wardrobe.jpg', 'wardrobe.glb', 180, 60, 200, 65000),

('Study Table', 'Table', 'study_table.jpg', 'study_table.glb', 120, 60, 75, 30000),

('TV Cabinet', 'Cabinet', 'tv_cabinet.jpg', 'tv_cabinet.glb', 180, 45, 60, 35000),

('Coffee Table', 'Table', 'coffee_table.jpg', 'coffee_table.glb', 100, 60, 45, 20000);

CREATE TABLE design_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    room_id INT NOT NULL,
    style_id INT,

    design_name VARCHAR(150) NOT NULL,

    room_width DECIMAL(10,2) NOT NULL,
    room_depth DECIMAL(10,2) NOT NULL,
    room_height DECIMAL(10,2) NOT NULL,

    view_mode ENUM('2D','3D') DEFAULT '2D',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (room_id) REFERENCES rooms(id)
        ON DELETE CASCADE,

    FOREIGN KEY (style_id) REFERENCES styles(id)
        ON DELETE SET NULL
);
CREATE TABLE design_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    design_id INT NOT NULL,
    furniture_id INT NOT NULL,

    pos_x DECIMAL(10,2) DEFAULT 0,
    pos_y DECIMAL(10,2) DEFAULT 0,
    pos_z DECIMAL(10,2) DEFAULT 0,

    rotation_x DECIMAL(10,2) DEFAULT 0,
    rotation_y DECIMAL(10,2) DEFAULT 0,
    rotation_z DECIMAL(10,2) DEFAULT 0,

    item_width DECIMAL(10,2),
    item_depth DECIMAL(10,2),
    item_height DECIMAL(10,2),

    FOREIGN KEY (design_id) REFERENCES design_projects(id)
        ON DELETE CASCADE,

    FOREIGN KEY (furniture_id) REFERENCES furniture(id)
        ON DELETE CASCADE
);

-- =========================================
-- OFFICE DESIGN STYLE TABLE
-- =========================================

CREATE TABLE office_styles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    style_name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- INSERT OFFICE DESIGN STYLES
-- =========================================

INSERT INTO office_styles (style_name, description, image) VALUES

('Modern Workspace',
 'Clean productive office with smart furniture and modern lighting',
 'modern-workspace.jpg'),

('Executive Luxury',
 'Office setup for managers and executives',
 'executive-luxury.jpg'),

('Minimal Office',
 'Simple clutter free workspace with minimal and functional design',
 'minimal-office.jpg'),

('Industrial Workspace',
 'Raw and edgy look with exposed materials and industrial touch',
 'industrial-workspace.jpg'),

('Nordic Office',
 'Light colors, natural material and functional office furniture',
 'nordic-office.jpg'),

('Zen Workspace',
 'Calm and balanced workspace inspired by Japanese design',
 'zen-workspace.jpg'),

('Corporate Classic',
 'Timeless and professional design for corporate environments',
 'corporate-classic.jpg'),

('Creative Studio',
 'Vibrant and artistic workspace for creative teams and startups',
 'creative-studio.jpg');


-- =========================================
-- USER OFFICE DESIGN TABLE
-- =========================================

CREATE TABLE user_office_designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    style_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (style_id)
    REFERENCES office_styles(id)
    ON DELETE CASCADE
);
ALTER TABLE designs
ADD share_token VARCHAR(100) NULL,
ADD is_shared TINYINT(1) DEFAULT 0;DROP TABLE IF EXISTS design_items;

CREATE TABLE design_furniture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT NOT NULL,
    furniture_id INT NOT NULL,
    pos_x DECIMAL(10,2) DEFAULT 0,
    pos_y DECIMAL(10,2) DEFAULT 0,
    pos_z DECIMAL(10,2) DEFAULT 0,
    rotation_x DECIMAL(10,2) DEFAULT 0,
    rotation_y DECIMAL(10,2) DEFAULT 0,
    rotation_z DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE design_shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    design_id INT NOT NULL,
    share_token VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE design_furniture 
ADD COLUMN item_width VARCHAR(50),
ADD COLUMN item_height VARCHAR(50),
ADD COLUMN item_depth VARCHAR(50);
INSERT INTO `design_furniture` 
(`design_id`, `furniture_id`, `item_width`, `item_height`, `item_depth`, `pos_x`, `pos_y`, `pos_z`) 
VALUES 
(1, 5, '200cm', '90cm', '60cm', 10, 20, 0);
CREATE TABLE furniture_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);
INSERT INTO furniture_categories (category_name) VALUES
('Sofa'),
('Armchairs'),
('Beds'),
('Office Furniture'),
('Tables'),
('Chairs'),
('Path and Lawns'),
('Kitchen'),
('Trees and Plants'),
('Garage'),
('Pool'),
('Lighting'),
('Outdoor Activities'),
('Doors'),
('Windows'),
('Stairs'),
('Arches'),
('Fireplace'),
('Columns');
CREATE TABLE IF NOT EXISTS AIdesigns (

    id              INT AUTO_INCREMENT PRIMARY KEY,   -- Unique ID for each design
    original_image  VARCHAR(255) NOT NULL,            -- Path to the uploaded room image
    generated_image VARCHAR(255) NOT NULL,            -- Path to the AI generated image
    prompt          TEXT,                             -- The custom prompt the user typed
    is_saved        TINYINT(1) DEFAULT 0,             -- 0 = not saved, 1 = saved by user
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP  -- When was it generated

);
CREATE DATABASE ai_design_tool;

USE ai_design_tool;

CREATE TABLE design_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_prompt TEXT NOT NULL,
    generated_image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE example_prompts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prompt_text VARCHAR(255) NOT NULL
);

-- Kuch example data insert karna
INSERT INTO example_prompts (prompt_text) VALUES 
('Modern bedroom with minimal decor'),
('Office space with natural light and desk'),
('Luxury living room with gold accents');

CREATE TABLE IF NOT EXISTS designs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prompt TEXT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
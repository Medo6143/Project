/*
  # Seed initial categories for MAJD PARTS
  
  1. Insert categories data
    - Motors and Transmission
    - Body Parts
    - Electrical & Lighting
    - Brakes System
    - Body Paint & Repair
    - General Parts
*/

INSERT INTO categories (name_ar, name_en, description_ar, description_en, icon, "order")
VALUES
  (
    'المحركات وناقل الحركة',
    'Engines & Transmission',
    'قطع غيار أصلية لمحركات السيارات وأنظمة نقل الحركة بجودة عالمية',
    'Original spare parts for car engines and transmission systems with world-class quality',
    'Settings',
    1
  ),
  (
    'الهياكل والبودي',
    'Body & Frame',
    'أجزاء هيكل السيارة الخارجية والداخلية بأعلى معايير الجودة',
    'External and internal car body parts with highest quality standards',
    'Car',
    2
  ),
  (
    'الإضاءة والكهرباء',
    'Electrical & Lighting',
    'أنظمة الإضاءة المتطورة والمكونات الكهربائية بمواصفات أصلية',
    'Advanced lighting systems and electrical components with original specifications',
    'Zap',
    3
  ),
  (
    'أنظمة الفرامل',
    'Brake Systems',
    'أنظمة فرامل متطورة وأجزاء فرامل أصلية لسلامتك على الطريق',
    'Advanced brake systems and original brake parts for your road safety',
    'Disc',
    4
  ),
  (
    'سمكرة ودهان السيارات',
    'Body Repair & Paint',
    'خدمات متخصصة في إصلاح هياكل السيارات ودهانها بأعلى مستويات الجودة',
    'Specialized services for car body repair and painting with highest quality standards',
    'Wrench',
    5
  ),
  (
    'قطع غيار السيارات العامة',
    'General Auto Parts',
    'مجموعة واسعة من قطع الغيار التي تغطي جميع أجزاء السيارة',
    'Wide range of spare parts covering all car components',
    'Package',
    6
  );

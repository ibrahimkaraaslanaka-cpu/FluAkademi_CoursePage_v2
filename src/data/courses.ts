// ============================================================
// Flu Akademi - Course Page Data System
// ============================================================
// Yeni ders eklemek için: courses dizisine yeni bir CourseData objesi ekleyin.
// Sayfa otomatik olarak /ders/[kategori-slug]/[ders-slug] adresinde oluşur.
// ============================================================

// --- TYPES ---

export interface SeriesLesson {
    number: number;
    title: string;
    slug: string;
}

export interface Instructor {
    name: string;
    title: string;
    quote: string;
}

export interface Chapter {
    id: number;
    title: string;
    duration: string;
    description: string;
    subChapters?: { title: string; duration: string }[];
}

export interface Insight {
    icon: string;
    question: string;
    hint: string;
}

export interface Testimonial {
    id: number;
    name: string;
    text: string;
    rating: number;
    date: string;
}

export interface RelatedCourse {
    id: string;
    category: string;
    title: string;
    description: string;
    slug: string;
    price: number;
}

export interface CourseData {
    id: string;
    categorySlug: string;       // URL'de kullanılır: /ders/[categorySlug]/[slug]
    slug: string;               // URL'de kullanılır: /ders/[categorySlug]/[slug]
    category: string;           // Görüntülenen kategori adı
    title: string;
    lessonNumber: number;
    currentLesson: number;
    seriesLessons: SeriesLesson[];
    tagline: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: number;
    duration: string;
    students: number;
    rating: number;
    instructor: Instructor;
    chapters: Chapter[];
    insights: Insight[];
    testimonials: Testimonial[];
    relatedCourses: RelatedCourse[];
    // Medya dosyaları
    videoSrc?: string;
    coverImage: string;
    bundledCourses?: { title: string; slug: string }[];
    instructorNote: string;
}

// --- CATEGORY COLORS ---

export const categoryColors: Record<string, string> = {
    "Mitoloji": "bg-[#FFBC0B] text-black font-semibold",
    "Psikoloji": "bg-purple-600 text-white font-semibold",
    "Siyaset Bilimi": "bg-slate-700 text-white font-semibold",
    "Felsefe": "bg-emerald-600 text-white font-semibold",
    "Tarih": "bg-amber-700 text-white font-semibold",
    "Sanat": "bg-rose-600 text-white font-semibold",
    "Temel Sanat Eğitimi": "bg-rose-600 text-white font-semibold",
    "Bilim": "bg-cyan-600 text-white font-semibold",
    "Ekonomi": "bg-indigo-600 text-white font-semibold",
    "Edebiyat": "bg-teal-600 text-white font-semibold",
    "Sosyoloji": "bg-orange-600 text-white font-semibold",
    "Tüm Eğitimler": "bg-gradient-to-r from-[#FFBC0B] to-[#F74A4A] text-white font-semibold",
};

// --- COURSES ---

export const courses: CourseData[] = [
    {
        id: "tanrilarin-evrimi",
        categorySlug: "mitoloji",
        slug: "tanrilarin-evrimi",
        category: "Mitoloji",
        title: "Tanrıların Evrimi",
        lessonNumber: 2,
        currentLesson: 2,
        seriesLessons: [
            { number: 1, title: "Mitolojiye Giriş", slug: "mitolojiye-giris" },
            { number: 2, title: "Tanrıların Evrimi", slug: "tanrilarin-evrimi" },
        ],
        tagline: "İnsanlığın en eski hikayesinin izinde",
        description: "Tanrıların evrimini takip etmek, aslında insanlığın kendi evrimini takip etmektir.",
        price: 1575,
        originalPrice: 1750,
        discount: 10,
        duration: "12+ Saat",
        students: 2847,
        rating: 4.9,
        instructor: {
            name: "Nevzat Kaya",
            title: "Mitoloji & Kültür Tarihçisi",
            quote: "Tanrıları anlamak, insanı anlamaktır.",
        },
        chapters: [
            { id: 1, title: "Kutsalın Metamorfozları", duration: "1s 45dk", description: "Tanrı kavramının kökenlerini, ilkel toplumlardaki kutsal anlayışını ve bunun nasıl evrildiğini inceliyoruz." },
            { id: 2, title: "Titanlar ve Olimpikler", duration: "1s 30dk", description: "Yunan mitolojisindeki iki büyük tanrı kuşağı arasındaki çatışmayı ve bunun kültürel anlamlarını keşfediyoruz." },
            { id: 3, title: "Demeter - Afrodit - Artemis", duration: "1s 20dk", description: "Dişil kutsalın Yunan mitolojisindeki temsilcilerini ve toplumsal cinsiyet rollerini inceliyoruz." },
            { id: 4, title: "Olimpik İdeoloji", duration: "1s 35dk", description: "Olimpos panteonunun nasıl bir siyasi ve toplumsal düzen yansıttığını analiz ediyoruz." },
            { id: 5, title: "Olimpizmin Bilinçdışı", duration: "1s 25dk", description: "Olimpik düzenin bastırdığı arkaik unsurları ve bunların psikolojik boyutlarını ele alıyoruz." },
            { id: 6, title: "Eksen Çağı ve Apollonizmin Doğuşu", duration: "1s 40dk", description: "M.Ö. 800-200 arasındaki düşünce devrimini ve Apollo kültünün yükselişini inceliyoruz." },
            { id: 7, title: "Dionysos'un Bastırılışı", duration: "1s 15dk", description: "Ekstaz ve kaos tanrısı Dionysos'un Apollonik düzen tarafından nasıl marjinalleştirildiğini keşfediyoruz." },
            { id: 8, title: "Tanrının Ölümü ve Tragedyanın Doğuşu", duration: "1s 50dk", description: "Mitolojik düşüncenin çöküşünü ve bunun sanata, özellikle tragedyaya nasıl yansıdığını inceliyoruz." },
        ],
        insights: [
            { icon: "columns", question: "Neden tüm mitolojilerde 'eski' ve 'yeni' tanrılar var?", hint: "Toplumsal dönüşümün izleri" },
            { icon: "zap", question: "Olimpos'un gerçek anlamı ne?", hint: "Sadece bir dağ değil..." },
            { icon: "wine", question: "Dionysos neden bastırıldı?", hint: "Kaosun gücü" },
        ],
        testimonials: [
            { id: 1, name: "Ahmet Yılmaz", text: "Mitolojiye bakış açım tamamen değişti. Artık filmleri, kitapları farklı okuyorum.", rating: 5, date: "2 hafta önce" },
            { id: 2, name: "Elif Kara", text: "Nevzat Hoca'nın anlatım tarzı muhteşem. Sanki bir belgesel izliyormuşsunuz gibi.", rating: 5, date: "3 hafta önce" },
            { id: 3, name: "Mehmet Demir", text: "Premium fiyata değer. Her bölüm ayrı bir keşif.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Zeynep Öztürk", text: "Bu dersi aldıktan sonra diğer dersleri de almaya karar verdim. İçerik kalitesi gerçekten üst düzey.", rating: 5, date: "1 ay önce" },
            { id: 5, name: "Can Aydın", text: "Akademik düzeyde bir içerik ama herkesin anlayabileceği bir dille anlatılmış. Harika!", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Selin Yıldız", text: "Dionysos bölümü favorim oldu. Bastırılmış kültürel kodları çözmek çok ilginçti.", rating: 4, date: "2 ay önce" },
            { id: 7, name: "Burak Aksoy", text: "İş hayatında bile bu dersten öğrendiklerimi kullanıyorum. Perspektif kazandırıyor.", rating: 5, date: "3 ay önce" },
            { id: 8, name: "Ayşe Çelik", text: "Titanlar ve Olimpikler bölümünü 3 kez izledim. Her seferinde yeni bir şey keşfettim.", rating: 5, date: "3 ay önce" },
            { id: 9, name: "Emre Koç", text: "Felsefe ve mitoloji arasındaki bağlantıları çok güzel kurmuş. Tavsiye ederim.", rating: 5, date: "4 ay önce" },
            { id: 10, name: "Deniz Şahin", text: "Olimpik İdeoloji bölümü dünya görüşümü değiştirdi diyebilirim.", rating: 5, date: "4 ay önce" },
            { id: 11, name: "Gizem Arslan", text: "Çok akıcı bir anlatımı var. Saatlerin nasıl geçtiğini anlamıyorsunuz.", rating: 5, date: "5 ay önce" },
            { id: 12, name: "Oğuz Yılmaz", text: "Eksen Çağı bölümü için bile bu ders alınır. Muhteşem içerik.", rating: 5, date: "5 ay önce" },
        ],
        relatedCourses: [
            {
                id: "mitolojiye-giris",
                category: "Mitoloji",
                title: "Mitolojiye Giriş",
                description: "Kendini evrende konumlandırmak, 'neyim?', 'neden varım?' gibi sorulara cevap aramak...",
                slug: "mitoloji/mitolojiye-giris",
                price: 1575,
            },
            {
                id: "psikolojiye-giris",
                category: "Psikoloji",
                title: "Psikolojiye Giriş",
                description: "İnsan davranışının ve zihinsel süreçlerinin evrimsel ve sinirsel temelleri...",
                slug: "psikoloji/psikolojiye-giris",
                price: 1450,
            },
            {
                id: "kapitalizm-tarihi",
                category: "Siyaset Bilimi",
                title: "Kapitalizmin Tarihi",
                description: "Siyaset biliminin temel kavramlarını herkesin rahatça içselleştirebileceği şekilde...",
                slug: "siyaset-bilimi/kapitalizm-tarihi",
                price: 1350,
            },
        ],
        videoSrc: "/videos/tanrilarin-evrimi-tanitim.mp4",
        coverImage: "/images/courses/tanrilarin-evrimi-cover.jpg",
        instructorNote: "Modern anlatıların arkasındaki kadim mitleri keşfet. Bu derste, tanrıların hikayesinin aslında insanlığın kendi hikayesi olduğunu göreceksin.",
    },
    // --- Mitolojiye Giriş ---
    {
        id: "mitolojiye-giris", categorySlug: "mitoloji", slug: "mitolojiye-giris", category: "Mitoloji",
        title: "Mitolojiye Giriş", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [
            { number: 1, title: "Mitolojiye Giriş", slug: "mitolojiye-giris" },
            { number: 2, title: "Tanrıların Evrimi", slug: "tanrilarin-evrimi" },
        ],
        tagline: "Kadim mitlerin izinde bir yolculuk",
        description: "Kültürün kendi temelini teşkil eden kadim mitleri reddedip yerine nasıl aydınlanmacı mitler inşa edilmeye çalışıldığını keşfediyoruz.",
        price: 1575, originalPrice: 1750, discount: 10, duration: "10+ Saat", students: 3120, rating: 4.8,
        instructor: { name: "Nevzat Kaya", title: "Mitoloji & Kültür Tarihçisi", quote: "Mitleri anlamak, kendimizi anlamaktır." },
        chapters: [
            { id: 1, title: "Mit Türleri", duration: "1s 30dk", description: "Farklı mit türlerini ve bunların toplumsal işlevlerini inceliyoruz." },
            { id: 2, title: "Göçebelikten Yerleşik Düzene: Neolitik Devrim", duration: "1s 25dk", description: "Neolitik devrimin mitolojik düşünce üzerindeki etkilerini keşfediyoruz." },
            { id: 3, title: "Birinci Doğamız İkinci Doğamıza Karşı", duration: "1s 20dk", description: "İnsan doğasının iki yüzü arasındaki gerilimi mitolojik perspektiften ele alıyoruz." },
            { id: 4, title: "Yerleşik Olmanın Bedeli: Nostrosantrizm", duration: "1s 35dk", description: "Yerleşik hayata geçişin getirdiği kültürel ve mitolojik dönüşümleri inceliyoruz." },
            { id: 5, title: "Mitostan Logosa Geçiş: Tragedyanın Doğuşu", duration: "1s 40dk", description: "Mitolojik düşünceden rasyonel düşünceye geçiş sürecini ve tragedyanın doğuşunu keşfediyoruz." },
            { id: 6, title: "Kronos Kompleksi, Ödipus Kompleksi, Anne Sorunsalı", duration: "1s 30dk", description: "Mitolojinin psikolojik boyutlarını ve arketipsel kompleksleri inceliyoruz." },
            { id: 7, title: "Edebiyatta İzdüşümler", duration: "1s 15dk", description: "Mitolojik temaların edebiyattaki yansımalarını keşfediyoruz." },
            { id: 8, title: "Sinemada İzdüşümler", duration: "1s 20dk", description: "Mitolojik arketiplerin modern sinemadaki izlerini takip ediyoruz." },
        ],
        insights: [
            { icon: "columns", question: "Mit neden sadece bir 'masal' değildir?", hint: "Toplumsal hafızanın taşıyıcısı" },
            { icon: "zap", question: "Neolitik devrim insanlığı nasıl değiştirdi?", hint: "Sadece tarım değil..." },
            { icon: "lightbulb", question: "Mitos'tan logos'a geçiş neden önemli?", hint: "Düşüncenin evrimi" },
        ],
        testimonials: [
            { id: 1, name: "Merve Aydın", text: "Mitoloji hakkında hiç bilgim yoktu, şimdi bambaşka bir bakış açısı kazandım.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Kerem Yıldız", text: "Neolitik Devrim bölümü muhteşemdi. Tarih anlayışım değişti.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Aylin Demir", text: "Nevzat Hoca'nın anlatımı akıcı ve etkileyici. Kesinlikle tavsiye ederim.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Tolga Şen", text: "Sinema ve edebiyat bölümleri favorim oldu.", rating: 5, date: "1 ay önce" },
            { id: 5, name: "Pınar Koç", text: "Bu ders sayesinde filmleri ve kitapları çok farklı okumaya başladım.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Sercan Arslan", text: "Ödipus Kompleksi bölümü çok aydınlatıcıydı.", rating: 4, date: "2 ay önce" },
        ],
        relatedCourses: [
            { id: "tanrilarin-evrimi", category: "Mitoloji", title: "Tanrıların Evrimi", description: "Mitoloji serimizin ikincisi olan bu derste Tanrıların Evrimi'ni antropolojik bir bakış açısıyla ele alıyoruz.", slug: "mitoloji/tanrilarin-evrimi", price: 1575 },
            { id: "felsefeye-giris", category: "Felsefe", title: "Felsefeye Giriş", description: "Ömer Aygün felsefenin derinliklerine inmemizi sağlıyor ve sorgulama yoluyla yeni bakış açıları kazandırıyor.", slug: "felsefe/felsefeye-giris", price: 1575 },
            { id: "kapitalizm-tarihi", category: "Siyaset Bilimi", title: "Kapitalizmin Tarihi", description: "Kapitalizmin tarihsel gelişimini ve düşünsel temellerini herkesin kavrayabileceği şekilde ele alıyoruz.", slug: "siyaset-bilimi/kapitalizm-tarihi", price: 1575 },
        ],
        coverImage: "/images/courses/mitolojiye-giris-cover.svg",
        instructorNote: "Kadim mitleri keşfederek insanlığın en temel sorularına yeni cevaplar arayacağız.",
    },
    // --- Psikolojiye Giriş ---
    {
        id: "psikolojiye-giris", categorySlug: "psikoloji", slug: "psikolojiye-giris", category: "Psikoloji",
        title: "Psikolojiye Giriş", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [
            { number: 1, title: "Psikolojiye Giriş", slug: "psikolojiye-giris" },
        ],
        tagline: "İnsan davranışının ve zihinsel süreçlerin bilimsel analizi",
        description: "Akademik birikimi ve yazılarıyla dikkat çeken Alper Hasanoğlu, psikolojiye dair farklı bir eğitim deneyimi sunuyor.",
        price: 1390, originalPrice: 1750, discount: 21, duration: "10+ Saat", students: 2150, rating: 4.8,
        instructor: { name: "Alper Hasanoğlu", title: "Psikolog & Yazar", quote: "İnsan zihnini anlamak, dünyanın kapılarını açmaktır." },
        chapters: [
            { id: 1, title: "Psikolojiye Giriş: Psikoloji Nedir?", duration: "1s 20dk", description: "Psikolojinin tanımını, tarihçesini ve temel yaklaşımlarını inceliyoruz." },
            { id: 2, title: "İnsanın Kendine Özgü Bir Doğası Var Mıdır?", duration: "1s 15dk", description: "İnsan doğası tartışmasını psikolojik perspektiften ele alıyoruz." },
            { id: 3, title: "Bağlanma Teorisi (Attachment Theory)", duration: "1s 30dk", description: "Bowlby'nin bağlanma kuramını ve insan ilişkilerine etkisini inceliyoruz." },
            { id: 4, title: "Psikoterapi Ekolleri - 1: Psikanaliz", duration: "1s 25dk", description: "Freud'dan başlayarak psikanalitik geleneğin temellerini keşfediyoruz." },
            { id: 5, title: "Psikoterapi Ekolleri - 2: Davranışçı ve Bilişsel Ekol", duration: "1s 35dk", description: "Davranışçı, bilişsel davranışçı ve 3. dalga yaklaşımları ele alıyoruz." },
            { id: 6, title: "Beyin Ne İşe Yarar?", duration: "1s 20dk", description: "Beynin yapısını ve temel işlevlerini nörobilimsel perspektiften inceliyoruz." },
            { id: 7, title: "Beyin - 2: Limbik Sistem", duration: "1s 15dk", description: "Duygusal beyin olarak bilinen limbik sistemi ve işlevlerini keşfediyoruz." },
            { id: 8, title: "Bilinç", duration: "1s 40dk", description: "Bilincin doğası, bilinçdışı süreçler ve farkındalık kavramını inceliyoruz." },
        ],
        insights: [
            { icon: "brain", question: "Psikoloji gerçekten bir bilim midir?", hint: "Deneysel yöntemler ve kanıtlar" },
            { icon: "zap", question: "Bağlanma stiliniz ilişkilerinizi nasıl etkiler?", hint: "Çocukluktan yetişkinliğe" },
            { icon: "lightbulb", question: "Bilinçdışı gerçekten var mı?", hint: "Freud'un mirası" },
        ],
        testimonials: [
            { id: 1, name: "Derya Kılıç", text: "Psikolojiye olan ilgimi akademik bir zemine oturtabilmemi sağladı.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Murat Özkan", text: "Bağlanma Teorisi bölümü hayatıma farklı bir perspektif kattı.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Seda Yalçın", text: "Alper Hoca'nın anlatımı çok sade ve anlaşılır.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Cem Acar", text: "Beyin bölümleri çok ilgi çekiciydi. Nörobilime ilgim arttı.", rating: 5, date: "1 ay önce" },
            { id: 5, name: "Nilgün Şahin", text: "Her bölüm ayrı bir keşif. Tekrar tekrar izliyorum.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Barış Demir", text: "Psikanaliz ve davranışçı ekol karşılaştırması çok aydınlatıcıydı.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "tanrilarin-evrimi", category: "Mitoloji", title: "Tanrıların Evrimi", description: "Mitoloji serimizin ikincisi olan bu derste Tanrıların Evrimi'ni antropolojik bir bakış açısıyla ele alıyoruz.", slug: "mitoloji/tanrilarin-evrimi", price: 1575 },
            { id: "felsefeye-giris", category: "Felsefe", title: "Felsefeye Giriş", description: "Ömer Aygün felsefenin derinliklerine inmemizi sağlıyor.", slug: "felsefe/felsefeye-giris", price: 1575 },
            { id: "kapitalizm-tarihi", category: "Siyaset Bilimi", title: "Kapitalizmin Tarihi", description: "Kapitalizmin tarihsel gelişimini herkesin kavrayabileceği şekilde ele alıyoruz.", slug: "siyaset-bilimi/kapitalizm-tarihi", price: 1575 },
        ],
        coverImage: "/images/courses/psikolojiye-giris-cover.svg",
        instructorNote: "İnsan davranışının ve zihinsel süreçlerinin evrimsel ve sinirsel temellerini birlikte keşfedeceğiz.",
    },
    // --- Felsefeye Giriş ---
    {
        id: "felsefeye-giris", categorySlug: "felsefe", slug: "felsefeye-giris", category: "Felsefe",
        title: "Felsefeye Giriş", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [
            { number: 1, title: "Felsefeye Giriş", slug: "felsefeye-giris" },
            { number: 2, title: "Antik Felsefenin Başlangıcı", slug: "antik-felsefenin-baslangici" },
        ],
        tagline: "Varsayımları sorgulama yolculuğu",
        description: "Felsefeyi bir varsayım sorgulama süreci olarak tanımlayan Ömer Aygün, felsefenin derinliklerine inmemizi sağlıyor.",
        price: 1575, originalPrice: 1750, discount: 10, duration: "10+ Saat", students: 1890, rating: 4.7,
        instructor: { name: "Ömer Aygün", title: "Felsefe Profesörü", quote: "Felsefe, sorularınızı sorgulamaktır." },
        chapters: [
            { id: 1, title: "Felsefeye Giriş Yolları", duration: "1s 20dk", description: "Felsefeye yaklaşmanın farklı yollarını ve felsefenin ne olduğunu tartışıyoruz." },
            { id: 2, title: "Ontoloji", duration: "1s 25dk", description: "Varlık felsefesinin temel sorularını ve yaklaşımlarını inceliyoruz." },
            { id: 3, title: "Mantık", duration: "1s 15dk", description: "Doğru düşünmenin kurallarını ve mantıksal çıkarım yöntemlerini öğreniyoruz." },
            { id: 4, title: "Epistemoloji", duration: "1s 30dk", description: "Bilgi felsefesinin temel problemlerini ve bilginin doğasını sorguluyoruz." },
            { id: 5, title: "Etik", duration: "1s 35dk", description: "Ahlak felsefesinin temel sorunlarını ve etik teorileri inceliyoruz." },
            { id: 6, title: "Siyaset Felsefesi", duration: "1s 25dk", description: "Devlet, adalet ve özgürlük kavramlarını felsefi perspektiften ele alıyoruz." },
            { id: 7, title: "Estetik", duration: "1s 20dk", description: "Güzellik, sanat ve beğeni kavramlarını felsefi açıdan inceliyoruz." },
            { id: 8, title: "Felsefeden Çıkış Yolları", duration: "1s 15dk", description: "Felsefenin gündelik yaşamla bağlantısını kurarak düşünce yolculuğumuzu tamamlıyoruz." },
        ],
        insights: [
            { icon: "lightbulb", question: "Felsefe sadece düşünmek midir?", hint: "Varsayımları sorgulamak" },
            { icon: "columns", question: "Bilgi nedir ve nereden gelir?", hint: "Epistemolojinin sorusu" },
            { icon: "zap", question: "Güzel olan evrensel midir?", hint: "Estetiğin büyük sorusu" },
        ],
        testimonials: [
            { id: 1, name: "Ali Rıza Demir", text: "Felsefeye hiç ilgim yoktu ama bu ders bakış açımı tamamen değiştirdi.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Buse Yılmaz", text: "Epistemoloji bölümü favorim. Bilgiye dair sorgulamalarım arttı.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Kaan Aydın", text: "Ömer Hoca çok akıcı anlatıyor. Karmaşık konuları basitleştiriyor.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Leyla Özdemir", text: "Etik bölümü iş hayatımda bile karar almamı etkiledi.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Onur Çelik", text: "Mantık bölümü tartışma becerilerimi geliştirdi.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Gamze Koç", text: "Estetik bölümü sanat izleme deneyimimi zenginleştirdi.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "kapitalizm-tarihi", category: "Siyaset Bilimi", title: "Kapitalizmin Tarihi", description: "Kapitalizmin tarihsel gelişimini herkesin kavrayabileceği şekilde ele alıyoruz.", slug: "siyaset-bilimi/kapitalizm-tarihi", price: 1575 },
            { id: "tanrilarin-evrimi", category: "Mitoloji", title: "Tanrıların Evrimi", description: "Tanrıların Evrimi'ni antropolojik bir bakış açısıyla ele alıyoruz.", slug: "mitoloji/tanrilarin-evrimi", price: 1575 },
            { id: "temel-sanat-egitimi", category: "Temel Sanat Eğitimi", title: "Temel Sanat Eğitimi", description: "Sanatın temel bileşenlerini keşfe çıkıyoruz.", slug: "temel-sanat/temel-sanat-egitimi", price: 1390 },
        ],
        coverImage: "/images/courses/felsefeye-giris-cover.svg",
        instructorNote: "Felsefe, ayrıcalıklılara özgü bir tapınak değil, çok girişli bir meydan gibidir. Bu derste o meydana birlikte adım atacağız.",
    },
    // --- İdeolojiler ---
    {
        id: "ideolojiler", categorySlug: "siyaset-bilimi", slug: "ideoloji", category: "Siyaset Bilimi",
        title: "İdeolojiler", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [
            { number: 1, title: "İdeolojiler", slug: "ideoloji" },
            { number: 2, title: "Kapitalizmin Tarihi", slug: "kapitalizm-tarihi" },
        ],
        tagline: "Fikirlerin hangi şartlarda ortaya çıktığını keşfedin",
        description: "Siyaset biliminin temel kavramlarını ve tartışmalarını herkesin rahatça içselleştirebileceği şekilde ele alıyoruz.",
        price: 1575, originalPrice: 1750, discount: 10, duration: "10+ Saat", students: 1650, rating: 4.8,
        instructor: { name: "Ömer Gemalmaz", title: "Siyaset Bilimci", quote: "İdeolojileri anlamak, dünyayı anlamaktır." },
        chapters: [
            { id: 1, title: "Klasik Liberalizm", duration: "1s 25dk", description: "Liberal düşüncenin kökenlerini ve temel ilkelerini inceliyoruz." },
            { id: 2, title: "Neo-Liberalizm", duration: "1s 20dk", description: "Neoliberal politikaların ortaya çıkışını ve günümüzdeki etkilerini ele alıyoruz." },
            { id: 3, title: "Sosyalizm", duration: "1s 35dk", description: "Sosyalist düşüncenin tarihsel gelişimini ve farklı kollarını inceliyoruz." },
            { id: 4, title: "Muhafazakarlık", duration: "1s 30dk", description: "Muhafazakar düşüncenin temellerini ve farklı biçimlerini keşfediyoruz." },
            { id: 5, title: "Faşizm", duration: "1s 25dk", description: "Faşist ideolojinin kökenlerini ve tarihsel tezahürlerini analiz ediyoruz." },
            { id: 6, title: "Anarşizm", duration: "1s 20dk", description: "Anarşist düşüncenin farklı kollarını ve önerilerini inceliyoruz." },
            { id: 7, title: "Milliyetçilik", duration: "1s 30dk", description: "Milliyetçiliğin tarihsel gelişimini ve farklı türlerini ele alıyoruz." },
            { id: 8, title: "Kemalizm", duration: "1s 35dk", description: "Kemalizm'in tarihsel bağlamını ve ideolojik konumunu analiz ediyoruz." },
        ],
        insights: [
            { icon: "columns", question: "Liberalizm ile neoliberalizm aynı şey mi?", hint: "Tarihsel dönüşüm" },
            { icon: "zap", question: "Faşizm neden yükselir?", hint: "Toplumsal krizlerin rolü" },
            { icon: "lightbulb", question: "Kemalizm bir ideoloji midir?", hint: "Tartışmalı bir konu" },
        ],
        testimonials: [
            { id: 1, name: "Hakan Yılmaz", text: "İdeolojileri ilk kez bu kadar tarafsız ve akademik bir şekilde öğrendim.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Ayça Kara", text: "Faşizm bölümü çok aydınlatıcıydı. Tarihsel paralellikleri çok iyi kurmuş.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Utku Demir", text: "Ömer Hoca'nın analitik yaklaşımı muhteşem.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Selin Arslan", text: "Kemalizm bölümü için bile bu ders alınır.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Emre Çetin", text: "Sosyalizm ve liberalizm karşılaştırması çok etkili anlatılmış.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Nihan Öztürk", text: "Siyaseti daha bilinçli takip ediyorum artık.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "tanrilarin-evrimi", category: "Mitoloji", title: "Tanrıların Evrimi", description: "Tanrıların Evrimi'ni antropolojik bir bakış açısıyla ele alıyoruz.", slug: "mitoloji/tanrilarin-evrimi", price: 1575 },
            { id: "kapitalizm-tarihi", category: "Siyaset Bilimi", title: "Kapitalizmin Tarihi", description: "Kapitalizmin tarihsel gelişimini inceliyoruz.", slug: "siyaset-bilimi/kapitalizm-tarihi", price: 1575 },
            { id: "psikolojiye-giris", category: "Psikoloji", title: "Psikolojiye Giriş", description: "İnsan davranışının bilimsel temelleri.", slug: "psikoloji/psikolojiye-giris", price: 1390 },
        ],
        coverImage: "/images/courses/ideolojiler-cover.svg",
        instructorNote: "Siyasi ideolojileri anlamak, günümüz dünyasını okumak için en güçlü araçtır.",
    },
    // --- Temel Sanat Eğitimi ---
    {
        id: "temel-sanat-egitimi", categorySlug: "temel-sanat", slug: "temel-sanat-egitimi", category: "Sanat",
        title: "Temel Sanat Eğitimi", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [{ number: 1, title: "Temel Sanat Eğitimi", slug: "temel-sanat-egitimi" }],
        tagline: "Sanatın temel bileşenlerini keşfe çıkın",
        description: "Yönetmen İlker Canikligil'in hazırladığı bu derste, denge, form, ışık, renk ve hareket gibi unsurları keşfediyoruz.",
        price: 1390, originalPrice: 1750, discount: 21, duration: "8+ Saat", students: 1420, rating: 4.7,
        instructor: { name: "İlker Canikligil", title: "Yönetmen & Akademisyen", quote: "Sanatı görmek, dünyayı farklı görmektir." },
        chapters: [
            { id: 1, title: "Göz ve Nokta", duration: "1s 10dk", description: "Görsel algının temellerini ve noktanın sanattaki rolünü inceliyoruz." },
            { id: 2, title: "Kompozisyon", duration: "1s 20dk", description: "Görsel düzenlemenin kurallarını ve etkili kompozisyon tekniklerini öğreniyoruz." },
            { id: 3, title: "Kontrast - Oran - Ölçek", duration: "1s 15dk", description: "Görsel dengenin üç temel unsurunu inceliyoruz." },
            { id: 4, title: "Vurgu - Denge - Simetri", duration: "1s 25dk", description: "Sanat eserlerinde dikkat yönlendirme tekniklerini keşfediyoruz." },
            { id: 5, title: "Işık", duration: "1s 20dk", description: "Işığın sanattaki rolünü ve kullanım tekniklerini inceliyoruz." },
            { id: 6, title: "Renk", duration: "1s 30dk", description: "Renk teorisini ve rengin duygusal etkilerini ele alıyoruz." },
            { id: 7, title: "Hareket", duration: "1s 15dk", description: "Hareketin görsel sanatlardaki temsilini ve etkisini keşfediyoruz." },
            { id: 8, title: "Bir Sanat Formu Olarak Video ve Film", duration: "1s 35dk", description: "Video ve filmi bir sanat formu olarak masaya yatırıyoruz." },
        ],
        insights: [
            { icon: "lightbulb", question: "Neden bazı görseller sizi etkiler?", hint: "Kompozisyonun gücü" },
            { icon: "zap", question: "Renk gerçekten duyguları etkiler mi?", hint: "Renk psikolojisi" },
            { icon: "columns", question: "Video bir sanat formu mudur?", hint: "Yeni medya estetiği" },
        ],
        testimonials: [
            { id: 1, name: "Ceren Aydın", text: "Fotoğraflarıma bambaşka bir gözle bakmaya başladım.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Mert Yılmaz", text: "Işık bölümü tek başına dersin fiyatına değer.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Defne Kaya", text: "İlker Hoca'nın anlatımı çok ilham verici.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Umut Demir", text: "Kompozisyon kurallarını öğrenmek işimi çok kolaylaştırdı.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Zehra Arslan", text: "Video ve Film bölümü harika. Sinemaya farklı bakıyorum.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Baran Koç", text: "Renk Teorisi bölümü projelerimde çok işime yaradı.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "kapitalizm-tarihi", category: "Siyaset Bilimi", title: "Kapitalizmin Tarihi", description: "Kapitalizmin tarihsel gelişimini inceliyoruz.", slug: "siyaset-bilimi/kapitalizm-tarihi", price: 1575 },
            { id: "tanrilarin-evrimi", category: "Mitoloji", title: "Tanrıların Evrimi", description: "Tanrıların Evrimi'ni antropolojik bakış açısıyla ele alıyoruz.", slug: "mitoloji/tanrilarin-evrimi", price: 1575 },
            { id: "psikolojiye-giris", category: "Psikoloji", title: "Psikolojiye Giriş", description: "İnsan davranışının bilimsel temelleri.", slug: "psikoloji/psikolojiye-giris", price: 1390 },
        ],
        coverImage: "/images/courses/temel-sanat-egitimi-cover.svg",
        instructorNote: "Sanatın temel bileşenlerini öğrenerek her gördüğünüzü daha derin bir anlayışla izleyeceksiniz.",
    },
    // --- Antik Felsefenin Başlangıcı ---
    {
        id: "antik-felsefenin-baslangici", categorySlug: "felsefe", slug: "antik-felsefenin-baslangici", category: "Felsefe",
        title: "Antik Felsefenin Başlangıcı", lessonNumber: 2, currentLesson: 2,
        seriesLessons: [
            { number: 1, title: "Felsefeye Giriş", slug: "felsefeye-giris" },
            { number: 2, title: "Antik Felsefenin Başlangıcı", slug: "antik-felsefenin-baslangici" },
        ],
        tagline: "Sokrates öncesi felsefeyi keşfedin",
        description: "Ömer Aygün ile Antik Felsefeye girmeden önce Sokrates öncesi felsefeyi inceliyoruz.",
        price: 1390, originalPrice: 1750, discount: 21, duration: "10+ Saat", students: 1320, rating: 4.8,
        instructor: { name: "Ömer Aygün", title: "Felsefe Profesörü", quote: "Antik felsefe, düşüncenin doğduğu yerdir." },
        chapters: [
            { id: 1, title: "Felsefenin Öncesi", duration: "1s 20dk", description: "Felsefe öncesi düşünce biçimlerini ve mitolojiden felsefeye geçişi inceliyoruz." },
            { id: 2, title: "Miletos Okulu", duration: "1s 25dk", description: "Thales, Anaksimandros ve Anaksimenes'in doğa felsefesini keşfediyoruz." },
            { id: 3, title: "Pythagoras ve Pythagorasçılar", duration: "1s 30dk", description: "Pythagoras'ın matematik ve felsefe arasındaki bağlantıyı nasıl kurduğunu inceliyoruz." },
            { id: 4, title: "Her Şey Akar, Her Şey Göreli: Herakleitos ve Ksenophanes", duration: "1s 35dk", description: "Değişim felsefesini ve Herakleitos'un logos kavramını ele alıyoruz." },
            { id: 5, title: "Birciler: Parmenides & Zenon", duration: "1s 25dk", description: "Varlık felsefesinin temellerini atan Elea Okulu'nu inceliyoruz." },
            { id: 6, title: "Parça, Bütün, Sonsuzluk: Atomcular, Empedokles, Anaksagoras", duration: "1s 40dk", description: "Çoğulcu doğa filozoflarının evren anlayışını keşfediyoruz." },
            { id: 7, title: "Sofistler", duration: "1s 20dk", description: "Sofist geleneğini ve retorik ile felsefe arasındaki gerilimi inceliyoruz." },
            { id: 8, title: "Sokrates: Yöntemi, Davası, Ölümü", duration: "1s 45dk", description: "Sokrates'in diyalektik yöntemi, mahkemesi ve ölümünün felsefi anlamını ele alıyoruz." },
        ],
        insights: [
            { icon: "lightbulb", question: "Felsefe mitolojiden nasıl doğdu?", hint: "Logos vs Mythos" },
            { icon: "zap", question: "Sokrates neden ölümü seçti?", hint: "Erdem ve cesaret" },
            { icon: "columns", question: "Her şey akar mı yoksa değişmez mi?", hint: "Herakleitos vs Parmenides" },
        ],
        testimonials: [
            { id: 1, name: "Deniz Yıldız", text: "Sokrates öncesi felsefeyi ilk kez bu kadar derinden öğrendim.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Burak Kaya", text: "Herakleitos bölümü muhteşemdi. Logos kavramını sonunda anladım.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Elif Şen", text: "Ömer Hoca'nın anlatımı çok çekici ve derinlikli.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Can Demir", text: "Pythagoras bölümü matematik ve felsefe arasındaki bağı çok güzel kurmuş.", rating: 5, date: "1 ay önce" },
            { id: 5, name: "Zeynep Arslan", text: "Sokrates bölümü çok etkileyiciydi. Gözyaşlarımı tutamadım.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Onur Koç", text: "Sofistler bölümü günümüze çok farklı bir perspektif kattı.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "kapitalizm-tarihi", category: "Siyaset Bilimi", title: "Kapitalizmin Tarihi", description: "Kapitalizmin tarihsel gelişimini inceliyoruz.", slug: "siyaset-bilimi/kapitalizm-tarihi", price: 1575 },
            { id: "felsefeye-giris", category: "Felsefe", title: "Felsefeye Giriş", description: "Felsefenin temel alanlarını keşfediyoruz.", slug: "felsefe/felsefeye-giris", price: 1575 },
            { id: "psikolojiye-giris", category: "Psikoloji", title: "Psikolojiye Giriş", description: "İnsan davranışının bilimsel temelleri.", slug: "psikoloji/psikolojiye-giris", price: 1390 },
        ],
        coverImage: "/images/courses/antik-felsefenin-baslangici-cover.svg",
        instructorNote: "Antik felsefe sadece bir tarih dersi değil, düşüncenin nasıl doğduğunun hikayesidir.",
    },
    // --- Kapitalizmin Tarihi ---
    {
        id: "kapitalizm-tarihi", categorySlug: "siyaset-bilimi", slug: "kapitalizm-tarihi", category: "Siyaset Bilimi",
        title: "Kapitalizmin Tarihi", lessonNumber: 2, currentLesson: 2,
        seriesLessons: [
            { number: 1, title: "İdeolojiler", slug: "ideoloji" },
            { number: 2, title: "Kapitalizmin Tarihi", slug: "kapitalizm-tarihi" },
        ],
        tagline: "Kapitalizmin geçmişini, bugününü ve geleceğini keşfedin",
        description: "Siyaset biliminin temel kavramlarını ve tartışmalarını herkesin rahatça içselleştirebileceği şekilde anlatmak amacıyla yola çıkılan bu derste kapitalizmin tarihsel gelişimini ele alıyoruz.",
        price: 1575, originalPrice: 1750, discount: 10, duration: "10+ Saat", students: 1480, rating: 4.8,
        instructor: { name: "Ömer Gemalmaz", title: "Siyaset Bilimci", quote: "Kapitalizmi anlamak, günümüz dünyasını anlamanın anahtarıdır." },
        chapters: [
            { id: 1, title: "Kapitalizm Nedir?", duration: "1s 25dk", description: "Kapitalizmin tanımını, temel özelliklerini ve tarihsel kökenlerini inceliyoruz." },
            { id: 2, title: "Adam Smith ve Friedrich List", duration: "1s 30dk", description: "Klasik ekonomi politik geleneğini ve ulusal ekonomi fikrini ele alıyoruz." },
            { id: 3, title: "Karl Marx ve Vladimir Lenin", duration: "1s 35dk", description: "Kapitalizm eleştirisinin en güçlü seslerini ve teorilerini inceliyoruz." },
            { id: 4, title: "Karl Polanyi ve John M. Keynes", duration: "1s 30dk", description: "Piyasa toplumu eleştirisi ve refah devleti modelini keşfediyoruz." },
            { id: 5, title: "Kalkınma Teorileri", duration: "1s 25dk", description: "Modernleşme, bağımlılık ve dünya-sistemleri teorilerini ele alıyoruz." },
            { id: 6, title: "Neoliberalizm", duration: "1s 30dk", description: "Neoliberal dönüşümün tarihsel sürecini ve sonuçlarını inceliyoruz." },
            { id: 7, title: "Küreselleşme", duration: "1s 25dk", description: "Küreselleşme sürecini ekonomik, siyasi ve kültürel boyutlarıyla ele alıyoruz." },
            { id: 8, title: "Politik Ekonomi", duration: "1s 35dk", description: "Ekonomi ve siyaset arasındaki ilişkiyi günümüz perspektifinden analiz ediyoruz." },
        ],
        insights: [
            { icon: "columns", question: "Adam Smith gerçekten serbest piyasacı mıydı?", hint: "Yaygın yanılgılar" },
            { icon: "zap", question: "Marx'ın kehanetleri tuttu mu?", hint: "Tarihsel analiz" },
            { icon: "lightbulb", question: "Küreselleşme nereye gidiyor?", hint: "Güncel tartışmalar" },
        ],
        testimonials: [
            { id: 1, name: "Kaan Yılmaz", text: "Kapitalizmi ilk kez bu kadar kapsamlı ve tarafsız öğrendim.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Merve Aydın", text: "Marx ve Keynes bölümleri muhteşemdi. İktisat fakültesinde bile bu kadar iyi anlatılmıyor.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Tolga Demir", text: "Ömer Hoca'nın analitik yaklaşımı ve tarihsel bağlam kurması harika.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Pınar Arslan", text: "Neoliberalizm bölümü günümüzü anlamak için çok değerli.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Alp Koç", text: "Kalkınma Teorileri bölümü Türkiye'yi anlamak için harika.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Sibel Çetin", text: "Her bölüm ayrı bir ufuk açıyor. Kesinlikle tavsiye ederim.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "psikolojiye-giris", category: "Psikoloji", title: "Psikolojiye Giriş", description: "İnsan davranışının bilimsel temelleri.", slug: "psikoloji/psikolojiye-giris", price: 1390 },
            { id: "tanrilarin-evrimi", category: "Mitoloji", title: "Tanrıların Evrimi", description: "Mitoloji serimizin ikincisi olan bu derste Tanrıların Evrimi'ni antropolojik bakış açısıyla ele alıyoruz.", slug: "mitoloji/tanrilarin-evrimi", price: 1575 },
            { id: "ideolojiler", category: "Siyaset Bilimi", title: "İdeolojiler", description: "Siyasi ideolojileri tarihsel süreç içinde inceliyoruz.", slug: "siyaset-bilimi/ideoloji", price: 1575 },
        ],
        coverImage: "/images/courses/kapitalizm-tarihi-cover.svg",
        instructorNote: "Kapitalizmin tarihini bilmek, bugünü ve yarını anlamanın en güçlü yoludur.",
    },
    // --- Sosyolojiye Giriş ---
    {
        id: "sosyolojiye-giris", categorySlug: "sosyoloji", slug: "sosyolojiye-giris", category: "Sosyoloji",
        title: "Sosyolojiye Giriş", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [
            { number: 1, title: "Sosyolojiye Giriş", slug: "sosyolojiye-giris" },
        ],
        tagline: "Toplumu anlama bilimi",
        description: "Türkiye'nin önde gelen sosyologlarından Besim Dellaloğlu ile sosyolojinin temellerini ve toplumsal yapıları keşfedin.",
        price: 1575, originalPrice: 1750, discount: 10, duration: "10+ Saat", students: 1320, rating: 4.8,
        instructor: { name: "Besim Dellaloğlu", title: "Sosyolog & Yazar", quote: "Toplumu anlamak, kendimizi anlamanın en güçlü yoludur." },
        chapters: [
            { id: 1, title: "Sosyoloji Nedir?", duration: "1s 20dk", description: "Sosyolojinin tanımını, tarihçesini ve temel kavramlarını inceliyoruz." },
            { id: 2, title: "Toplumsal Yapı ve Kurumlar", duration: "1s 25dk", description: "Toplumu oluşturan temel yapıları ve kurumları analiz ediyoruz." },
            { id: 3, title: "Modernleşme ve Toplumsal Değişim", duration: "1s 30dk", description: "Modernleşme sürecinin toplumlar üzerindeki dönüştürücü etkisini ele alıyoruz." },
            { id: 4, title: "Sınıf, Tabakalaşma ve Eşitsizlik", duration: "1s 35dk", description: "Toplumsal sınıfları, tabakalaşma sistemlerini ve eşitsizlik biçimlerini inceliyoruz." },
            { id: 5, title: "Kültür ve Kimlik", duration: "1s 25dk", description: "Kültürün toplumsal işlevlerini ve kimlik inşa süreçlerini keşfediyoruz." },
            { id: 6, title: "Kent Sosyolojisi", duration: "1s 30dk", description: "Kentleşme sürecini ve kent yaşamının sosyolojik boyutlarını analiz ediyoruz." },
            { id: 7, title: "Medya ve İletişim", duration: "1s 20dk", description: "Medyanın toplumsal rolünü ve iletişim süreçlerini sosyolojik perspektiften ele alıyoruz." },
            { id: 8, title: "Küreselleşme ve Toplum", duration: "1s 35dk", description: "Küreselleşmenin toplumsal yapılar üzerindeki etkilerini çok boyutlu olarak inceliyoruz." },
        ],
        insights: [
            { icon: "lightbulb", question: "Toplum neden değişir?", hint: "Modernleşme ve dönüşüm" },
            { icon: "zap", question: "Eşitsizlik kaçınılmaz mıdır?", hint: "Sınıf ve tabakalaşma" },
            { icon: "columns", question: "Medya toplumu nasıl şekillendirir?", hint: "İletişim ve iktidar" },
        ],
        testimonials: [
            { id: 1, name: "Elif Karaca", text: "Besim Hoca'nın bakış açısı sosyolojiye olan ilgimi bambaşka bir boyuta taşıdı.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Oğuzhan Yıldız", text: "Modernleşme bölümü Türkiye'yi anlamak için çok değerli.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Zeynep Koç", text: "Kent sosyolojisi bölümü İstanbul'a bakışımı değiştirdi.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Burak Özdemir", text: "Tabakalaşma ve eşitsizlik konuları çok net anlatılmış.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Aylin Şen", text: "Her bölüm ayrı bir dünya. Tekrar tekrar izliyorum.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Cenk Aydın", text: "Küreselleşme bölümü günümüzü anlamak için harika.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "felsefeye-giris", category: "Felsefe", title: "Felsefeye Giriş", description: "Felsefenin temel alanlarını keşfedin.", slug: "felsefe/felsefeye-giris", price: 1575 },
            { id: "ideolojiler", category: "Siyaset Bilimi", title: "İdeolojiler", description: "Siyasi ideolojileri tarihsel süreç içinde inceliyoruz.", slug: "siyaset-bilimi/ideoloji", price: 1575 },
            { id: "psikolojiye-giris", category: "Psikoloji", title: "Psikolojiye Giriş", description: "İnsan davranışının bilimsel temelleri.", slug: "psikoloji/psikolojiye-giris", price: 1390 },
        ],
        coverImage: "/images/courses/sosyolojiye-giris-cover.svg",
        instructorNote: "Toplumu anlamak, aslında kendimizi anlamanın en güçlü yoludur. Birlikte sosyolojinin kapılarını aralayacağız.",
    },
    // --- Felsefe Paketi ---
    {
        id: "felsefe-paketi", categorySlug: "felsefe", slug: "felsefe-paketi", category: "Felsefe",
        title: "Felsefe Paketi", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [{ number: 1, title: "Felsefe Paketi", slug: "felsefe-paketi" }],
        tagline: "Felsefenin tüm temellerini tek pakette keşfedin",
        description: "Felsefeye Giriş ve Antik Felsefenin Başlangıcı derslerini bir arada sunan bu paket ile felsefenin temellerinden Sokrates'e uzanan yolculuğa çıkın.",
        price: 2490, originalPrice: 2965, discount: 16, duration: "20+ Saat", students: 1450, rating: 4.8,
        instructor: { name: "Ömer Aygün", title: "Felsefe Profesörü", quote: "Felsefe, sorgulayan zihinlerin yolculuğudur." },
        bundledCourses: [
            { title: "Felsefeye Giriş", slug: "felsefe/felsefeye-giris" },
            { title: "Antik Felsefenin Başlangıcı", slug: "felsefe/antik-felsefenin-baslangici" },
        ],
        chapters: [
            {
                id: 1, title: "Felsefeye Giriş (Tam Ders)", duration: "10+ Saat", description: "Ontoloji, epistemoloji, etik, mantık ve estetik gibi felsefenin temel alanlarını keşfedin.", subChapters: [
                    { title: "Felsefe Nedir?", duration: "1s 30dk" },
                    { title: "Varlık Felsefesi (Ontoloji)", duration: "1s 25dk" },
                    { title: "Bilgi Felsefesi (Epistemoloji)", duration: "1s 20dk" },
                    { title: "Etik", duration: "1s 35dk" },
                    { title: "Mantık", duration: "1s 15dk" },
                    { title: "Estetik", duration: "1s 25dk" },
                    { title: "Siyaset Felsefesi", duration: "1s 20dk" },
                    { title: "Din Felsefesi", duration: "1s 30dk" },
                ]
            },
            {
                id: 2, title: "Antik Felsefenin Başlangıcı (Tam Ders)", duration: "10+ Saat", description: "Sokrates öncesi felsefeyi, Miletos Okulu'ndan Sofistlere ve Sokrates'e kadar inceleyin.", subChapters: [
                    { title: "Felsefenin Öncesi", duration: "1s 20dk" },
                    { title: "Miletos Okulu", duration: "1s 25dk" },
                    { title: "Pythagoras ve Pythagorasçılar", duration: "1s 30dk" },
                    { title: "Herakleitos ve Ksenophanes", duration: "1s 35dk" },
                    { title: "Birciler: Parmenides & Zenon", duration: "1s 25dk" },
                    { title: "Atomcular, Empedokles, Anaksagoras", duration: "1s 40dk" },
                    { title: "Sofistler", duration: "1s 20dk" },
                    { title: "Sokrates: Yöntemi, Davası, Ölümü", duration: "1s 45dk" },
                ]
            },
        ],
        insights: [
            { icon: "lightbulb", question: "Neden 2 ders bir arada?", hint: "Temelden derine bir yolculuk" },
            { icon: "zap", question: "Tek tek almaktan ne kadar avantajlı?", hint: "₺475 tasarruf" },
            { icon: "columns", question: "Hangi sırayla izlemeliyim?", hint: "Önce Giriş, sonra Antik Felsefe" },
        ],
        testimonials: [
            { id: 1, name: "Deniz Aydın", text: "İki dersi peş peşe izlemek muhteşem bir bütünlük sağladı.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Berk Şen", text: "Felsefeye Giriş'ten Sokrates'e kadar olan yolculuk harika.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Ecem Koç", text: "Ömer Hoca iki derste de aynı kalitede. Paket çok mantıklı.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Arda Demir", text: "Tek tek almaktansa paket çok daha avantajlı.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Sude Yılmaz", text: "Antik felsefe, giriş dersinden sonra çok daha anlamlı oldu.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Mert Arslan", text: "Felsefe dünyasına en güzel giriş bu paketle yapılır.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "ideolojiler", category: "Siyaset Bilimi", title: "İdeolojiler", description: "Siyasi ideolojileri tarihsel süreç içinde inceliyoruz.", slug: "siyaset-bilimi/ideoloji", price: 1575 },
            { id: "mitolojiye-giris", category: "Mitoloji", title: "Mitolojiye Giriş", description: "Kadim mitlerin izinde bir yolculuk.", slug: "mitoloji/mitolojiye-giris", price: 1575 },
            { id: "tum-egitimler-paketi", category: "Tüm Eğitimler", title: "Tüm Eğitimler Paketi", description: "Tüm derslere tek pakette erişim.", slug: "tum-egitimler/flu", price: 7350 },
        ],
        coverImage: "/images/courses/felsefe-paketi-cover.svg",
        instructorNote: "Felsefenin temellerinden antik düşünceye uzanan bu yolculukta, düşüncenin nasıl doğduğunu birlikte keşfedeceğiz.",
    },
    // --- Siyaset Bilimi Paketi ---
    {
        id: "siyaset-bilimi-paketi", categorySlug: "siyaset-bilimi", slug: "siyaset-bilimi-paketi", category: "Siyaset Bilimi",
        title: "Siyaset Bilimi Paketi", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [{ number: 1, title: "Siyaset Bilimi Paketi", slug: "siyaset-bilimi-paketi" }],
        tagline: "İdeolojilerden kapitalizme siyasetin tüm boyutları",
        description: "İdeolojiler ve Kapitalizmin Tarihi derslerini bir arada sunan bu paket ile siyasi düşüncenin temellerini ve ekonomik sistemlerin tarihsel gelişimini keşfedin.",
        price: 2490, originalPrice: 3150, discount: 21, duration: "20+ Saat", students: 1280, rating: 4.8,
        instructor: { name: "Ömer Gemalmaz", title: "Siyaset Bilimci", quote: "Siyaseti anlamak, dünyayı anlamaktır." },
        bundledCourses: [
            { title: "İdeolojiler", slug: "siyaset-bilimi/ideoloji" },
            { title: "Kapitalizmin Tarihi", slug: "siyaset-bilimi/kapitalizm-tarihi" },
        ],
        chapters: [
            {
                id: 1, title: "İdeolojiler (Tam Ders)", duration: "10+ Saat", description: "Liberalizm, sosyalizm, muhafazakarlık, faşizm, anarşizm, milliyetçilik ve Kemalizm'i analiz edin.", subChapters: [
                    { title: "Klasik Liberalizm", duration: "1s 25dk" },
                    { title: "Neo-Liberalizm", duration: "1s 20dk" },
                    { title: "Sosyalizm", duration: "1s 35dk" },
                    { title: "Muhafazakarlık", duration: "1s 30dk" },
                    { title: "Faşizm", duration: "1s 25dk" },
                    { title: "Anarşizm", duration: "1s 20dk" },
                    { title: "Milliyetçilik", duration: "1s 30dk" },
                    { title: "Kemalizm", duration: "1s 35dk" },
                ]
            },
            {
                id: 2, title: "Kapitalizmin Tarihi (Tam Ders)", duration: "10+ Saat", description: "Adam Smith'ten küreselleşmeye, Marx'tan neoliberalizme kapitalizmin serüvenini takip edin.", subChapters: [
                    { title: "Kapitalizm Nedir?", duration: "1s 25dk" },
                    { title: "Adam Smith ve Friedrich List", duration: "1s 30dk" },
                    { title: "Karl Marx ve Vladimir Lenin", duration: "1s 35dk" },
                    { title: "Karl Polanyi ve John M. Keynes", duration: "1s 30dk" },
                    { title: "Kalkınma Teorileri", duration: "1s 25dk" },
                    { title: "Neoliberalizm", duration: "1s 30dk" },
                    { title: "Küreselleşme", duration: "1s 25dk" },
                    { title: "Politik Ekonomi", duration: "1s 35dk" },
                ]
            },
        ],
        insights: [
            { icon: "lightbulb", question: "İdeolojiler ve kapitalizm nasıl bağlantılı?", hint: "Düşünce ve ekonomi" },
            { icon: "zap", question: "Tek tek almaktan ne kadar avantajlı?", hint: "₺660 tasarruf" },
            { icon: "columns", question: "Hangi sırayla izlemeliyim?", hint: "Önce İdeolojiler, sonra Kapitalizm" },
        ],
        testimonials: [
            { id: 1, name: "Hakan Aydın", text: "İdeolojileri öğrendikten sonra Kapitalizm dersi çok daha anlamlı oldu.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Selin Koç", text: "Ömer Hoca'nın iki dersteki tutarlılığı ve derinliği muhteşem.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Emre Şahin", text: "Dünya siyasetini anlamak için en iyi başlangıç noktası.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Derya Arslan", text: "Paket fiyatı çok makul. İki ders birbirini tamamlıyor.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Ali Çetin", text: "Marx ve Adam Smith'i yan yana incelemek harika bir deneyimdi.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Gizem Yılmaz", text: "Siyaset biliminin en kapsamlı online eğitimi.", rating: 4, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "felsefeye-giris", category: "Felsefe", title: "Felsefeye Giriş", description: "Felsefenin temel alanlarını keşfedin.", slug: "felsefe/felsefeye-giris", price: 1575 },
            { id: "tanrilarin-evrimi", category: "Mitoloji", title: "Tanrıların Evrimi", description: "Tanrıların evrimini antropolojik perspektiften inceleyin.", slug: "mitoloji/tanrilarin-evrimi", price: 1575 },
            { id: "tum-egitimler-paketi", category: "Tüm Eğitimler", title: "Tüm Eğitimler Paketi", description: "Tüm derslere tek pakette erişim.", slug: "tum-egitimler/flu", price: 7350 },
        ],
        coverImage: "/images/courses/siyaset-bilimi-paketi-cover.svg",
        instructorNote: "İdeolojiler ve kapitalizmin tarihini birlikte anlayarak günümüz dünyasını daha net okuyacaksınız.",
    },
    // --- Mitoloji Paketi ---
    {
        id: "mitoloji-paketi", categorySlug: "mitoloji", slug: "mitoloji-paketi", category: "Mitoloji",
        title: "Mitoloji Paketi", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [{ number: 1, title: "Mitoloji Paketi", slug: "mitoloji-paketi" }],
        tagline: "Kadim mitlerden tanrıların evrimine tam bir yolculuk",
        description: "Mitolojiye Giriş ve Tanrıların Evrimi derslerini bir arada sunan bu paket ile mitolojinin temellerinden tanrıların evrimine uzanan kapsamlı bir yolculuğa çıkın.",
        price: 2490, originalPrice: 3150, discount: 21, duration: "22+ Saat", students: 1680, rating: 4.9,
        instructor: { name: "Nevzat Kaya", title: "Mitoloji & Kültür Tarihçisi", quote: "Mitleri anlamak, insanlığı anlamaktır." },
        bundledCourses: [
            { title: "Mitolojiye Giriş", slug: "mitoloji/mitolojiye-giris" },
            { title: "Tanrıların Evrimi", slug: "mitoloji/tanrilarin-evrimi" },
        ],
        chapters: [
            {
                id: 1, title: "Mitolojiye Giriş (Tam Ders)", duration: "10+ Saat", description: "Kadim mitlerin izinde insanlığın en temel sorularını keşfedin.", subChapters: [
                    { title: "Kültür Nedir?", duration: "1s 30dk" },
                    { title: "İnsanın Anlam Arayışı", duration: "1s 25dk" },
                    { title: "Ölümlülük ve Ölümsüzlük", duration: "1s 35dk" },
                    { title: "Kurucu Mitler", duration: "1s 20dk" },
                    { title: "Kahraman Arketipi", duration: "1s 30dk" },
                    { title: "Ödipus Kompleksi", duration: "1s 25dk" },
                    { title: "Prometheus ve Ateş", duration: "1s 15dk" },
                    { title: "Mitolojinin Mirası", duration: "1s 40dk" },
                ]
            },
            {
                id: 2, title: "Tanrıların Evrimi (Tam Ders)", duration: "12+ Saat", description: "Tanrıların evrimini antropolojik perspektiften, Kutsalın Metamorfozları'ndan Tragedyaya inceleyin.", subChapters: [
                    { title: "Kutsalın Metamorfozları", duration: "1s 45dk" },
                    { title: "Titanlar ve Olimpikler", duration: "1s 30dk" },
                    { title: "Demeter - Afrodit - Artemis", duration: "1s 20dk" },
                    { title: "Olimpik İdeoloji", duration: "1s 35dk" },
                    { title: "Olimpizmin Bilinçdışı", duration: "1s 25dk" },
                    { title: "Eksen Çağı ve Apollonizmin Doğuşu", duration: "1s 40dk" },
                    { title: "Dionysos'un Bastırılışı", duration: "1s 15dk" },
                    { title: "Tanrının Ölümü ve Tragedyanın Doğuşu", duration: "1s 50dk" },
                ]
            },
        ],
        insights: [
            { icon: "lightbulb", question: "Neden mitoloji hâlâ önemli?", hint: "Kültürün kökleri" },
            { icon: "zap", question: "Tek tek almaktan ne kadar avantajlı?", hint: "₺660 tasarruf" },
            { icon: "columns", question: "Hangi sırayla izlemeliyim?", hint: "Önce Giriş, sonra Tanrıların Evrimi" },
        ],
        testimonials: [
            { id: 1, name: "Ayşe Aydın", text: "Giriş dersinden sonra Tanrıların Evrimi çok daha derin bir anlam kazandı.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Oğuz Kaya", text: "Nevzat Hoca'nın iki dersindeki bütünlük inanılmaz.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "Seda Koç", text: "Mitoloji dünyasına en güzel giriş bu paketle yapılır.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Cem Yılmaz", text: "İki ders yan yana izlendiğinde bambaşka bir deneyim.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Elif Demir", text: "Dionysos'tan Sokrates'e uzanan çizgi muhteşem kurulmuş.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Baran Şen", text: "En çok sevdiğim paket. Tekrar tekrar izliyorum.", rating: 5, date: "3 ay önce" },
        ],
        relatedCourses: [
            { id: "felsefeye-giris", category: "Felsefe", title: "Felsefeye Giriş", description: "Felsefenin temel alanlarını keşfedin.", slug: "felsefe/felsefeye-giris", price: 1575 },
            { id: "ideolojiler", category: "Siyaset Bilimi", title: "İdeolojiler", description: "Siyasi ideolojileri tarihsel süreç içinde inceliyoruz.", slug: "siyaset-bilimi/ideoloji", price: 1575 },
            { id: "tum-egitimler-paketi", category: "Tüm Eğitimler", title: "Tüm Eğitimler Paketi", description: "Tüm derslere tek pakette erişim.", slug: "tum-egitimler/flu", price: 7350 },
        ],
        coverImage: "/images/courses/mitoloji-paketi-cover.svg",
        instructorNote: "Kadim mitlerden tanrıların evrimine, insanlığın en derin hikayelerini birlikte keşfedeceğiz.",
    },
    // --- Tüm Eğitimler Paketi ---
    {
        id: "tum-egitimler-paketi", categorySlug: "tum-egitimler", slug: "flu", category: "Tüm Eğitimler",
        title: "Tüm Eğitimler Paketi - 1. Dönem", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [{ number: 1, title: "Tüm Eğitimler Paketi", slug: "flu" }],
        tagline: "Tüm derslere tek pakette erişim",
        description: "Felsefe, sosyoloji, psikoloji, temel sanat gibi alanlardaki tüm eğitimlerimize bu paket ile erişebilirsiniz.",
        price: 7350, originalPrice: 10500, discount: 30, duration: "60+ Saat", students: 980, rating: 4.9,
        instructor: { name: "Flu Akademi", title: "Eğitim Platformu", quote: "Bilgiye erişim herkesin hakkıdır." },
        chapters: [
            { id: 1, title: "Mitolojiye Giriş (Tam Ders)", duration: "10+ Saat", description: "Nevzat Kaya ile mitolojinin temellerini keşfedin." },
            { id: 2, title: "Tanrıların Evrimi (Tam Ders)", duration: "12+ Saat", description: "Tanrıların evrimini antropolojik perspektiften inceleyin." },
            { id: 3, title: "Psikolojiye Giriş (Tam Ders)", duration: "10+ Saat", description: "Alper Hasanoğlu ile psikolojinin temellerini öğrenin." },
            { id: 4, title: "Felsefeye Giriş (Tam Ders)", duration: "10+ Saat", description: "Ömer Aygün ile felsefenin derinliklerine dalın." },
            { id: 5, title: "İdeolojiler (Tam Ders)", duration: "10+ Saat", description: "Ömer Gemalmaz ile siyasi ideolojileri analiz edin." },
            { id: 6, title: "Temel Sanat Eğitimi (Tam Ders)", duration: "8+ Saat", description: "İlker Canikligil ile sanatın temellerini keşfedin." },
        ],
        insights: [
            { icon: "lightbulb", question: "Neden tüm paket?", hint: "Disiplinlerarası bakış" },
            { icon: "zap", question: "%30 indirim neyi kapsar?", hint: "6 dersin tamamı" },
            { icon: "columns", question: "Hangi sırayla izlemeliyim?", hint: "İstediğiniz sırada" },
        ],
        testimonials: [
            { id: 1, name: "Yasemin Aydın", text: "Paketi aldım ve her dersten ayrı ayrı keyif aldım. Muhteşem değer.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Okan Demir", text: "Tek tek almaktansa paket çok daha avantajlı.", rating: 5, date: "2 hafta önce" },
            { id: 3, name: "İrem Şahin", text: "Tüm dersler üst düzey kalitede. Hayal kırıklığına uğramadım.", rating: 5, date: "1 ay önce" },
            { id: 4, name: "Alican Koç", text: "En iyi yatırım bu paketti. Sürekli geri dönüp izliyorum.", rating: 5, date: "2 ay önce" },
            { id: 5, name: "Dilara Arslan", text: "Farklı disiplinler arasındaki bağlantıları görmek çok değerli.", rating: 5, date: "2 ay önce" },
            { id: 6, name: "Furkan Yılmaz", text: "Harika bir paket. Özellikle mitoloji ve felsefe derslerini çok sevdim.", rating: 5, date: "3 ay önce" },
        ],
        relatedCourses: [],
        coverImage: "/images/courses/tum-egitimler-cover.svg",
        bundledCourses: [
            { title: "Mitolojiye Giriş", slug: "mitoloji/mitolojiye-giris" },
            { title: "Tanrıların Evrimi", slug: "mitoloji/tanrilarin-evrimi" },
            { title: "Psikolojiye Giriş", slug: "psikoloji/psikolojiye-giris" },
            { title: "Felsefeye Giriş", slug: "felsefe/felsefeye-giris" },
            { title: "İdeolojiler", slug: "siyaset-bilimi/ideoloji" },
            { title: "Temel Sanat Eğitimi", slug: "temel-sanat/temel-sanat-egitimi" },
        ],
        instructorNote: "Flu Akademi'nin tüm eğitimlerine tek pakette erişin. Bilgiye yapılan en iyi yatırım.",
    },
    // --- Tüm Eğitimler Paketi - Bütün Dersler ---
    {
        id: "tum-egitimler-butun-dersler", categorySlug: "tum-egitimler", slug: "butun-dersler", category: "Tüm Eğitimler",
        title: "Tüm Eğitimler Paketi - Bütün Dersler", lessonNumber: 1, currentLesson: 1,
        seriesLessons: [
            { number: 1, title: "Tüm Eğitimler Paketi - 1. Dönem", slug: "flu" },
            { number: 2, title: "Tüm Eğitimler Paketi - Bütün Dersler", slug: "butun-dersler" },
        ],
        tagline: "1. ve 2. Dönem dahil tüm derslere sınırsız erişim",
        description: "Flu Akademi'nin tüm eğitimlerine — 1. Dönem ve 2. Dönem dahil — tek bir paket ile erişin. Mevcut ve gelecekte eklenecek tüm dersler bu pakete dahildir.",
        price: 9900, originalPrice: 15750, discount: 37, duration: "120+ Saat", students: 520, rating: 4.9,
        instructor: { name: "Flu Akademi", title: "Eğitim Platformu", quote: "Bilgiye sınırsız erişim." },
        chapters: [
            { id: 1, title: "1. Dönem - Mitolojiye Giriş", duration: "10+ Saat", description: "Nevzat Kaya ile mitolojinin temellerini keşfedin." },
            { id: 2, title: "1. Dönem - Tanrıların Evrimi", duration: "12+ Saat", description: "Tanrıların evrimini antropolojik perspektiften inceleyin." },
            { id: 3, title: "1. Dönem - Psikolojiye Giriş", duration: "10+ Saat", description: "Alper Hasanoğlu ile psikolojinin temellerini öğrenin." },
            { id: 4, title: "1. Dönem - Felsefeye Giriş", duration: "10+ Saat", description: "Ömer Aygün ile felsefenin derinliklerine dalın." },
            { id: 5, title: "1. Dönem - İdeolojiler", duration: "10+ Saat", description: "Ömer Gemalmaz ile siyasi ideolojileri analiz edin." },
            { id: 6, title: "1. Dönem - Temel Sanat Eğitimi", duration: "8+ Saat", description: "İlker Canikligil ile sanatın temellerini keşfedin." },
            { id: 7, title: "2. Dönem - Antik Felsefenin Başlangıcı", duration: "5+ Saat", description: "Ömer Aygün ile antik felsefenin doğuşunu inceleyin." },
            { id: 8, title: "2. Dönem - Kapitalizmin Tarihi", duration: "6+ Saat", description: "Ömer Gemalmaz ile kapitalizmin tarihsel gelişimini keşfedin." },
            { id: 9, title: "2. Dönem - Sosyolojiye Giriş", duration: "10+ Saat", description: "Besim Dellaloğlu ile sosyolojinin temellerini öğrenin." },
            { id: 10, title: "2. Dönem + Gelecek Dersler", duration: "30+ Saat", description: "Yakında eklenecek tüm yeni dersler otomatik olarak paketinize eklenir." },
        ],
        insights: [
            { icon: "lightbulb", question: "1. Dönem + 2. Dönem farkı nedir?", hint: "Bütün dersler dahil" },
            { icon: "zap", question: "Gelecek dersler de dahil mi?", hint: "Evet, otomatik eklenir" },
            { icon: "columns", question: "En avantajlı paket mi?", hint: "%37 indirimle" },
        ],
        testimonials: [
            { id: 1, name: "Emre Kılıç", text: "Bütün dersler paketini aldım, her ay yeni dersler ekleniyor. Süper değer.", rating: 5, date: "1 hafta önce" },
            { id: 2, name: "Selin Yıldız", text: "Tek tek almak yerine bu paketi aldım, çok daha mantıklı.", rating: 5, date: "3 hafta önce" },
        ],
        relatedCourses: [],
        coverImage: "/images/courses/tum-egitimler-cover.svg",
        bundledCourses: [
            { title: "Mitolojiye Giriş", slug: "mitoloji/mitolojiye-giris" },
            { title: "Tanrıların Evrimi", slug: "mitoloji/tanrilarin-evrimi" },
            { title: "Psikolojiye Giriş", slug: "psikoloji/psikolojiye-giris" },
            { title: "Felsefeye Giriş", slug: "felsefe/felsefeye-giris" },
            { title: "İdeolojiler", slug: "siyaset-bilimi/ideoloji" },
            { title: "Temel Sanat Eğitimi", slug: "temel-sanat/temel-sanat-egitimi" },
            { title: "Antik Felsefenin Başlangıcı", slug: "felsefe/antik-felsefenin-baslangici" },
            { title: "Kapitalizmin Tarihi", slug: "siyaset-bilimi/kapitalizm-tarihi" },
            { title: "Sosyolojiye Giriş", slug: "sosyoloji/sosyolojiye-giris" },
        ],
        instructorNote: "Flu Akademi'nin mevcut ve gelecekteki tüm eğitimlerine sınırsız erişim. En kapsamlı ve en avantajlı paket.",
    },
];

// --- HELPER FUNCTIONS ---

/**
 * Kategori slug ve ders slug ile ders bul
 */
export function getCourseBySlug(categorySlug: string, slug: string): CourseData | undefined {
    return courses.find(
        (c) => c.categorySlug === categorySlug && c.slug === slug
    );
}

/**
 * Tüm dersleri getir
 */
export function getAllCourses(): CourseData[] {
    return courses;
}

/**
 * Kategoriye göre dersleri getir
 */
export function getCoursesByCategory(categorySlug: string): CourseData[] {
    return courses.filter((c) => c.categorySlug === categorySlug);
}

/**
 * Eğitmen adına göre dersleri getir (paket dersler hariç)
 */
export function getCoursesByInstructorName(instructorName: string): CourseData[] {
    return courses.filter(
        (c) => c.instructor.name === instructorName && !c.bundledCourses
    );
}

/**
 * Static params oluştur (SSG için)
 */
export function getAllCourseSlugs(): { kategori: string; slug: string }[] {
    return courses.map((c) => ({
        kategori: c.categorySlug,
        slug: c.slug,
    }));
}

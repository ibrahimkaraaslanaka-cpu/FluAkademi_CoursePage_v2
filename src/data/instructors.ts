// ——— Instructor Data ———

export interface InstructorWork {
    title: string;
    publisher?: string;
    type: "book" | "translation" | "poetry" | "film" | "exhibition" | "publication";
}

export interface Instructor {
    slug: string;
    firstName: string;
    lastName: string;
    title: string;
    field: string;
    fieldColor: string;
    shortBio: string;
    longBio: string;
    courseDescription: string;
    courseTitle: string;
    courseLink: string;
    image: string;
    universities: string[];
    works: InstructorWork[];
    social: {
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        youtube?: string;
        academicProfile?: string;
    };
}

export const instructors: Instructor[] = [
    {
        slug: "alper-hasanoglu",
        firstName: "Alper",
        lastName: "Hasanoğlu",
        title: "Psikiyatrist & Yazar",
        field: "Psikoloji",
        fieldColor: "#A855F7",
        shortBio: "İnsanı ve insan ruhunu derinlemesine anlamaya çalışan Alper Hasanoğlu, psikoloji ve psikiyatri alanındaki çalışmalarının yanı sıra çok sayıda eseri bulunan, ülkenin önde gelen entelektüellerindendir.",
        longBio: "İstanbul'da doğan Alper Hasanoğlu tıp ve fizyoloji eğitiminin ardından İsviçre'de psikiyatri ve psikoterapi uzmanı olmuştur. Uzun yıllar yurt dışında çalışmış, çok sayıda kitap yayınlamıştır. Çalışmalarını Türkiye ve Almanya'da sürdürmeye devam etmektedir.",
        courseTitle: "Psikolojiye Giriş",
        courseDescription: "İnsan davranışının ve zihinsel süreçlerinin evrimsel ve sinirsel temelleri hakkında bir bakışa sahip olmayı amaçladığımız bu derste Alper Hasanoğlu'nun birikimi ve yaklaşımı ile psikolojiyi bir disiplin olarak ele alacağız.",
        courseLink: "/ders/psikoloji/psikolojiye-giris",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80&crop=faces",
        universities: [
            "Basel Üniversitesi",
            "Rumeli Üniversitesi",
            "Çorlu Üniversitesi",
        ],
        works: [
            { title: "Bir Terapistin Arka Bahçesi", publisher: "Remzi Kitabevi", type: "book" },
            { title: "Aşkın Halleri", publisher: "Doğan Kitap", type: "book" },
            { title: "İlişkilerin Günlük Hayatı", publisher: "Remzi Kitabevi", type: "book" },
            { title: "Çocuklarda Rezilyans", publisher: "Remzi Kitabevi", type: "book" },
            { title: "Hayat ve Diğer Hastalıklar", publisher: "Doğan Kitap", type: "book" },
            { title: "Gel Hayattan Konuşalım", publisher: "Doğan Kitap", type: "book" },
            { title: "Hayat Bilgisi", publisher: "Pinhan Yayıncılık", type: "book" },
            { title: "Bilinçdışı Mırıltılar", publisher: "Pinhan Yayıncılık", type: "book" },
        ],
        social: {
            twitter: "https://x.com/AlperHasanoglu",
            instagram: "https://www.instagram.com/alperhasanoglu/",
        },
    },
    {
        slug: "besim-dellaloglu",
        firstName: "Besim",
        lastName: "Dellaloğlu",
        title: "Sosyolog & Akademisyen",
        field: "Sosyoloji",
        fieldColor: "#EA580C",
        shortBio: "1965'te İstanbul'da doğdu. Sosyolog, düşünür ve akademisyendir. 2019 yılında üniversiteden emekli olmuş, entelektüel faaliyetlerine devam etmektedir.",
        longBio: "1965'te İstanbul'da doğdu. 1984'te Galatasaray Lisesi'ni, 1990'da Boğaziçi Üniversitesi Siyaset Bilimi ve Uluslararası İlişkiler Bölümü'nü bitirdi. Yüksek lisans ve doktorasını Mimar Sinan Üniversitesi Sosyoloji Bölümü'nde tamamladı. Lisans ve lisansüstü eğitimi sırasında uzun süre Fransızca turist rehberliği yaparak Türkiye'nin büyük bir bölümünü gezme ve görme fırsatı buldu. Türkiye'de Mimar Sinan, Marmara, İstanbul Bilgi, Yıldız Teknik, Galatasaray, Kırklareli, İstanbul ve Sakarya Üniversitelerinde dersler verdi. 2019'da üniversiteden emekli oldu. Gazete Duvar ve Perspektif'te haftalık yazılar yazdı. Zoom üzerinden düzenli dersler vermekte, Medyaskop ve FluTV'de içerik üretimine katkıda bulunmaktadır.",
        courseTitle: "Sosyolojiye Giriş",
        courseDescription: "Geleneksel bir ders anlatımından uzaklaşarak hazırlanan bu derste; sosyolojinin ne olup ne olmadığına, tarihsel gelişimine, disiplinler arasındaki çatışmaya, bir kavram ve disiplin olarak doğuşuna tanıklık ediyoruz.",
        courseLink: "/ders/sosyoloji/sosyolojiye-giris",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&q=80&crop=faces",
        universities: [
            "Frankfurt Goethe Üniversitesi",
            "Paris VIII Üniversitesi",
            "Lizbon Üniversitesi",
            "Strasbourg Üniversitesi",
            "Mainz Gutenberg Üniversitesi",
            "Mimar Sinan Üniversitesi",
            "Marmara Üniversitesi",
            "İstanbul Bilgi Üniversitesi",
            "Yıldız Teknik Üniversitesi",
            "Galatasaray Üniversitesi",
            "Kırklareli Üniversitesi",
            "İstanbul Üniversitesi",
            "Sakarya Üniversitesi",
        ],
        works: [],
        social: {
            twitter: "https://x.com/bfdellaloglu",
            instagram: "https://www.instagram.com/bfdellaloglu/",
            academicProfile: "https://scholar.google.com.tr/citations?user=eWktLuQAAAAJ&hl=tr",
        },
    },
    {
        slug: "ilker-canikligil",
        firstName: "İlker",
        lastName: "Canikligil",
        title: "Yönetmen, Senarist & Fotoğrafçı",
        field: "Güzel Sanatlar",
        fieldColor: "#F43F5E",
        shortBio: "1972 İstanbul doğumlu bir yönetmen, senarist, kurgucu ve fotoğrafçı olan İlker Canikligil, sinema ve reklam sektörlerinde başarılı projelere imza atmış, genç sinemacılara ilham veren bir isimdir.",
        longBio: "İlker Canikligil, 1972 İstanbul doğumlu bir yönetmen, senarist, kurgucu ve fotoğrafçıdır. Saint Joseph Fransız Lisesi ve Marmara Üniversitesi Sinema TV Bölümü mezunu olan Canikligil, 1992-1995 yılları arasında Nöbetçi, Ağaç ve Uçmak İstiyorum adlı kısa filmleriyle ödüller kazandı. 1999 yılında İstanbul Bilgi Üniversitesi'nde ders vermeye başladı ve 2001'de Clermont Ferrand'da ödül kazandı. 2005'te Walter Murch'ün In The Blink of An Eye kitabını Türkçeye çevirerek sinema dünyasına katkı sağladı. 2006'da akademiden ayrılıp reklam sektörüne adım attı ve Gen filmiyle 13. Altın Koza'da En İyi Kurgu ödülü aldı. 2019'da FluTV YouTube kanalını kurarak dijital medya alanında da aktif hale geldi.",
        courseTitle: "Temel Sanat Eğitimi",
        courseDescription: "Yönetmen, fotoğrafçı ve akademisyen İlker Canikligil'in hazırladığı bu derste, sanatın temel bileşenlerini keşfe çıkıyoruz. Denge, form, ışık, renk ve hareket gibi unsurların sanat eserlerindeki rolünü ele alırken, videoyu bir sanat formu olarak masaya yatırıyoruz.",
        courseLink: "/ders/temel-sanat/temel-sanat-egitimi",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&q=80&crop=faces",
        universities: [
            "Marmara Üniversitesi Sinema TV Bölümü",
            "İstanbul Bilgi Üniversitesi",
        ],
        works: [
            { title: "Nöbetçi", type: "film" },
            { title: "Ağaç", type: "film" },
            { title: "Uçmak İstiyorum", type: "film" },
            { title: "Kedi Gözü", type: "film" },
            { title: "Simulacra", type: "film" },
            { title: "Gen", type: "film" },
            { title: "Dijital Video ile Sinema", publisher: "Alfa Basım Yayım", type: "book" },
            { title: "Göz Kırparken (W. Murch, Çeviri)", publisher: "Jules Verne Yayınları", type: "translation" },
            { title: "CONTRA Contemporary Turkish Art Fair — Londra", type: "exhibition" },
            { title: "More is Less — Zorlu Center PSM", type: "exhibition" },
            { title: "Contemporary Istanbul Fuarı", type: "exhibition" },
        ],
        social: {
            twitter: "https://x.com/ilkercnklgl",
            instagram: "https://www.instagram.com/ilkercnklgl/",
            linkedin: "https://www.linkedin.com/in/ilker-canikligil/",
            youtube: "https://www.youtube.com/@FluTV",
        },
    },
    {
        slug: "nevzat-kaya",
        firstName: "Nevzat",
        lastName: "Kaya",
        title: "Karşılaştırmalı Edebiyat Uzmanı",
        field: "Edebiyat & Mitoloji",
        fieldColor: "#FFBC0B",
        shortBio: "Uzmanlık Alanı Klasik Yunan Kültürünün 19. ve 20. Yüzyıl Batı Edebiyatlarında Alımlanışı olan Nevzat Kaya, Edebiyatta cinsiyet, mitler ve antihümanosantrik dinamikler ile ilgili araştırmalar yapmaktadır.",
        longBio: "1968 İzmir doğumlu olan Nevzat Kaya, eğitimini Almanya ve Türkiye'de tamamlamış, Batı dilleri ve edebiyatı alanında uzmanlaşmış bir akademisyendir. Karşılaştırmalı edebiyat, klasik kültür ve modern edebiyat ilişkileri üzerine çalışmalarıyla tanınır. Edebiyatta cinsiyet, mit ve insan-merkezcilik karşıtı yaklaşımlar üzerine derinlikli araştırmalar yapan entelektüel bir yazardır.",
        courseTitle: "Mitolojiye Giriş",
        courseDescription: "Nevzat Kaya hazırladığı bu derste, kültürün kendi temelini teşkil eden kadim mitleri reddedip yerine nasıl \"aydınlanmacı\" ve adeta \"eskiyi\" tedavi edici pragmatik ve opportunist mitler inşa edilmeye çalışıldığını göstermeyi amaçlıyor. Bunu yaparken mitolojik ve edebi metinlerden faydalanıyor.",
        courseLink: "/ders/mitoloji/mitolojiye-giris",
        image: "/images/instructors/nevzat-kaya-hero.webp",
        universities: [
            "Ege Üniversitesi, Edebiyat Fakültesi",
            "Universitaet des Saarlandes",
            "Dokuz Eylül Üniversitesi, Karşılaştırmalı Edebiyat",
            "Almanya Paderborn Üniversitesi, Kültürbilimsel Antropoloji",
        ],
        works: [
            { title: "Der Gott des Grotesken", publisher: "Ege Üniversitesi Yayınları, 1999", type: "book" },
            { title: "Natur", publisher: "Ege Üniversitesi Yayınları", type: "book" },
        ],
        social: {
            twitter: "https://x.com/japetos",
            instagram: "https://www.instagram.com/japetos/",
            linkedin: "https://www.linkedin.com/in/nevzat-kaya-7456b38a/",
            youtube: "https://www.youtube.com/cultureclubtv",
            academicProfile: "https://avesis.deu.edu.tr/nevzat.kaya/yayinlar",
        },
    },
    {
        slug: "omer-aygun",
        firstName: "Ömer",
        lastName: "Aygün",
        title: "Antik Felsefe Uzmanı",
        field: "Felsefe",
        fieldColor: "#10B981",
        shortBio: "Ömer Aygün bir Antik Felsefe uzmanıdır. 8 Nisan 1975'te New York'ta doğmuştur. 2008'den beri Galatasaray Üniversitesi Felsefe Bölümü'nde ders ve araştırmalarını sürdürmektedir.",
        longBio: "Ömer Aygün bir Antik Felsefe uzmanıdır. 8 Nisan 1975'te New York'ta doğmuştur. İstanbul Üniversitesi Fransız Dili ve Edebiyatı Bölümü'nde lisans, aynı bölümde yüksek lisans, ayrıca Galatasaray Üniversitesi Felsefe Bölümü'nde ayrı bir yüksek lisans eğitimini tamamladıktan sonra doktorasını A.B.D.'de Pennsylvania Eyalet Üniversitesi'nde tamamlamıştır. Aristoteles'te logos hakkındaki doktora tezini sonradan kitaplaştırarak 2016'da Included Middle – Logos in Aristotle başlığıyla Northwestern Üniversitesi Yayınları'ndan yayınlamıştır. 1994-1999 yılları arasında Fazıl Hüsnü Dağlarca'ya yazmanlık yapan Aygün, felsefenin yanısıra, şiirle, dilbilimle, Eski Yunan elyazmalarıyla, yayıncılıkla, çeviriyle yakından meşgul olmuştur.",
        courseTitle: "Felsefeye Giriş",
        courseDescription: "Ömer Aygün bu derste felsefe için giriş ve çıkış kapıları tanıtıyor. Felsefeyi, ayrıcalıklılara özgü beyaz mermer sütunlu kutsal bir tapınak gibi gezilecek bir heykel galerisi değil, çok girişli bir meydan gibi almayı amaçlıyor.",
        courseLink: "/ders/felsefe/felsefeye-giris",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&q=80&crop=faces",
        universities: [
            "İstanbul Üniversitesi",
            "Galatasaray Üniversitesi",
            "Harvard Üniversitesi",
            "Sorbonne Paris Üniversitesi",
            "Münih Ludwig-Maximilian Üniversitesi",
            "Kentucky Üniversitesi",
            "Utrecht Üniversitesi",
            "Groningen Üniversitesi",
        ],
        works: [
            { title: "Rimbaud", publisher: "Çeviri (Yves Bonnefoy)", type: "translation" },
            { title: "Yüzleşmeler", publisher: "Çeviri (Henri Michaux)", type: "translation" },
            { title: "Taş Gün", publisher: "Yapı Kredi Yayınları", type: "poetry" },
            { title: "Olasılık Dışındaki", publisher: "Çeviri (Yves Bonnefoy, Deneme)", type: "translation" },
            { title: "Profil", publisher: "Çeviri (Stéphane Mallarmé)", type: "translation" },
            { title: "Algılanan Dünya", publisher: "Çeviri (Maurice Merleau-Ponty)", type: "translation" },
        ],
        social: {
            twitter: "https://x.com/omeraygungsu",
            instagram: "https://www.instagram.com/omer.orhan.aygun/",
            academicProfile: "https://avesis.gsu.edu.tr/oaygun",
        },
    },
    {
        slug: "omer-gemalmaz",
        firstName: "Ömer",
        lastName: "Gemalmaz",
        title: "Siyaset Bilimci",
        field: "Siyaset Bilimi",
        fieldColor: "#64748B",
        shortBio: "Akademik hayatına 2013 yılında Boğaziçi Üniversitesi Siyaset Bilimi ve Uluslararası İlişkiler bölümüyle başlayan Ömer Gemalmaz, Sciences Po Paris'de doktorasına devam etmektedir.",
        longBio: "Akademik hayatı tamamen bir tesadüf sonucu 2013 yılında Boğaziçi Üniversitesi Siyaset Bilimi ve Uluslararası İlişkiler bölümüne girmesiyle başladı. Derslere girdikçe alana dair hem yatkınlığını hem de büyük bir ilgisi olduğunu fark etti. Sabancı Üniversitesi'nde siyaset bilimi yüksek lisansını bitirdikten sonra Sciences Po Paris'de yine aynı alanda doktoraya başladı. 2019'dan beri aktif bir şekilde YouTube'da sosyal bilimlere dair eğitici içerikler hazırlıyor. Doktora tezinde Rusya-Ukrayna Savaşı'nın Avrupa'daki seçmen davranışlarına etkisini çalışıyor.",
        courseTitle: "İdeolojiler",
        courseDescription: "Siyaset biliminin temel kavramlarını ve tartışmalarını herkesin rahatça içselleştirebileceği şekilde anlatmak amacıyla yola çıkılan bu derste; siyasete dair en çok ilgilendiğimiz konu olan ve fikirlerin hangi şartlarda ortaya çıktığını tarihsel süreç içerisinde izleyebileceğimiz siyasi ideolojiler konusunu ele alıyoruz.",
        courseLink: "/ders/siyaset-bilimi/ideoloji",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&q=80&crop=faces",
        universities: [
            "Boğaziçi Üniversitesi",
            "Sabancı Üniversitesi",
            "Sciences Po Paris",
        ],
        works: [],
        social: {
            twitter: "https://x.com/omergemalmaz",
            instagram: "https://www.instagram.com/omergemalmaz/",
        },
    },
];

export function getInstructorBySlug(slug: string): Instructor | undefined {
    return instructors.find((i) => i.slug === slug);
}

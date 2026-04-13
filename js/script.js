document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Header & Back to Top logic
    const header = document.querySelector('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            header.style.backgroundColor = 'rgba(11, 50, 77, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
            header.style.backgroundColor = 'rgba(11, 50, 77, 0.95)';
        }

        // Back to top Visibility
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Interactive Number Counter Animation for Statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const runCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-val'));
            const speed = 200; // Counter speed
            
            stat.innerText = '0';
            
            const updateCount = () => {
                const countText = stat.innerText.replace(/\D/g, '');
                const count = parseInt(countText) || 0;
                const inc = Math.max(1, Math.ceil(target / speed));

                if (count < target) {
                    stat.innerText = `+${count + inc}`;
                    setTimeout(updateCount, 20);
                } else {
                    stat.innerText = `+${target}`;
                    stat.classList.add('pulse');
                    setTimeout(() => {
                        stat.classList.remove('pulse');
                    }, 500);
                }
            };
            updateCount();
        });
    };

    // Smooth reveal animation and trigger for counters
    const fadeElements = document.querySelectorAll(
        '.section-title, .about-text, .sectors-intro, .companies-intro, .contact-text, ' +
        '.stat-card, .sector-card, .company-card, .value-card, ' +
        '.about-content .btn, .sectors-action .btn, .companies-action .btn, .contact-content .btn'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // If it's a stat card container, run counters once
                if (entry.target.classList.contains('stat-card') && !counted) {
                    runCounters();
                    counted = true; 
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
        setTimeout(() => observer.observe(el), index % 4 * 100);
    });

    // --- Language Switcher Logic ---

    const translations = {
        ar: {
            page_title: "المجموعة الوطنية القابضة - الرئيسية",
            nav_home: "الرئيسية",
            nav_about: "من نحن",
            nav_partners: "شركائنا",
            nav_projects: "مشاريعنا",
            nav_contact: "تواصل معنا",
            hero_subtitle: "ALWATANIA HOLDING GROUP",
            hero_title: "المجموعة الوطنية القابضة",
            hero_desc: "تمكين التقدم الاقتصادي في العراق<br>مجموعة استثمارية تقود مشاريع استراتيجية عبر شبكة واسعة من الشركات في قطاعا متعددة، وتركز على تطوير الاقتصاد الوطني وبناء مستقبل مستدام.",
            btn_explore: "استكشف مشاريعنا",
            btn_contact_hero: "تواصل معنا",
            about_title: "من نحن",
            about_desc: "تُعد المجموعة الوطنية القابضة واحدة من الكيانات الاستثمارية البارزة في العراق، حيث تدير شبكة واسعة من الشركات العاملة في قطاعات متعددة تشمل الصناعة، البنية التحتية، التكنولوجيا، التعليم، والطاقة.<br><br>تعتمد المجموعة على رؤية استراتيجية وإدارة فعالة تهدف إلى دعم التنمية الاقتصادية، وتعزيز الاستدامة، وبناء مشاريع ذات أثر حقيقي في المجتمع.",
            btn_read_more: "اقرأ المزيد",
            stats_title: "إحصائيات الشركة",
            stat_subs: "شركة تابعة",
            stat_sectors: "قطاعات استثمارية",
            stat_employees: "موظف",
            stat_years: "سنوات خبرة",
            sectors_title: "القطاعات الاستثمارية",
            sectors_desc: "تعمل المجموعة الوطنية القابضة عبر مجموعة من القطاعات الحيوية التي تساهم في دعم الاقتصاد الوطني وتعزيز التنمية المستدامة.",
            sector_1: "الإنشاءات والبنية التحتية",
            sector_2: "الصناعات الغذائية",
            sector_3: "الزراعة والمعدات الزراعية",
            sector_4: "الطاقة والموارد",
            sector_5: "التكنولوجيا والتحول الرقمي",
            sector_6: "التعليم والتدريب",
            sector_7: "الخدمات اللوجستية والنقل",
            sector_8: "القطاع الصحي",
            btn_view_projects: "عرض المشاريع",
            companies_title: "شركاتنا",
            companies_desc: "تضم المجموعة الوطنية القابضة شبكة واسعة من الشركات التابعة التي تعمل في مجالات متنوعة وتشكل منظومة متكاملة من الخبرات والاستثمارات.<br>ومن أبرز هذه الشركات:",
            company_1: "شركة الأويس",
            company_2: "شركة التعاون الغذائي المحدودة",
            company_3: "مصرف الجنوب الإسلامي",
            company_4: "شركة العاصم المحدودة",
            company_5: "شركة صدى العراق",
            company_6: "شركة مستقبل الإعمار المحدودة",
            company_7: "شركة الأطلس للتكنولوجيا",
            company_8: "الشركة الوطنية لتكنولوجيا المعلومات",
            btn_view_companies: "عرض جميع الشركات",
            values_title: "قيمنا",
            val_title_1: "النزاهة",
            val_desc_1: "نلتزم بالشفافية والصدق في جميع أعمالنا.",
            val_title_2: "التمكين",
            val_desc_2: "ندعم تطوير قدرات موظفينا وشركائنا لتحقيق أفضل النتائج.",
            val_title_3: "الاستدامة",
            val_desc_3: "نسعى لتحقيق توازن بين النجاح الاقتصادي والمسؤولية الاجتماعية.",
            val_title_4: "المسؤولية",
            val_desc_4: "نؤمن بدورنا في خدمة المجتمع ودعم التنمية الوطنية.",
            val_title_5: "التميز",
            val_desc_5: "نحرص على تقديم أعلى معايير الجودة والأداء.",
            val_title_6: "الابتكار",
            val_desc_6: "نشجع التفكير الإبداعي وتطوير الحلول المستقبلية.",
            contact_title: "تواصل معنا",
            contact_desc: "نرحب بالتعاون مع المؤسسات والشركاء الذين يسعون إلى تطوير مشاريع نوعية تساهم في دعم الاقتصاد الوطني وبناء مستقبل أفضل.",
            btn_contact: "تواصل معنا",
            logo_alt: "المجموعة الوطنية القابضة",
            footer_address: "ساحة الواثق، بغداد، العراق",
            footer_links_title: "روابط سريعة",
            footer_social_title: "تابعنا",
            footer_social_desc: "كن على تواصل دائم معنا عبر منصات التواصل الاجتماعي.",
            footer_copyright: "© 2026 المجموعة الوطنية القابضة. جميع الحقوق محفوظة."
        },
        en: {
            page_title: "Alwatania Holding Group - Home",
            nav_home: "Home",
            nav_about: "About",
            nav_partners: "Partners",
            nav_projects: "Projects",
            nav_contact: "Contact",
            hero_subtitle: "ALWATANIA HOLDING GROUP",
            hero_title: "Empowering Economic Progress in Iraq",
            hero_desc: "An investment group leading strategic projects through a wide network of companies across multiple sectors, with a strong focus on developing the national economy and building a sustainable future.",
            btn_explore: "Explore Our Projects",
            btn_contact_hero: "Contact Us",
            about_title: "About Us",
            about_desc: "Alwatania Holding Group is considered one of the prominent investment entities in Iraq, managing a wide network of companies operating across multiple sectors including industry, infrastructure, technology, education, and energy.<br><br>The group operates with a strategic vision and effective management aimed at supporting economic development, enhancing sustainability, and building projects that create real impact in society.",
            btn_read_more: "Read More",
            stats_title: "Company Statistics",
            stat_subs: "Subsidiaries",
            stat_sectors: "Investment Sectors",
            stat_employees: "Employees",
            stat_years: "Years of Experience",
            sectors_title: "Investment Sectors",
            sectors_desc: "Alwatania Holding Group operates across a range of vital sectors that contribute to supporting the national economy and strengthening sustainable development.",
            sector_1: "Construction & Infrastructure",
            sector_2: "Food Industries",
            sector_3: "Agriculture & Equipment",
            sector_4: "Energy & Resources",
            sector_5: "Technology & Digital Transformation",
            sector_6: "Education & Training",
            sector_7: "Logistics & Transport",
            sector_8: "Health Sector",
            btn_view_projects: "View Projects",
            companies_title: "Our Companies",
            companies_desc: "Alwatania Holding Group includes a wide network of affiliated companies operating in diverse fields, forming an integrated ecosystem of expertise and investments.<br>Key companies include:",
            company_1: "Al-Awaes Company",
            company_2: "Al-Taawun Food Co.",
            company_3: "South Islamic Bank",
            company_4: "Al-Assem Co.",
            company_5: "Sada Al-Iraq",
            company_6: "Mustaqbal Al-Imar Co.",
            company_7: "Atlas Technology",
            company_8: "National IT Company",
            btn_view_companies: "View All Companies",
            values_title: "Our Values",
            val_title_1: "Integrity",
            val_desc_1: "We are committed to transparency and honesty in all our actions.",
            val_title_2: "Empowerment",
            val_desc_2: "We support the development of our employees and partners to achieve the best results.",
            val_title_3: "Sustainability",
            val_desc_3: "We strive to achieve a balance between economic success and social responsibility.",
            val_title_4: "Responsibility",
            val_desc_4: "We believe in our role in serving the society and supporting national development.",
            val_title_5: "Excellence",
            val_desc_5: "We ensure to provide the highest standards of quality and performance.",
            val_title_6: "Innovation",
            val_desc_6: "We encourage creative thinking and developing future solutions.",
            contact_title: "Contact Us",
            contact_desc: "We welcome collaboration with institutions and partners who seek to develop impactful projects that contribute to strengthening the national economy and building a better future.",
            btn_contact: "Contact Us",
            logo_alt: "Alwatania Holding Group",
            footer_address: "Al-Wathiq Square, Baghdad, Iraq",
            footer_links_title: "Quick Links",
            footer_social_title: "Follow Us",
            footer_social_desc: "Stay connected with us through social media platforms.",
            footer_copyright: "© 2026 Alwatania Holding Group. All rights reserved."
        }
    };

    const langToggle = document.getElementById('langToggle');
    const langSpan = langToggle.querySelector('span');

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langSpan.innerText = lang === 'ar' ? 'EN' : 'AR';
        localStorage.setItem('preferredLang', lang);

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'IMG') {
                    el.alt = translations[lang][key];
                } else if (el.tagName === 'TITLE') {
                    document.title = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
    };

    // Initialize Language
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    setLanguage(savedLang);

    langToggle.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });
});

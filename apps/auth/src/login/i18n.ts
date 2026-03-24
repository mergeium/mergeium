/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: { backToApplication: "Back to Application", backToLogin: "Back to Login", proceedWithAction: "Continue", noAccount: "Don't have an account?", doRegister: "Sign up", loginAccountTitle: "Welcome Back" },
        tr: { backToApplication: "Uygulamaya Dön", backToLogin: "Girişe Dön", proceedWithAction: "Devam Et", noAccount: "Hesabınız yok mu?", doRegister: "Kayıt ol", loginAccountTitle: "Tekrar Hoş Geldiniz" },
        de: { backToApplication: "Zurück zur Anwendung", backToLogin: "Zurück zur Anmeldung", proceedWithAction: "Weiter", noAccount: "Noch kein Konto?", doRegister: "Registrieren", loginAccountTitle: "Willkommen zurück" },
        fr: { backToApplication: "Retour à l'application", backToLogin: "Retour à la connexion", proceedWithAction: "Continuer", noAccount: "Pas encore de compte ?", doRegister: "S'inscrire", loginAccountTitle: "Bon retour" },
        es: { backToApplication: "Volver a la aplicación", backToLogin: "Volver al inicio de sesión", proceedWithAction: "Continuar", noAccount: "¿No tienes cuenta?", doRegister: "Regístrate", loginAccountTitle: "Bienvenido de nuevo" },
        it: { backToApplication: "Torna all'applicazione", backToLogin: "Torna al login", proceedWithAction: "Continua", noAccount: "Non hai un account?", doRegister: "Registrati", loginAccountTitle: "Bentornato" },
        pt: { backToApplication: "Voltar à aplicação", backToLogin: "Voltar ao login", proceedWithAction: "Continuar", noAccount: "Não tem conta?", doRegister: "Registar", loginAccountTitle: "Bem-vindo de volta" },
        "pt-BR": { backToApplication: "Voltar ao aplicativo", backToLogin: "Voltar ao login", proceedWithAction: "Continuar", noAccount: "Não tem uma conta?", doRegister: "Cadastre-se", loginAccountTitle: "Bem-vindo de volta" },
        nl: { backToApplication: "Terug naar applicatie", backToLogin: "Terug naar inloggen", proceedWithAction: "Doorgaan", noAccount: "Nog geen account?", doRegister: "Registreren", loginAccountTitle: "Welkom terug" },
        ja: { backToApplication: "アプリケーションに戻る", backToLogin: "ログインに戻る", proceedWithAction: "続行", noAccount: "アカウントをお持ちでないですか？", doRegister: "登録", loginAccountTitle: "おかえりなさい" },
        "zh-CN": { backToApplication: "返回应用", backToLogin: "返回登录", proceedWithAction: "继续", noAccount: "没有账户？", doRegister: "注册", loginAccountTitle: "欢迎回来" },
        "zh-TW": { backToApplication: "返回應用", backToLogin: "返回登入", proceedWithAction: "繼續", noAccount: "沒有帳戶？", doRegister: "註冊", loginAccountTitle: "歡迎回來" },
        ru: { backToApplication: "Вернуться в приложение", backToLogin: "Вернуться к входу", proceedWithAction: "Продолжить", noAccount: "Нет аккаунта?", doRegister: "Зарегистрироваться", loginAccountTitle: "С возвращением" },
        uk: { backToApplication: "Повернутися до додатку", backToLogin: "Повернутися до входу", proceedWithAction: "Продовжити", noAccount: "Немає облікового запису?", doRegister: "Зареєструватися", loginAccountTitle: "З поверненням" },
        pl: { backToApplication: "Wróć do aplikacji", backToLogin: "Wróć do logowania", proceedWithAction: "Kontynuuj", noAccount: "Nie masz konta?", doRegister: "Zarejestruj się", loginAccountTitle: "Witaj ponownie" },
        cs: { backToApplication: "Zpět do aplikace", backToLogin: "Zpět k přihlášení", proceedWithAction: "Pokračovat", noAccount: "Nemáte účet?", doRegister: "Zaregistrovat se", loginAccountTitle: "Vítejte zpět" },
        sk: { backToApplication: "Späť do aplikácie", backToLogin: "Späť na prihlásenie", proceedWithAction: "Pokračovať", noAccount: "Nemáte účet?", doRegister: "Zaregistrovať sa", loginAccountTitle: "Vitajte späť" },
        sv: { backToApplication: "Tillbaka till applikationen", backToLogin: "Tillbaka till inloggning", proceedWithAction: "Fortsätt", noAccount: "Har du inget konto?", doRegister: "Registrera dig", loginAccountTitle: "Välkommen tillbaka" },
        no: { backToApplication: "Tilbake til applikasjonen", backToLogin: "Tilbake til innlogging", proceedWithAction: "Fortsett", noAccount: "Har du ikke en konto?", doRegister: "Registrer deg", loginAccountTitle: "Velkommen tilbake" },
        da: { backToApplication: "Tilbage til applikationen", backToLogin: "Tilbage til login", proceedWithAction: "Fortsæt", noAccount: "Har du ikke en konto?", doRegister: "Opret konto", loginAccountTitle: "Velkommen tilbage" },
        fi: { backToApplication: "Takaisin sovellukseen", backToLogin: "Takaisin kirjautumiseen", proceedWithAction: "Jatka", noAccount: "Eikö sinulla ole tiliä?", doRegister: "Rekisteröidy", loginAccountTitle: "Tervetuloa takaisin" },
        hu: { backToApplication: "Vissza az alkalmazáshoz", backToLogin: "Vissza a bejelentkezéshez", proceedWithAction: "Folytatás", noAccount: "Nincs fiókja?", doRegister: "Regisztráció", loginAccountTitle: "Üdv újra" },
        el: { backToApplication: "Επιστροφή στην εφαρμογή", backToLogin: "Επιστροφή στη σύνδεση", proceedWithAction: "Συνέχεια", noAccount: "Δεν έχετε λογαριασμό;", doRegister: "Εγγραφή", loginAccountTitle: "Καλώς ήρθατε ξανά" },
        ar: { backToApplication: "العودة إلى التطبيق", backToLogin: "العودة إلى تسجيل الدخول", proceedWithAction: "متابعة", noAccount: "ليس لديك حساب؟", doRegister: "سجّل", loginAccountTitle: "مرحبًا بعودتك" },
        fa: { backToApplication: "بازگشت به برنامه", backToLogin: "بازگشت به ورود", proceedWithAction: "ادامه", noAccount: "حساب ندارید؟", doRegister: "ثبت‌نام", loginAccountTitle: "خوش آمدید" },
        ca: { backToApplication: "Tornar a l'aplicació", backToLogin: "Tornar a l'inici de sessió", proceedWithAction: "Continuar", noAccount: "No tens compte?", doRegister: "Registra't", loginAccountTitle: "Benvingut de nou" },
        lt: { backToApplication: "Grįžti į programą", backToLogin: "Grįžti prie prisijungimo", proceedWithAction: "Tęsti", noAccount: "Neturite paskyros?", doRegister: "Registruotis", loginAccountTitle: "Sveiki sugrįžę" },
        lv: { backToApplication: "Atgriezties lietotnē", backToLogin: "Atgriezties pie pieteikšanās", proceedWithAction: "Turpināt", noAccount: "Nav konta?", doRegister: "Reģistrēties", loginAccountTitle: "Laipni lūdzam atpakaļ" },
        ka: { backToApplication: "აპლიკაციაში დაბრუნება", backToLogin: "შესვლაზე დაბრუნება", proceedWithAction: "გაგრძელება", noAccount: "არ გაქვთ ანგარიში?", doRegister: "რეგისტრაცია", loginAccountTitle: "კეთილი იყოს თქვენი დაბრუნება" },
        th: { backToApplication: "กลับไปยังแอปพลิเคชัน", backToLogin: "กลับไปยังหน้าเข้าสู่ระบบ", proceedWithAction: "ดำเนินการต่อ", noAccount: "ยังไม่มีบัญชี?", doRegister: "สมัครสมาชิก", loginAccountTitle: "ยินดีต้อนรับกลับ" },
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };

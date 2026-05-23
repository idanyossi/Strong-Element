import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle, Lightbulb, Shield, Target } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "יחסי אנוש",
    text: "אנחנו בונים קשרים, לא רשימות תפוצה. עסקים עושים עם אנשים, לא עם עסקים.",
  },
  {
    icon: Target,
    title: "בחינה משפטית",
    text: "אנחנו מפרקים כל עסקה לגורמים, מזהים בעיות משפטיות לפני שהן מתרחשות ומונעים אותן מראש.",
  },
  {
    icon: Lightbulb,
    title: "שיווק יצירתי",
    text: "אנחנו לא מפרסמים נכסים, אנחנו מספרים עליהם סיפור שגורם לשוק לעצור את הנשימה.",
  },
  {
    icon: Award,
    title: "מצוינות בשטח",
    text: "שילוב של ניסיון, מומחיות משפטית, הבנת שוק ויכולת ביצוע מוכחת.",
  },
];

const services = [
  "תיווך נדל\"ן בתל אביב-יפו",
  "שיווק פרויקטים למגורים, מסחר ותעסוקה",
  "ניהול מתחמי התחדשות עירונית",
  "ליווי משפטי ועסקי בתחום הנדל\"ן המניב",
];

export default function About() {
  return (
    <div className="bg-[#f4f4f4]">
      <section className="overflow-hidden bg-black text-white">
        <div className="relative flex min-h-[650px] items-center px-7 pb-20 pt-32 sm:px-10 lg:min-h-[760px] lg:px-14 lg:pt-36">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 mx-auto w-full max-w-[1760px]">
            <p className="mb-4 text-sm font-black text-white/75">ABOUT US</p>
            <h1 className="max-w-5xl text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              נדל"ן הוא עסק של אנשים
            </h1>
            <blockquote className="mt-6 max-w-3xl text-lg font-bold leading-relaxed text-white/85">
              "100% of customers are people. 100% of employees are people. If
              you don't understand people, you don't understand business."
              <span className="block text-sm text-white/65">(Simon Sinek)</span>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-black text-[#082b86]">החברה</p>
            <h2 className="text-5xl font-black leading-none tracking-[-0.055em] text-[#082b86] sm:text-6xl">
              Strong Element בע"מ
            </h2>
            <div className="mt-7 space-y-5 text-lg font-medium leading-relaxed text-slate-600">
              <p>
                חברת Strong Element בע"מ הינה חברת תיווך ושיווק פרויקטים
                בישראל. החברה עוסקת ב-4 תחומים עיקריים: תיווך נדל"ן בתל
                אביב-יפו, שיווק פרויקטים, ניהול מתחמי התחדשות עירונית וליווי
                משפטי ועסקי בתחום הנדל"ן המניב.
              </p>
              <p>
                את החברה מוביל צוות מקצועי אשר מביא להצלחת החברה לאורך השנים.
                החברה ביצעה מספר עסקאות מהגדולות בשוק התל אביבי בהיקפים
                מרשימים בגודלם.
              </p>
              <p>
                העבודה הממושכת שלנו בשטח, בין הרחובות של תל אביב וערי המרכז,
                היא הרבה מעבר ל"סגירת עסקאות". היא העין החדה שלנו כמשפטנים
                וכאנשי אסטרטגיה, שמאפשרת לנו לפרק לגורמים כל נכס, להבין לעומק
                את פוטנציאל ההשבחה והתכנון בעיר, ולזהות אתגרים עוד לפני שהם
                הופכים למכשול.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85"
              alt="משרד מודרני"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white px-6 py-5">
              <p className="text-4xl font-black tracking-[-0.05em] text-[#082b86]">
                since 1985
              </p>
              <p className="text-sm font-black text-slate-500">
                לבדוק עם צחי
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-black text-[#082b86]">
              השיטה שלנו
            </p>
            <h2 className="text-5xl font-black leading-none tracking-[-0.055em] text-[#082b86] sm:text-6xl">
              איכות בלתי מתפשרת בכל שלב
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
              עבורנו, נדל"ן הוא לא רק קירות ובטון - הוא חלק מהמרקם החי של
              העיר. האיכות שלנו באה לידי ביטוי בכל שלב: מהדיוק התכנוני והבדיקה
              המשפטית המקיפה, ועד לקשר האישי והרציף עם בעלי הנכסים והדיירים.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-white p-7"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#082b86] text-white">
                  <v.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-black tracking-[-0.035em] text-[#082b86]">
                  {v.title}
                </h3>
                <p className="mt-3 font-medium leading-relaxed text-slate-600">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 lg:p-10">
            <h2 className="text-4xl font-black tracking-[-0.05em] text-[#082b86]">
              תחומי פעילות
            </h2>
            <div className="mt-8 space-y-4">
              {services.map((item) => (
                <div key={item} className="rounded-2xl bg-[#f4f4f4] p-5">
                  <p className="text-lg font-black text-[#082b86]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-[#082b86] text-white">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85"
              alt="נכס"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-8 lg:p-10">
              <h2 className="text-4xl font-black tracking-[-0.05em]">
                יחידת עילית לעסקה שלך
              </h2>
              <p className="mt-6 font-bold leading-relaxed text-white/80">
                השילוב בין הליווי המשפטי הצמוד, היצירתיות השיווקית וההצלחות
                המוכחות שלנו, הוא מה שנותן ללקוחות שלנו את השקט הנפשי. הם יודעים
                שמאחוריהם עומדת יחידת עילית שמנהלת את הסיכונים, ממקסמת את
                הרווחים ושומרת על האינטרסים שלהם בסטנדרט הגבוה ביותר.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "ליווי משפטי צמוד",
                  "יצירתיות שיווקית",
                  "ניהול סיכונים",
                  "מקסום רווחים",
                  "קשר אנושי חזק",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                    <p className="font-bold text-white/80">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-black text-white">
                כי בסוף, עסקים עושים עם אנשים - ואנחנו כאן כדי לוודא שהאנשים
                שלנו תמיד מנצחים.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

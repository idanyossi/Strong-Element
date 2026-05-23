import React from "react";

export default function Accessibility() {
  return (
    <div className="bg-[#f4f4f4] pt-24">
      <section className="px-5 pb-8 pt-8 sm:px-8 lg:pt-14">
        <div className="mx-auto max-w-[1760px] rounded-[34px] bg-[#082b86] px-7 py-14 text-white sm:px-10 lg:rounded-[44px] lg:px-14 lg:py-20">
          <p className="mb-4 text-sm font-black text-white/75">
            עדכון אחרון: מרץ 2026
          </p>
          <h1 className="text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            הצהרת נגישות
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-bold leading-relaxed text-white/75">
            חברת Strong Element Ltd רואה חשיבות עליונה במתן שירות שוויוני,
            מכובד ונגיש לכלל לקוחותיה, לרבות אנשים עם מוגבלות.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 pt-8 sm:px-8 lg:pb-28">
        <div className="mx-auto max-w-5xl space-y-4">
          <article className="rounded-2xl bg-white p-7">
            <h2 className="text-2xl font-black text-[#082b86]">
              1. נגישות אתר האינטרנט
            </h2>
            <p className="mt-3 font-medium leading-relaxed text-slate-600">
              אתר זה הונגש בהתאם להוראות תקן ישראלי ת"י 5568 לנגישות תכנים
              באינטרנט ברמת AA, ובהתאם למסמך WCAG 2.1 הבינלאומי.
            </p>
            <ul className="mt-4 list-disc space-y-2 pr-6 font-medium leading-relaxed text-slate-600">
              <li>ניווט מלא באמצעות מקלדת בלבד.</li>
              <li>תאימות לקוראי מסך כגון NVDA ו-Jaws.</li>
              <li>תגיות Alt-Text לתמונות משמעותיות.</li>
              <li>הגדלת גופנים וניגודיות ללא פגיעה בתצוגת המידע.</li>
              <li>מבנה היררכי וסמנטי עקבי בכותרות ובתוכן.</li>
              <li>טפסים עם תוויות ברורות והודעות שגיאה נגישות.</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-7">
            <h2 className="text-2xl font-black text-[#082b86]">
              2. סייגים לנגישות
            </h2>
            <p className="mt-3 font-medium leading-relaxed text-slate-600">
              אנו משקיעים מאמצים רבים בתחזוקת נגישות האתר. ייתכן כי דפים
              מסוימים או קבצים כגון PDF ישנים של תוכניות בניין או מסמכים
              משפטיים חיצוניים טרם הונגשו במלואם. רכיבים המוטמעים מצדדים
              שלישיים, כגון מפות Google או סרטוני YouTube, עשויים להיות מושפעים
              ממגבלות הטכנולוגיה של אותם ספקים.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-7">
            <h2 className="text-2xl font-black text-[#082b86]">
              3. נגישות פיזית - משרדי החברה
            </h2>
            <ul className="mt-4 list-disc space-y-2 pr-6 font-medium leading-relaxed text-slate-600">
              <li>משרדנו ממוקם ברחוב בן יהודה 191 א', תל אביב.</li>
              <li>קיימת כניסה נגישה למבנה.</li>
              <li>אין שירותים נגישים במשרדנו.</li>
              <li>קיימת חניית נכים בסמיכות למשרדנו וברחוב בן יהודה.</li>
              <li>צוות המשרד זמין להענקת סיוע אישי בתיאום מראש.</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-7">
            <h2 className="text-2xl font-black text-[#082b86]">
              4. רכז נגישות ודיווח על תקלות
            </h2>
            <p className="mt-3 font-medium leading-relaxed text-slate-600">
              אם נתקלתם בקושי בגלישה באתר, או אם יש לכם הערה בנושא הנגישות,
              נשמח לשמוע מכם כדי לשפר את השירות.
            </p>
            <ul className="mt-4 space-y-2 font-medium text-slate-600">
              <li>שם: גיא ברוך</li>
              <li>טלפון: 0548078079</li>
              <li>דוא"ל: Guy@ha-tovim.co.il</li>
              <li>כתובת למשלוח דואר: בן יהודה 191 א', תל אביב</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

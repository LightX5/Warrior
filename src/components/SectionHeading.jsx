export const SectionHeading = ({ eyebrow, title, copy, align = "left" }) => (
  <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    <p className="section-eyebrow">{eyebrow}</p>
    <h2 className="section-title">{title}</h2>
    {copy ? <p className="section-copy mt-6 max-w-2xl">{copy}</p> : null}
  </div>
);

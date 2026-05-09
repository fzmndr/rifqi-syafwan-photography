function SectionDivider({ text = "Rifqi Syafwan Photography" }) {
  return (
    <div className="section-divider">
      <div className="section-divider-track">
        <span>{text}</span>
        <span>Visual Storytelling</span>
        <span>Wedding</span>
        <span>Portrait</span>
        <span>Brand Visual</span>
        <span>{text}</span>
        <span>Visual Storytelling</span>
        <span>Wedding</span>
        <span>Portrait</span>
        <span>Brand Visual</span>
      </div>
    </div>
  );
}

export default SectionDivider;
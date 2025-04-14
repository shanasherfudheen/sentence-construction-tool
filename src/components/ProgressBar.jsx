export default function ProgressBar({current, total}) {
    const width = ((current + 1) / total) * 100;
  return (
    <div className="progress-container">
      <div className="progress-line" style={{ width: `${width}%` }} />
    </div>
  );
}
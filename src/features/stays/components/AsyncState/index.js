import React from "react";

export default function AsyncState({ loading, error, onRetry, label = "content" }) {
  if (loading) return <div className="section"><div className="container">Loading {label}…</div></div>;
  if (error) {
    return (
      <div className="section"><div className="container">
        <p>We could not load {label}.</p>
        <button className="button-stroke" type="button" onClick={onRetry}>Try again</button>
      </div></div>
    );
  }
  return null;
}

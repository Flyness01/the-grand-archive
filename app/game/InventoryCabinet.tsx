"use client";

import { artifacts } from "../artifacts/artifactRegistry";

export function InventoryCabinet({
  artifactIds,
  onClose,
}: {
  artifactIds: string[];
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="inventory"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inventory-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="settings-panel__close"
          onClick={onClose}
          aria-label="Close inventory"
        >
          ×
        </button>
        <p className="settings-panel__eyebrow">The collection cabinet</p>
        <h2 id="inventory-title">Recovered Objects</h2>
        <div className="inventory__shelves">
          {Array.from({ length: 10 }, (_, index) => {
            const artifact = artifactIds[index]
              ? artifacts[artifactIds[index]]
              : undefined;
            return (
              <article
                className={artifact ? "inventory__slot is-filled" : "inventory__slot"}
                key={index}
              >
                {artifact ? (
                  <>
                    {artifact.id === "navigators-compass" ? (
                      <div className="compass-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "brass-lantern" ? (
                      <div className="brass-lantern-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "clockwork-gear" ? (
                      <div className="clockwork-gear-icon" aria-hidden="true">IV</div>
                    ) : artifact.id === "botanical-specimen" ? (
                      <div className="specimen-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "star-chart" ? (
                      <div className="star-chart-icon" aria-hidden="true"><i /><i /><i /></div>
                    ) : artifact.id === "leather-journal" ? (
                      <div className="journal-icon" aria-hidden="true"><i /></div>
                    ) : artifact.id === "prism-lens" ? (
                      <div className="prism-icon" aria-hidden="true"><i /></div>
                    ) : (
                      <div className="feather-icon" aria-hidden="true"><i /></div>
                    )}
                    <h3>{artifact.name}</h3>
                    <p>“{artifact.shortDescription}”</p>
                    <small>{artifact.roomOfOrigin.replaceAll("-", " ")}</small>
                  </>
                ) : (
                  <span aria-label="Empty artifact position">{index + 1}</span>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

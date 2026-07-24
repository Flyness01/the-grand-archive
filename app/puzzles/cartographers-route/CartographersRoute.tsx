"use client";

import { useMemo, useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  cartographersRouteHints,
  mapNodes,
  mapRoutes,
} from "./puzzleData";
import { validateCartographersRoute } from "./validator";

export function CartographersRoute({
  hintCount,
  onUseHint,
  onCollectReward,
  alreadySolved,
}: {
  hintCount: number;
  onUseHint: () => void;
  onCollectReward: () => void;
  alreadySolved: boolean;
}) {
  const [path, setPath] = useState<string[]>(["west-gate"]);
  const [drawerOpen, setDrawerOpen] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The compass drawer stands open." : "",
  );

  const pathSegments = useMemo(
    () =>
      path.slice(1).map((nodeId, index) => ({
        from: mapNodes.find((node) => node.id === path[index])!,
        to: mapNodes.find((node) => node.id === nodeId)!,
        order: index + 1,
      })),
    [path],
  );

  function selectNode(nodeId: string) {
    if (drawerOpen || nodeId === path.at(-1)) return;
    const last = path.at(-1);
    const connection = mapRoutes.find(
      (route) =>
        (route.from === last && route.to === nodeId) ||
        (route.to === last && route.from === nodeId),
    );
    if (!connection) {
      setFeedback("No road connects those two places.");
      return;
    }

    const nextPath = [...path, nodeId];
    setPath(nextPath);
    setFeedback("");

    if (nodeId === "archive") {
      if (validateCartographersRoute(nextPath)) {
        setDrawerOpen(true);
        setFeedback("Ink blooms along the route. A drawer releases beneath the map.");
      } else {
        setFeedback("The ink fades. One or more of the Archivist’s habits was ignored.");
        window.setTimeout(() => {
          setPath(["west-gate"]);
          setFeedback("");
        }, 4500);
      }
    }
  }

  return (
    <div className="route-puzzle">
      <div className="route-puzzle__workspace">
        <div className="margin-rules">
          <p>From the Cartographer’s margin</p>
          <ol>
            <li>Each named river was crossed once, and never twice.</li>
            <li>Two eastward roads came before the first northern turn.</li>
            <li>Avoid abandoned milestones.</li>
            <li>Stop only at lantern-marked locations.</li>
            <li>Fruit was bought just before the watch bell was heard.</li>
            <li>The final light had green glass and stood at a crossroads.</li>
          </ol>
        </div>

        <div className={`antique-map ${drawerOpen ? "is-solved" : ""}`}>
          <div className="map-water map-water--lark">River Lark</div>
          <div className="map-water map-water--grey">Greywater</div>
          <svg
            className="map-routes"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="route-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            </defs>
            {mapRoutes.map((route) => {
              const from = mapNodes.find((node) => node.id === route.from)!;
              const to = mapNodes.find((node) => node.id === route.to)!;
              const edgeId = [route.from, route.to].sort().join(":");
              return (
                <line
                  key={edgeId}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                />
              );
            })}
            {pathSegments.map((segment) => {
              const midpointX = (segment.from.x + segment.to.x) / 2;
              const midpointY = (segment.from.y + segment.to.y) / 2;
              return (
                <g className="route-segment" key={`${segment.from.id}:${segment.to.id}`}>
                  <line
                    x1={segment.from.x}
                    y1={segment.from.y}
                    x2={segment.to.x}
                    y2={segment.to.y}
                    markerEnd="url(#route-arrow)"
                  />
                  <circle cx={midpointX} cy={midpointY} r="1.9" />
                  <text x={midpointX} y={midpointY + 0.75}>
                    {segment.order}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="map-legend" aria-hidden="true">
            <span><i className="legend-road" /> Available road</span>
            <span><i className="legend-route" /> Your route</span>
            <small>Arrows and numbers show travel order</small>
          </div>

          {mapNodes.map((node) => {
            const chosenIndex = path.indexOf(node.id);
            return (
              <button
                key={node.id}
                className={`map-node map-node--${node.kind} ${
                  chosenIndex >= 0 ? "is-chosen" : ""
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => selectNode(node.id)}
                aria-label={`${node.name}. ${node.description}${
                  chosenIndex >= 0 ? ` Route stop ${chosenIndex + 1}.` : ""
                }`}
              >
                <i aria-hidden="true" />
                <span>{node.name}</span>
                {chosenIndex >= 0 && <b>{chosenIndex + 1}</b>}
              </button>
            );
          })}

          <div className="compass-drawer">
            <div className="compass-icon" aria-hidden="true">
              <i />
            </div>
            <p>A brass compass waits inside.</p>
            {!alreadySolved ? (
              <button onClick={onCollectReward}>Take the compass</button>
            ) : (
              <small>The drawer is empty.</small>
            )}
          </div>
        </div>

        <div className="route-controls">
          <p aria-live="polite">{feedback || "Choose the next stop along the route."}</p>
          {!drawerOpen && (
            <button onClick={() => setPath(["west-gate"])}>Clear route</button>
          )}
        </div>
      </div>

      <HintPanel
        hints={cartographersRouteHints}
        revealedCount={hintCount}
        onReveal={onUseHint}
      />
    </div>
  );
}

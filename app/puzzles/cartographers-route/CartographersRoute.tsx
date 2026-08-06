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
    alreadySolved ? "The completed flow trace remains pinned to the board." : "",
  );

  const usedEdges = useMemo(
    () =>
      new Set(
        path.slice(1).map((nodeId, index) =>
          [path[index], nodeId].sort().join(":"),
        ),
      ),
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
      setFeedback("Those components do not communicate directly.");
      return;
    }

    const nextPath = [...path, nodeId];
    setPath(nextPath);
    setFeedback("");

    if (nodeId === "archive") {
      if (validateCartographersRoute(nextPath)) {
        setDrawerOpen(true);
        setFeedback("The request reaches the Live Service. The full flow is now documented.");
      } else {
        setFeedback("The request failed. One or more documented constraints was ignored.");
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
          <p>From the request trace notes</p>
          <ol>
            <li>Follow what happens after a user acts in the interface, then send the request out of the app.</li>
            <li>As soon as the request reaches the backend, verify permission before performing the work.</li>
            <li>Before the result reaches the live service, reshape it and pass through the final shared boundary.</li>
          </ol>
        </div>

        <div className={`antique-map ${drawerOpen ? "is-solved" : ""}`} aria-label="Interactive system architecture diagram">
          <div className="map-water map-water--lark">Client Boundary</div>
          <div className="map-water map-water--grey">Service Boundary</div>
          <svg
            className="map-routes"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
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
                  className={usedEdges.has(edgeId) ? "is-used" : ""}
                />
              );
            })}
          </svg>

          <div className="map-legend" aria-label="System flow legend">
            <span><i className="legend-road" aria-hidden="true" /> Available connection</span>
            <span><i className="legend-route" aria-hidden="true" /> Request flow</span>
          </div>

          {mapNodes.map((node) => {
            const chosenIndex = path.indexOf(node.id);
            return (
              <button
                key={node.id}
                className={`map-node map-node--${node.kind} ${
                  chosenIndex >= 0 ? "is-chosen" : ""
                } ${node.y < 30 ? "tooltip-below" : ""} ${
                  node.x < 18 ? "tooltip-left" : node.x > 82 ? "tooltip-right" : ""
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
                <em aria-hidden="true">
                  <strong>{node.name}</strong>
                  {node.description}
                </em>
              </button>
            );
          })}

          <div className="compass-drawer">
            <div className="flow-trace-icon" aria-hidden="true"><i /></div>
            <p>The completed request trace is ready to keep.</p>
            {!alreadySolved ? (
              <button onClick={onCollectReward}>Save the flow trace</button>
            ) : (
              <small>The drawer is empty.</small>
            )}
          </div>
        </div>

        <div className="route-controls">
          <p aria-live="polite">{feedback || "Choose the next component in the request flow."}</p>
          {!drawerOpen && (
            <button onClick={() => {
              setPath(["west-gate"]);
              setFeedback("");
            }}>Clear flow</button>
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

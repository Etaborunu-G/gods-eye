# God's Eye

**Real-Time Earth & Near-Space Situational Awareness Platform**

God's Eye is an engineering-focused 3D Earth platform for visualizing real-time and predicted geospatial data across dedicated operational modes.

The platform combines real satellite tracking with a custom C++ spacecraft telemetry system, a Python/Linux ground station, real-time networking, and an interactive React/CesiumJS interface. Later milestones extend it to aircraft, marine traffic, environmental context, astronomical events, and historical replay.

## Planned modes

- **Explore** — general 3D Earth exploration.
- **Space** — real satellites, orbital paths, simulated missions, space weather, and astronomical events.
- **Flights** — aircraft tracking, airports, trails, and aviation context.
- **Marine** — vessel tracking, ports, routes, and marine context.

## Architecture

```text
Real-world feeds                      Simulated mission
      |                                      |
Python ingestion services              C++ spacecraft
      |                                      |
Normalization                    Binary telemetry over UDP/TCP
      |                                      |
      +------------ Python backend / ground station
                              |
                       FastAPI + WebSockets
                              |
                     React + TypeScript
                              |
                          CesiumJS
                              |
                           3D Earth
```

## Repository layout

```text
gods-eye/
├── .github/
├── frontend/
├── backend/
├── spacecraft/
├── protocol/
├── infrastructure/
├── docs/
├── scripts/
├── .env.example
├── .gitignore
└── README.md
```

## Technology direction

React, TypeScript, CesiumJS, Python, FastAPI, C++20/23, Boost.Asio, SGP4, PostgreSQL/PostGIS, Redis, Linux, WebSockets, GoogleTest, pytest, Vitest, GitHub Actions, and later Docker/Compose.

## Current milestone

**M0 — Foundation**

1. Repository and security baseline
2. Frontend scaffold
3. Backend scaffold
4. C++/CMake spacecraft scaffold
5. Tests and continuous integration
6. Release `v0.0.1`

## Public repository security

This is a public repository. Real API keys, access tokens, passwords, private keys, certificates, database credentials, and other secrets must never be committed.

Local secrets belong in `.env`, which is ignored by Git. `.env.example` contains placeholders only. CI/deployment secrets belong in GitHub Secrets.

If a real secret is ever committed, it must be treated as compromised and rotated/revoked.

## Status

God's Eye is currently in its foundation stage. Functional tracking features begin after M0.

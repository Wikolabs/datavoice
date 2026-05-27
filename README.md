# DataVoice — Analyse vocale de données par commande naturelle

> Posez vos questions à vos données comme à un collègue. Obtenez un graphe en 3 secondes.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.1_70B-FF6B35?style=flat)](https://groq.com)
[![Whisper](https://img.shields.io/badge/Whisper-base-yellow?style=flat)](https://openai.com/research/whisper)

---

## Vue d'ensemble

DataVoice est une interface d'analyse de données en langage naturel et vocal. L'utilisateur parle ou tape sa question ("Montre-moi les ventes par région ce trimestre"), le système génère la requête SQL via LLM (Text-to-SQL), l'exécute sur la base de données, et retourne une visualisation automatique (chart adapté au type de résultat).

**Domaine :** Business Intelligence / Natural Language Analytics  
**Port VM :** 3012 | **Sous-domaine :** datavoice.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts | Interface chat NL, visualisations auto |
| Backend | FastAPI (Python 3.11), Uvicorn | API Text-to-SQL, exécution, viz |
| STT | Whisper base (faster-whisper) | Commande vocale → texte |
| LLM | Groq (llama-3.1-70b-versatile) | Text-to-SQL, chart type suggestion |
| SQL | sqlalchemy (sync) + asyncpg | Exécution queries sécurisées |
| Viz Engine | Python + pandas | Détection type viz optimal |
| Base de données | PostgreSQL 16 | Données analytiques (demo dataset) |
| Cache | Redis 7 | Cache résultats queries fréquentes |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3012) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.00
groq==0.9.0
faster-whisper==1.0.1
sqlalchemy==2.0.30
asyncpg==0.29.0
pandas==2.2.2
numpy==1.26.4
redis==5.0.4
pydantic==2.7.1
python-multipart==0.0.9
```

---

## Architecture mono-repo

```
datavoice/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx             # Interface chat + visualisations
│   │   ├── history/             # Historique questions + résultats
│   │   └── datasets/            # Gestion datasets connectés
│   └── src/components/
│       ├── VoiceInput.tsx       # Bouton mic + STT recording
│       ├── QueryChat.tsx        # Interface chat questions NL
│       ├── AutoViz.tsx          # Visualisation auto (line/bar/pie)
│       ├── SqlPreview.tsx       # SQL généré (pour les pros)
│       └── ResultTable.tsx      # Tableau de résultats
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── query.py         # POST /query (NL → SQL → result)
│   │   │   ├── voice.py         # POST /voice (audio → text)
│   │   │   └── datasets.py      # Schémas disponibles
│   │   ├── services/
│   │   │   ├── text_to_sql.py   # Groq NL → SQL avec schema context
│   │   │   ├── sql_executor.py  # Exécution sécurisée (read-only)
│   │   │   ├── viz_selector.py  # Sélection type viz automatique
│   │   │   └── whisper.py       # STT via faster-whisper
│   │   └── models/
│   │       └── query.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0284c7', 'primaryTextColor': '#fff', 'primaryBorderColor': '#0369a1', 'lineColor': '#374151', 'secondaryColor': '#e0f2fe'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3012)"]
        NEXT["Next.js 14\nNL Analytics Interface"]
        API["FastAPI"]

        subgraph NLP["🗣️ NLP Pipeline"]
            WHISPER["Whisper base\nVoice → Text"]
            GROQ["Groq LLM\nText → SQL"]
            VIZ["Viz Selector\nOptimal chart type"]
        end

        PG[("PostgreSQL\nAnalytics data")]
        REDIS[("Redis\nQuery cache")]
    end

    USER["Analyst"] -- "voice/text" --> NEXT
    NEXT --> API
    API --> NLP
    NLP --> PG
```

### Séquence — Question vocale → graphique

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0284c7', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant USER as Analyst
    participant NEXT as Next.js
    participant API as FastAPI
    participant WHISPER as Whisper
    participant GROQ as Groq LLM
    participant PG as PostgreSQL
    participant VIZ as Viz Selector

    USER->>NEXT: 🎙️ "Montre-moi les ventes par région ce trimestre"
    NEXT->>API: POST /voice (audio blob)
    API->>WHISPER: transcribe(audio)
    WHISPER-->>API: "Montre-moi les ventes par région ce trimestre"

    API->>GROQ: text_to_sql(question, schema_context)
    Note over GROQ: Schema: sales(region, amount, date, product)
    GROQ-->>API: SELECT region, SUM(amount) FROM sales WHERE date >= '2024-01-01' GROUP BY region

    API->>API: validate_sql(query, read_only=true)
    API->>PG: execute(query)
    PG-->>API: [{region: "Nord", total: 124500}, ...]

    API->>VIZ: suggest_chart(columns=[region, total], row_count=6)
    VIZ-->>API: chart_type=bar, x=region, y=total

    API-->>NEXT: {sql, data, chart_config}
    NEXT-->>USER: 📊 Bar chart régions
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0284c7', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    QUERY_HISTORY {
        uuid id PK
        string question_text
        string generated_sql
        jsonb result_data
        string chart_type
        float execution_time_ms
        boolean was_valid
        timestamp created_at
    }
    DATASET {
        uuid id PK
        string name
        string schema_json
        string connection_string
        int row_count
        timestamp last_synced
    }
    SAVED_REPORT {
        uuid id PK
        uuid query_id FK
        string title
        string chart_config
        timestamp saved_at
    }

    QUERY_HISTORY }o--|| DATASET : "runs_on"
    QUERY_HISTORY ||--o| SAVED_REPORT : "saved_as"
```

---

## PRD

### Problème
L'analyse de données nécessite des compétences SQL que la plupart des business users n'ont pas. Dépendre d'un analyste pour chaque requête crée des goulots d'étranglement. Les outils BI existants ont des interfaces complexes.

### Solution
DataVoice démocratise l'analyse de données : posez une question en français (oral ou écrit), obtenez un graphe en 3 secondes. Le SQL généré est visible pour les utilisateurs avancés. Les résultats sont exportables.

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| Business User | Accéder à ses données sans dépendre des analystes |
| Commercial | Réponses instantanées sur son pipeline sans tableau BI |
| Manager | Dashboard conversationnel pour les réunions |

### OKRs
- Taux de succès Text-to-SQL > 85% sur les questions courantes
- Latence totale (voice→chart) < 4 secondes
- Adoption : 70% des managers utilisent vs email pour les données

---

## User Stories

```
US-01 [Manager] En tant que manager commercial,
      je veux demander vocalement "Quels sont mes 5 meilleurs clients ce mois ?"
      et voir un tableau immédiatement
      afin d'avoir la réponse en 10 secondes pendant une réunion.

US-02 [Business User] En tant qu'utilisateur business,
      je veux voir le SQL généré pour ma question
      afin de comprendre ce que le système a interprété.

US-03 [Analyst] En tant qu'analyste,
      je veux sauvegarder les questions fréquentes comme "rapports favoris"
      afin d'y accéder en 1 clic sans re-saisir la question.

US-04 [Manager] En tant que manager,
      je veux que le système choisisse automatiquement le bon type de graphe
      (courbe pour la tendance, camembert pour les parts de marché)
      afin d'avoir toujours la meilleure visualisation.

US-05 [Admin] En tant qu'admin,
      je veux connecter nos bases de données analytiques
      et définir des alias métier ("chiffre d'affaires" = SUM(amount))
      afin que les questions business soient correctement interprétées.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | Read-only SQL | Seules les SELECT sont autorisées (sécurité) | ✅ SQL validator |
| R2 | Injection prevention | Validation AST avant exécution | ✅ Security badge |
| R3 | Viz auto | 2 cols numeriques → line, 1 cat + 1 num → bar, part → pie | ✅ Chart type demo |
| R4 | Timeout | Requête > 5s → cancel + message | ✅ Timeout demo |
| R5 | Cache | Question identique < 5min → résultat caché | ✅ Cache indicator |
| R6 | Alias métier | Dictionnaire "CA" = SUM(amount), "Clients actifs" = ... | ✅ Alias manager |
| R7 | Schema context | Schéma tables injecté dans le prompt Groq | ✅ Schema viewer |
| R8 | Row limit | Max 10 000 lignes retournées par query | ✅ Limit badge |
| R9 | Fallback | SQL invalide → message d'erreur explicite | ✅ Error state |
| R10 | Export | Résultats exportables CSV/PNG | ✅ Export button |

---

## Spécification API

**Base URL :** `http://datavoice.wikolabs.com/api/v1`

### POST /query
```json
{"question": "Ventes par région ce trimestre", "dataset_id": "ds_sales"}
// Response: {"sql": "SELECT region, SUM(amount) FROM sales WHERE ...", "data": [...], "chart": {"type": "bar", "x": "region", "y": "total"}}
```

### POST /voice
```
Content-Type: multipart/form-data
audio: voice.webm
// Response: {"text": "Montre-moi les ventes par région ce trimestre"}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Voice Input** | Bouton micro → enregistrement → transcription visible |
| **Chat Interface** | Input texte + historique questions/graphes |
| **Auto Viz** | Recharts : bar/line/pie choisi automatiquement |
| **SQL Preview** | Collapsible block SQL généré |
| **Dataset Explorer** | Schéma des tables disponibles avec types |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: datavoice, POSTGRES_USER: dv_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  redis:
    image: redis:7-alpine
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://dv_user:${POSTGRES_PASSWORD}@postgres/datavoice
      GROQ_API_KEY: "${GROQ_API_KEY}"
    depends_on: [postgres, redis]
    expose: ["8000"]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3012:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Text-to-SQL (Groq) + exécution PostgreSQL
- [ ] Visualisation auto (bar/line/pie)
- [ ] Chat interface

### Phase 2 — Vocal
- [ ] Commande vocale (Whisper)
- [ ] Historique questions
- [ ] Rapport favoris

### Phase 3 — Enterprise
- [ ] Multi-datasource (PostgreSQL, BigQuery, Snowflake)
- [ ] Dictionnaire métier personnalisé
- [ ] Exports PDF automatiques

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*

Objective: build a full-page crypto security monitoring NextJS app powered by Messari's API.

Context: you are starting from an empty repo. This repo is meant to be a getting started tutorial incorporating Messari's API onto a frontend. The attached image is a rough mockup of a crypto security monitor dashboard. The left Security Insights module will be populated using @https://api.messari.io/ai/openai/chat/completions , this API is OpenAI spec compatible, more on this later. The right Security Events module will be populated by Messari's Events API @https://api.messari.io/intel/v1/events?category=Security%20and%20Hacks

For module on the left side, here's the prompt for the Security Insights module:
"Provide insights about security, hacks, attacks, exploits that would be on the most impactful events happening in crypto in the recent month. Order the events in the answer by their importance"

Call Messari's chat completions endpoint with the above prompt: @https://api.messari.io/ai/openai/chat/completions

On the right side module, build a full-page scroll through Security Events module populated by @https://api.messari.io/intel/v1/events?category=Security%20and%20Hacks

Here are examples of cURL requests:

1. Chat Completions with prompt:
   curl --request POST \
    --url https://api.messari.io/ai/openai/chat/completions \
    --header 'X-MESSARI-API-KEY: api_key' \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --data '
   {
   "verbosity": "balanced",
   "response_format": "markdown",
   "inline_citations": false,
   "stream": false,
   "generate_related_questions": 0,
   "messages": [
   {
   "role": "user",
   "content": "Provide insights about security, hacks, attacks, exploits that would be on the most impactful events happening in crypto in the recent month. Order the events in the answer by their importance"
   }
   ]
   }
   '

2. Security Events:
   curl --request GET \
    --url 'https://api.messari.io/intel/v1/events?category=Security%20and%20Hacks' \
    --header 'accept: application/json' \
    --header 'x-messari-api-key: api_key'

example response from security events:
{
"error": null,
"data": [
{
"id": "ca79eef0-f20f-4c01-b50b-3ecf67d7e641",
"submissionDate": "2025-05-28T19:34:20Z",
"eventDate": "2025-05-28T19:34:20Z",
"eventName": "Astar Network Post-Mortem",
"primaryAssets": [
{
"id": "a7fd1149-5bd5-4ac0-84c3-d8664f7cb1d4",
"name": "Astar Network",
"slug": "astar",
"symbol": "ASTR"
}
],
"secondaryAssets": null,
"eventDetails": "The Astar team has [provided](https://forum.astar.network/t/astar-network-post-mortem-report-critical-vulnerability-response-may-2025/8556) a post-mortem report regarding a \"critical security vulnerability\" that was \"identified in the Polkadot SDK\" and \"affected multiple parachains in the ecosystem.\"\n\nAccording to the report, on May 23, 2025, the Astar team was informed of a vulnerability in the Polkadot SDK that \"allowed the construction of a transaction using a nested call.\" The report states that if executed, the transaction \"could generate a faulty block,\" which could \"stall or completely halt a parachain.\"\n\nThe report also states that the Astar team developed a security patch, [Runtime 1501](https://messari.io/intel/event/faa7f551-f6cf-4183-b41c-8ecbdfd4d20f), which was deployed across Astar, Shiden, and Shibuya to \"eliminate the vulnerability.\" According to the report, \"no exploit occurred on Astar, and no user funds or operations were compromised throughout this period.\"\n\nAdditionally, the report states that a \"direct `sudo` call was used to enact Runtime 1501 and mitigate the threat without delay.\" The report also outlines the following steps regarding future \"readiness for emergency runtime upgrades,\" with the \"goal of preventing the use of sudo and maintaining a fully decentralized governance model\":\n* Define a \"formal incident management procedure for Astar Emergency Upgrades,\" involving \"both the Technical Committee and Governance,\" with \"clear step-by-step actions and parameters.\"\n* Ensure that the Technical Committee and Main Council members are \"reachable at all times for urgent coordination.\"\n* Explore reducing the minimum fast-track voting period (currently 2 hours with 2/3 TC signers) to 1 hour to \"enhance responsiveness during emergency scenarios.\"\n* Provide \"simulation training and documentation\" for all governance actors (Technical Committee, Main Council) to \"ensure clarity and confidence in executing fast-track governance workflows.\"\n* Increase transparency around emergency decision-making by \"pre-committing to public reporting procedures, including publishing post-mortems within a set timeframe after any emergency intervention.\"\n* \"Review and streamline\" technical tooling and documentation related to fast-tracking referenda to \"minimize friction during coordination and execution.\"",
"updateDetails": null,
"status": "Completed",
"category": "Security and Hacks",
"subcategory": "Vulnerability Disclosure",
"tag": "",
"importance": "Medium",
"resources": [
{
"name": "Post-Mortem",
"link": "https://forum.astar.network/t/astar-network-post-mortem-report-critical-vulnerability-response-may-2025/8556"
},
{
"name": "Runtime 1501",
"link": "https://messari.io/intel/event/faa7f551-f6cf-4183-b41c-8ecbdfd4d20f"
}
],
"activationBlock": null,
"globalEvent": false
}
],
"metadata": {
"limit": 100,
"page": 0,
"totalRows": 526,
"totalPages": 6
}
}

Display:

- The Security AI Insights and Security Events modules will be display side-by-side each module taking half of the width, add individual scrollbars for each modules
- Use a dark color scheme and style to how security researchers would use this dashboard
- (left) Security AI Insights module: display citations metadata as a separate section at the bottom of the global insights module, add extra spacing between sections
- (right) Security Events module:
- display each event `eventDetails` content using markdown inside a card
- display primaryAssets as chips in a separate color
- display per event metadata like {importance, status, category, sub-category} as chips
- display resources in a bottom row, smaller importance
- Add title on top of both Security AI Insights and Security Events modules

Specifics: make this UI full-page and mobile friendly. To the extend possible prefetch these requests and cache them on the NextJS server side. Build the full code implementation for the entire page into this empty repo, no need to show me the plan first, build with linting disabled.

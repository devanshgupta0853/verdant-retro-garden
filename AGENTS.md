<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## App architecture
- Keep each distinct plant-care feature in its own TanStack content route; shared navigation wraps Outlet in the root so every feature remains directly accessible.
- Use PlantProvider for session-only UI demo profiles and observations; do not imply persistent storage or working hardware/AI without an explicit service integration.
- Keep visual roles and pixel-art presentation in src/styles.css semantic tokens; use the shared Button variants for actions so all screens retain the same theme.
- Give every content route its own metadata via pageHead so feature links have distinct app-specific titles and descriptions.

# Brew & Bean

Landing page for a coffee shop. Built with HTML, CSS (one file per section), TypeScript and Webpack.

## Setup

```bash
npm install -D webpack webpack-cli webpack-dev-server typescript ts-loader \
  css-loader mini-css-extract-plugin css-minimizer-webpack-plugin \
  html-webpack-plugin html-loader
```

## Scripts

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # production build into dist/
npm run typecheck  # TypeScript check only
```

## Structure

```
src/
  index.html
  styles/    variables, base, buttons, header, hero, paper, doodles, features, story, footer (main.css imports them)
  ts/        main.ts, nav.ts (mobile menu), header-scroll.ts
  assets/
    images/    hero.jpg, beans.jpg, paper-texture.svg
    icons/     feature icons, logo, arrow
    edges/     torn-paper edges, torn hairlines, photo bracket
    doodles/   faint coffee drawings for the cream corners
```

## Notes

- Fonts (Playfair Display, Jost, Mrs Saint Delafield) load from Google Fonts in `index.html`.
- The two photos are placeholders cropped from the design mockup; replace `hero.jpg` and `beans.jpg` with your own.
- Torn edge SVGs use the same hex colors as `variables.css` (`--cream-200`, `--coffee-900`). Change both together.
- Menu and Gallery links point to sections that do not exist yet.

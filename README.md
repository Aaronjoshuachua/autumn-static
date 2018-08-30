## Autumn Interactive Static site

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Prettier configuration**

Options:

- 4 Tab spacing
- Print width 80
- typescript parser

for CI server(future iterations):

```json
"lint:check": "prettier -l 'src/**/*.{ts,tsx}'"
```

Prints the filenames of files that are different from Prettier formatting. If there are differences the script errors out, which is useful in a CI scenario.

We are running [husky](https://github.com/typicode/husky) and [pretty-quick](https://github.com/azz/pretty-quick) to automate our pre-commit hooks with `prettier`

---

**Special Caveats**

Using `const enum`. `namespaces {}` and `export = && import =` is not supported from
bable-plugin-transform-typescript. [Reference](https://next.gatsbyjs.org/packages/gatsby-plugin-typescript/#gatsby-plugin-typescript)

---

**TODO list**

1. add dynamic header that hides when user scrolls to a specific YPosition offset

---

**Directory Structure**

```
src/img => image dir for non-editable images
static/image => image dir for editable images
```

---

**notes**

gatsby-plugin-sass [locked](https://github.com/gatsbyjs/gatsby/issues/4457#issuecomment-371859766):

```json
"gatsby-plugin-sass": "1.0.19"
```

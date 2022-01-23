## OVERVIEW

An important part of food preparation is recipe selection. Lets create one!

## LIVE DEMO

https://anjana543.github.io/recipe-selection-app/

## INSTRUCTIONS

1. Clone this repository and install the dependencies using `yarn`
2. Create a new branch named dev `git checkout -b dev`
3. Complete the tasks described in this document by applying your solution and committing code.
4. Once you finish, create a pull request to the master branch of this repository.
5. After creating your pull request, please send the link via email to the recruiter you're in touch with.

## COMPONENTS

These components are based on the styled-system specification and rendered using styled-components.

### Box

The Box component serves as a wrapper component for layout related needs. Use Box to set values such as display, width, height, and more. In practice, this component is used as a wrapper around other components to achieve Box Model related styling.

This component uses the following functions from the styled-system: background, border, color, flexbox, layout, position, shadow, and space.

Reference table for styled-system: [https://github.com/styled-system/styled-system/blob/master/docs/table.md](https://github.com/styled-system/styled-system/blob/master/docs/table.md)

We recommend to use long-hand properties, for example:

```js
// Do
<Box borderTopWidth="sm" borderTopColor="border" borderTopStyle="solid" />
// Don't
<Box borderTop="1px solid" borderColor="border" />
```

### Flex

The Flex component behaves the same as the Box component except that it has display: flex set by default.

### List

The List component renders a ul element with list-style-type: none set by default.

This component uses the following functions from styled-system: layout, space.

Reference table for styled-system: [https://github.com/styled-system/styled-system/blob/master/docs/table.md](https://github.com/styled-system/styled-system/blob/master/docs/table.md)

### ListItem

The ListItem component renders a li element, and it's recommended to be used as the children of the List component.

### Text

The Text component is a wrapper component that will apply typography styles to the text inside. It renders a div element as default, but using the ["as" polyphormic property from the styled-components specification](https://styled-components.com/docs/api#as-polymorphic-prop) can render any text element, such as p, h1, span, etc.

### Button

The Button component can use two different variants; primary and secondary, that can be manipulated through the variant property.

This component uses the following functions from styled-system: layout, space.

Reference table for styled-system: [https://github.com/styled-system/styled-system/blob/master/docs/table.md](https://github.com/styled-system/styled-system/blob/master/docs/table.md)

### Grid

Our grid is implemented through the styled-bootstrap-grid [https://github.com/dragma/styled-bootstrap-grid](https://github.com/dragma/styled-bootstrap-grid)

## DATA SCHEMA

### FreshToHome Box

```json
{
  // FreshToHome box identifier
  "id": "5f4e821d531e677602591a9b",
  // Product name
  "productName": "Classic Box",
  // Headline
  "headline": "WEEK OF OCTOBER 12TH'",
  // Minimum recipes for this FreshToHome box
  "min": 3,
  // Maximum recipes for this FreshToHome box
  "max": 8,
  // Base price of every recipe
  "baseRecipePrice": 1798,
  // Shipping price of this FreshToHome box
  "shippingPrice": 1298,
  // Array of recipes that the customer can select for this FreshToHome box
  "recipes": [
    {
      // Recipe identifier
      "id": "5f4d4a7e62fb0224951e7ec4",
      // Name of the recipe
      "name": "Chicken Sausage & Spinach Ravioli",
      // Recipe slug
      "slug": "chicken-sausage-spinach-ravioli",
      // Recipe headline
      "headline": "with Tomato & Lemon",
      // Recipe image
      "image": "./assets/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg",
      // Indicates the times this recipe was selected, this is used to perform the recipe selection
      "selected": 1,
      // Maximum number of times this recipe can be selected
      "selectionLimit": 1,
      // Extra charge for this recipe
      "extraCharge": 0,
      // Servings
      "yields": 2
    }
  ]
}
```

## GLOSSARY

**FreshToHome Box:** the weekly physical box that arrives at your door containing the recipes that you have previously selected. Boxes have boundaries around the minimum and maximum recipes that you can receive.

**Recipe:** a combination of ingredients that are cooked together create a FreshToHome recipe; a box can have multiple recipes and multiple items of the same recipe. This way, our customers can cook more portions of the same recipe in case they're throwing a dinner party!

**Recipe Selection:** the action of adding or removing a recipe from your box based on the configuration from your box and recipe, such as box selection boundaries and recipe selection limit.

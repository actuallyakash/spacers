spacers
-------

[1]: <https://github.com/actuallyakash/spacers>

_when you need more space_

#### Demo

[http://actuallyakash.github.io/spacers](http://actuallyakash.github.io/spacers/)

#### Package Managers

```sh
# Bower
bower install --save spacersjs

# NPM
npm install spacersjs
```

### Settings

**Option**|**Type**|**Default**|**Description**
-----|-----|-----|-----
element|string|null|Selector on which the spacer have to be initialized
appendHtml|string|begin|To append spacer divs after or before the tag. Use `begin` to append in the beginning and `end` to append after the selector.
padding|boolean|true|To enable padding, which is default behaviour
margin|boolean|false|To enable margin
onDragEnd|boolean|null|Function for using the spacer values when drag is ended
containedArea|object (DOM node | jQuery object)|window.document|Use if you're not able to find the element (ex- when using iframe)
spacerClass|object|null|For adding custom classes in the spacers
defaultSpacing|string|null|Default margin/padding values
defaultPadding|object|null|an object with top, bottom, left, right values
defaultMargin|object|null|an object with top, bottom, left, right values
spacingUnit|object|px|Change default spacing unit of spacers like em, rem, in, cm ..etc
showOnHover|string|false|Show spacers only on hover
showSpacingValue|boolean|false|Show the margin/padding values at the center of spacer
showLabel|string|null|Show the label beside spacing value
enableLock|boolean|false|Link opposite spacers
lockIcon|string|<span class="lock"></span>|HTML string for lock icon
unlockIcon|string|<span class="unlock"></span>|HTML string for unlock icon

#### Example

Initialize with:

```javascript
spacers({
    element: '.inner-element'
});
 ```

#### Dependencies

Voila! It works without any dependencies.

#### License

Copyright (c) 2021 Akash Gupta
Licensed under the MIT license.

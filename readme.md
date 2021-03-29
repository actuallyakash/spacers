## TODO: options needed

* containedArea (use if you're not able to find the element (ex- iframe)) | type: object
* spacerClass (for adding classes in the spacers) | type: string
* defaultSpacing (default margin/padding values) | type: string
* defaultPadding (an object with top, bottom, left, right values) | type: object
* defaultMargin (an object with top, bottom, left, right values) | type: object
* spacingUnit (to change default spacing unit of spacers like em, rem, in, cm ..etc) | type: string
* showOnHover (to show spacers only on hover) | type: boolean
* showSpacingValue (to show the margin/padding number in the center of spacer) | type: boolean
* showLabel: (to show the label beside spacing value) | type: string
* showLocks: (to link opposite spacers)

## Done

* element (selector on which the spacer is implemented) | type: string
* appendHtml (to append spacer divs ) | type: string | values: (begin, end) | ref: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML#visualization_of_position_names | default: afterbegin
* padding (to enable padding, which'll be default behaviour) | type: boolean
* margin (to enable margin) | type: boolean
* onDragEnd (a function for using the values when drag is ended) | type: function | ref: interactjs


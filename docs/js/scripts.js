// Element property
spacers({
    element: '.element-prop',
});

spacers({
    element: '.padding-prop',
    padding: true
});

spacers({
    element: '.margin-prop',
    padding: false,
    margin: true
});

spacers({
    element: '.defaultSpacing-prop',
    defaultSpacing: '10'
});

spacers({
    element: '.defaultPadding-prop',
    defaultPadding: {
        'top': '20',
        'bottom': '20',
        'left': '20',
        'right': '20'
    }
});

spacers({
    element: '.defaultMargin-prop',
    padding: false,
    margin: true,
    defaultMargin: {
        'top': '10',
        'bottom': '10',
        'left': '10',
        'right': '10'
    }
});

spacers({
    element: '.spacingUnit-prop',
    spacingUnit: 'mm'
});

spacers({
    element: '.showOnHover-prop',
    margin: true,
    showOnHover: true
});

spacers({
    element: '.appendHtml-prop',
    appendHtml: 'begin'
});

spacers({
    element: '.hideSpacingValue-prop',
    hideSpacingValue: true
});

spacers({
    element: '.showLabel-prop',
    showLabel: 'Spacer Label',
});

spacers({
    element: '.enableLock-prop',
    enableLock: true
});

spacers({
    element: '.lockIcon-prop',
    enableLock: true,
    lockIcon: '🤐',
    unlockIcon: '😃'
});

spacers({
    element: '.containedArea-prop',
    containedArea: document
});

spacers({
    element: '.spacerClass-prop',
    spacerClass: 'some-dope-class another-dope-class'
});

spacers({
    element: '.onDragEnd-prop',
    onDragEnd: function (data) {
        // do some magic with this data here.
        console.log(data);
    }
});
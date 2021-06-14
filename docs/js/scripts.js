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
    defaultSpacing: '10px'
});

spacers({
    element: '.defaultPadding-prop',
    defaultPadding: {
        'top': '20px',
        'bottom': '20px',
        'left': '20px',
        'right': '20px'
    }
});

spacers({
    element: '.defaultMargin-prop',
    padding: false,
    margin: true,
    defaultMargin: {
        'top': '20px',
        'bottom': '20px',
        'left': '20px',
        'right': '20px'
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
    element: '.showSpacingValue-prop',
    showSpacingValue: false
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
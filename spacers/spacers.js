function spacers( options ) {

    let elements = document.querySelectorAll(options.element);
    let html, appendHtml;

    // Location to append spacers
    switch( options.appendHtml ) {
        case 'begin': appendHtml = "afterbegin";
        break;
        case 'end' : appendHtml = "beforeend";
        break;
        default: appendHtml = 'afterbegin';
    }

    elements.forEach( (element) => {

        let spacerId = Array(6).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');

        element.classList.add( 'spacer-initialised' );

        html = '<div class="spacers-wrapper">';

        // Padding
        html += '<div data-type="padding" class="spacer spacer-' + spacerId + ' spacer-top"></div><div data-type="padding" class="spacer spacer-' + spacerId + ' spacer-bottom"></div><div data-type="padding" class="spacer spacer-' + spacerId + ' spacer-left"></div><div data-type="padding" class="spacer spacer-' + spacerId + ' spacer-right"></div>';

        // Margin
        html += '<div data-type="margin" class="spacer spacer-' + spacerId + ' spacer-top"></div><div data-type="margin" class="spacer spacer-' + spacerId + ' spacer-bottom"></div><div data-type="margin" class="spacer spacer-' + spacerId + ' spacer-left"></div><div data-type="margin" class="spacer spacer-' + spacerId + ' spacer-right"></div>';

        html += '</div>';

        element.insertAdjacentHTML( appendHtml, html );
    });

}
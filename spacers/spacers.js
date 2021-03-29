function spacers( options ) {

    let document = options.containedArea ? options.containedArea : window.document;
    let elements = document.querySelectorAll( options.element );
    let defaultSpacing = options.defaultSpacing ? options.defaultSpacing : '8px';
    let spacingUnit = options.spacingUnit ? options.spacingUnit : "px";
    let enablePadding = options.padding == undefined || options.padding == true ? true : false;
    let enableMargin = options.margin ? true : false;
    let html, appendHtml;
    let margin, padding;

    margin = {
        top: options.defaultMargin ? options.defaultMargin.top : '',
        left: options.defaultMargin ? options.defaultMargin.left : '',
        bottom: options.defaultMargin ? options.defaultMargin.bottom : '',
        right: options.defaultMargin ? options.defaultMargin.right : ''
    };

    padding = {
        top: options.defaultPadding ? options.defaultPadding.top : '',
        left: options.defaultPadding ? options.defaultPadding.left : '',
        bottom: options.defaultPadding ? options.defaultPadding.bottom : '',
        right: options.defaultPadding ? options.defaultPadding.right : ''
    };

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

        // settings element's position relative
        element.style.position = "relative";

        html = '<div class="spacers-wrapper">';

        // Padding
        html += '<div data-type="padding" data-position="top" data-dragging="bottom" data-size="'+ padding.top +'" class="spacer spacer-' + spacerId + ' spacer-top"></div><div data-type="padding" data-position="bottom" data-dragging="top" data-size="'+ padding.bottom +'" class="spacer spacer-' + spacerId + ' spacer-bottom"></div><div data-type="padding" data-position="left" data-dragging="right" data-size="'+ padding.left +'" class="spacer spacer-' + spacerId + ' spacer-left"></div><div data-type="padding" data-position="right" data-dragging="left" data-size="'+ padding.right +'" class="spacer spacer-' + spacerId + ' spacer-right"></div>';

        // Margin
        html += '<div data-type="margin" data-position="top" data-dragging="bottom" data-size="'+ margin.top +'" class="spacer spacer-' + spacerId + ' spacer-top"></div><div data-type="margin" data-position="bottom" data-dragging="top" data-size="'+ margin.bottom +'" class="spacer spacer-' + spacerId + ' spacer-bottom"></div><div data-type="margin" data-position="left" data-dragging="right" data-size="'+ margin.left +'" class="spacer spacer-' + spacerId + ' spacer-left"></div><div data-type="margin" data-position="right" data-dragging="left" data-size="'+ margin.right +'" class="spacer spacer-' + spacerId + ' spacer-right"></div>';

        html += '</div>';

        element.insertAdjacentHTML( appendHtml, html );

        let spacers = Object.values(document.getElementsByClassName( 'spacer-' + spacerId ));

        // Adding spacer functionality
        let startX, startY, startWidth, startHeight, position, dragSide;

        spacers.forEach(spacer => {
            
            // Adding default spacing
            if( !options.defaultPadding || !options.defaultMargin ) {
                document.documentElement.style.setProperty( '--spacer-val', defaultSpacing );
            }

            // Addding custom-defined classes
            if ( options.spacerClass ) {
                spacer.classList.add( options.spacerClass );
            }

            // Adding default spacing
            spacerValue = spacer.getAttribute('data-size') ? spacer.getAttribute('data-size') : defaultSpacing;
            spacerPosition = spacer.getAttribute('data-position');

            if( spacerPosition == "top" || spacerPosition == "bottom" ) {
                spacer.style.height = spacerValue;
            }
            if( spacerPosition == "left" || spacerPosition == "right" ) {
                spacer.style.width = spacerValue;
            }

            spacer.addEventListener('mousedown', ( event ) => {
                // Starting height and width
                startHeight = spacer.offsetHeight;
                startWidth = spacer.offsetWidth;

                initDrag( event, spacer );
            });
        });

        function initDrag(event, spacer) {
                    
            position = spacer.getAttribute( 'data-position' );
            dragSide = spacer.getAttribute( 'data-dragging' );

            startX = event.clientX;
            startY = event.clientY;

            currentSpacer = spacer;
            spacerType = currentSpacer.getAttribute("data-type");
            
            document.documentElement.addEventListener( 'mousemove', doDrag, false );
            document.documentElement.addEventListener( 'mouseup', stopDrag, false );
        }

        function doDrag( e ) {
            
            let yIndex = (startHeight + e.clientY - startY);
            let xIndex = dragSide == "left" ? (startWidth - e.clientX + startX) : (startWidth + e.clientX - startX);

            // setting padding
            if ( spacerType == "padding" ) {
                switch( position ) {
                    case 'top' : padding.top = yIndex;
                    break;
                    case 'bottom': padding.bottom = yIndex;
                    break;
                    case 'left': padding.left = xIndex;
                    break;
                    case 'right': padding.right = xIndex;
                    break;
                }
            }

            // setting margin
            if ( spacerType == "margin" ) {
                switch( position ) {
                    case 'top' : margin.top = yIndex;
                    break;
                    case 'bottom': margin.bottom = yIndex;
                    break;
                    case 'left': margin.left = xIndex;
                    break;
                    case 'right': margin.right = xIndex;
                    break;
                }
            }

            // top/bottom (y)
            if( position == "top" || position == "bottom" ) {
                
                // Threshold
                if( yIndex < 5 || yIndex >= 300 ) {
                    return;
                }

                // setting data-size attribute
                currentSpacer.setAttribute( "data-size", yIndex );

                yIndex += spacingUnit;

                // Increasing spacer height
                currentSpacer.style.height = yIndex;

                if ( position == "top" ) {
                    if ( spacerType == "padding" ) {
                        element.style.paddingTop = yIndex;
                    } else {
                        element.style.marginTop = yIndex;
                    }
                } else if ( position == "bottom" ) {
                    if ( spacerType == "padding" ) {
                        element.style.paddingBottom = yIndex;
                    } else {
                        element.style.marginBottom = yIndex;
                    }
                }
            }

            // left/right (x)
            if( position == "left" || position == "right" ) {

                // Threshold
                if ( xIndex < 5 || xIndex >= 300 ) {
                    return;
                }

                // setting data-size attribute
                currentSpacer.setAttribute( "data-size", xIndex );

                xIndex += spacingUnit;

                // Increasing spacer width
                currentSpacer.style.width = xIndex;

                if ( position == "left" ) {
                    if ( spacerType == "padding" ) {
                        element.style.paddingLeft = xIndex;
                    } else {
                        element.style.marginLeft = xIndex;
                    }
                } else if ( position == "right" ) {
                    if ( spacerType == "padding" ) {
                        element.style.paddingRight = xIndex;
                    } else {
                        element.style.marginRight = xIndex;
                    }
                }
            }
        }

        function stopDrag(e) {
            document.documentElement.removeEventListener('mousemove', doDrag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);

            let  data = {};

            if( enablePadding ) {
                Object.assign( data, { 'padding': padding });
            }

            if( enableMargin ) {
                Object.assign( data, { 'margin': margin });
            }

            if( options.onDragEnd ) {
                options.onDragEnd(data);
            }
            
        }

    });

}
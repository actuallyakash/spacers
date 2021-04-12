function spacers( options ) {

    let document = options.containedArea ? options.containedArea : window.document;
    let elements = document.querySelectorAll( options.element );
    let defaultSpacing = options.defaultSpacing ? options.defaultSpacing : '8px';
    let spacingUnit = options.spacingUnit ? options.spacingUnit : "px";
    let enablePadding = options.padding == undefined || options.padding == true ? true : false;
    let showOnHover = options.showOnHover ? ' on-hover' : '';
    let enableMargin = options.margin ? true : false;
    let html, appendHtml;
    let margin, padding;
    let spacingProperties = [];
    enableMargin ? spacingProperties.push( 'margin' ) : '';
    enablePadding ? spacingProperties.push( 'padding' ) : '';
    let spacingDimensions = [ 'top', 'right', 'bottom', 'left' ];

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

        let spacerDivs = '';
        let spacerSize;

        spacingProperties.forEach( property => {
            switch( property ) {
                case 'padding':
                    spacingDimensions.forEach( dim => {

                        spacerSize = ( padding[dim] == "0" ? defaultSpacing : padding[dim] );

                        spacerDivs += '<div data-size="'+ spacerSize +'" data-type="'+ property +'" data-id="'+ spacerId +'" class="spacer spacer-' + spacerId + ' spacer-'+ dim +'" data-dragging="'+ getOppositeDimension(dim) +'" data-position="'+ dim +'"> <span class="spacer-indicator"> <span class="spacer-size">'+ (spacerSize == '' ? '0' : spacerSize) +'</span></span> </div>';
                    });
                break;

                case 'margin':
                    spacingDimensions.forEach( dim => {

                        spacerSize = ( margin[dim] == "0" ? defaultSpacing : margin[dim] );

                        spacerDivs += '<div data-size="'+ spacerSize +'" data-type="'+ property +'" data-id="'+ spacerId +'" class="spacer spacer-' + spacerId + ' spacer-'+ dim +'" data-dragging="'+ getOppositeDimension(dim) +'" data-position="'+ dim +'"> <span class="spacer-indicator"> <span class="spacer-size">'+ (spacerSize == '' ? '0' : spacerSize) +'</span></span> </div>';
                    });
                break;
            }
        });

        html = '<div class="spacer-wrapper' + showOnHover + '">' + spacerDivs + '</div>';

        element.insertAdjacentHTML( appendHtml, html );

        let spacers = Object.values( document.getElementsByClassName( 'spacer-' + spacerId ) );

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
            
            let spacingValue;
            if( position == 'top' || position == 'bottom' ) {
                spacingValue = (startHeight + e.clientY - startY);
            }

            if( position == 'left' || position == 'right' ) {
                spacingValue = ( dragSide == 'left' ? (startWidth - e.clientX + startX) : (startWidth + e.clientX - startX) );
            }

            // Setting Margin/Padding value
            setPropertyValue( spacerType, position, spacingValue );

            // updating data-size attribute and size value
            currentSpacer.setAttribute( 'data-size', spacingValue );
            currentSpacer.querySelector('.spacer-indicator .spacer-size').innerText = spacingValue;

            spacingValue += 'px';

            // Applying padding/margin
            oppositeProperty = spacerType + position.charAt(0).toUpperCase() + position.substring(1);
            if ( position == 'top' || position == 'bottom' ) {
                currentSpacer.style.height = spacingValue;
                element.style[oppositeProperty] = spacingValue;
            } else {
                currentSpacer.style.width = spacingValue;
                element.style[oppositeProperty] = spacingValue;
            }
        }

        function stopDrag(e) {
            document.documentElement.removeEventListener( 'mousemove', doDrag, false );
            document.documentElement.removeEventListener( 'mouseup', stopDrag, false );

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

        function getOppositeDimension( dimension ) {
            switch( dimension ) {
                case 'top': return 'bottom';
                case 'bottom': return 'top';
                case 'left': return 'right';
                case 'right': return 'left';
            }
        }

        function setPropertyValue( spacerType, position, spacingValue ) {
            // setting padding
            if ( spacerType == "padding" ) {
                padding[position] = spacingValue;
            }
            
            // setting margin
            if ( spacerType == "margin" ) {
                margin[position] = spacingValue;
            }
        }

    });

}
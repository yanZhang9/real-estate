//importing modules
var express = require( 'express' );
var request = require( 'request' );
var cheerio = require( 'cheerio' );

//creating a new express server
var app = express();

//setting EJS as the templating engine
app.set( 'view engine', 'ejs' );

//setting the 'assets' directory as our static assets dir (css, js, img, etc...)
app.use( '/assets', express.static( 'assets' ) );


//makes the server respond to the '/' route and serving the 'home.ejs' template in the 'views' directory
app.get( '/', function ( req, res ) {

    callLeboncoin();

    res.render( 'home', {
        message: 'The Home Page!'
    });
});


//launch the server on the 3000 port
app.listen( 3000, function () {
    console.log( 'App listening on port 3000!' );
});

/*//test affiche le test html de la page google
var request = require( 'request' );
request( 'http://www.google.com', function ( error, response, body ) {
    if ( !error && response.statusCode == 200 ) {
        console.log( body )//Show the HTML for the Google homepage
    }
})*/


//fonction recupère le prix de l'annonce sur le site Leboncoin

function callLeboncoin() {
    var url = 'https://www.leboncoin.fr/ventes_immobilieres/1073837003.htm?ca=12_s'

    request( url, function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {

            const $ = cheerio.load( html )

            const lbcDataArray = $( 'section.properties span.value' );

            let lbcData = {
                price: parseInt( $( lbcDataArray.get( 0 ) ).text().replace( /\s/g, '' ), 10 ),
                city: $( lbcDataArray.get( 1 ) ).text().trim().toLowerCase().replace( /\_|\s/g, '-' ),
                type: $( lbcDataArray.get( 2 ) ).text().trim().toLowerCase(),
                surface: parseInt( $( lbcDataArray.get( 4 ) ).text().replace( /\s/g, '' ), 10 )
            }
            console.log( lbcData )


            /*console.log($('h2.item_price span.value').text()); // show the text of the item
            console.log($('h2 span[itemprop="address"]').text()); // show the text of the item
            console.log($('h2.clearfix span.value').text()); // show the text of the item
            */
            /*if($('h2 span.property').text()=="Surface"){
                console.log($('h2 span.value').text()); // show the text of the item
              }*/

            /*var $ = cheerio.load( html )
                var array = $( 'section.properties span.value' ).get()
                array.forEach( function ( element ) {
                    console.log( $( element ).text() )
                });  
                // console.log( $( 'h2.item_price span.value' ).text() )
            }*/


        }
        else {
            console.log( error );
        }
    })
}


// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "f7a61fa0-a46e-11ec-b230-0800200c9a66"; // GEnerado por http://www.famkruithof.net/uuid/uuidgen

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>La noche anterior al concierto</h1>\
        <img src='media/games/tutorial/descarga.jpg' class='float_right'>\
        <p>Por fin esta a punto de llegar el día que con tantas ansias has estado esperando. Mañana a estas horas estarás de vuelta en casa, con una camiseta de recuerdo y un dolor de oídos que te acompañara los próximos dos días. </p>\
        \
        <p>Ahora debes preparar todo lo que necesitas para mañana, asegurate de no dejar nada al azar</p>\
        \
        <p>Acabas de terminar de cenar, y ahora puedes decidir entre <a href='habitacion'>subir a tu habitación</a> o <a href='television'>quedarte un rato viendo la televisión</a></p>"
    ),

    // NB: The 'hub' situation which is the main list of topics, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the game.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.
	
		habitacion: new undum.SimpleSituation(
			"<h1>Tu habitación</h1>\
			<img src='media/games/tutorial/habitacion.jpg' class='float_right'>\
			<p>Aqui estamos en este habitát conocido como habitación de un adolescente, que sería más propia del escenario de una película post-apocalíptica. </p>\
			<p>No obstante, quizá haya algo que te venga bien y que desees meter en la mochila: \
			una <a href='./camiseta' class='once'>camiseta con la cara de tu cantante favorito</a>, tu <a href='./telefono' class='once'>teléfono</a>, \
			las <a href='./coche' class='once'>llaves del coche</a> de tu madre, la <a href='./entrada' class='once'>entrada</a>, un <a href='./exprimidor'  class='once'>exprimidor manual</a> para hacer zumo de naranja</p>\
			<p>Ya que estas aquí tu única opción es <a href='dormir'>irte a dormir</a>, para estar descansado y fresco para un día tan importante.</p>\
		",
				{
            actions: {
                'camiseta': function( character, system, action) {
																	system.setCharacterText( "<p>Ahora ya llevas una camiseta que demuestra que eres todo un fan . \
																														Quizás te sirve para impresionar a alguien una vez en el concierto</p>" );
																},
                'telefono': function( character, system, action) {
																	system.setCharacterText( "<p>Que buen invento este pequeño ordenador portatil que cabe en la palma de tu mano.\
																													Quién sabe cuando puede sacarte de un apuro</p>" );
														},
                'coche': function( character, system, action) {
																	system.setQuality( "llaves",true);
																	system.setCharacterText( "<p>Tienen el llavero que le regalaste por su cumpleaños \
																													(podrías empezar a currarte un poco más los regalos, que hasta ahora han sido muy cutres)</p>" );
														},
                'exprimidor ': function( character, system, action) {
																	system.setCharacterText( "<p>Te gustaría saber que hace eso ahí, pero como no has recogido tu habitación en meses, te quedarás con la duda para siempre.</p>" );
																},
				'entrada': function(character, system, action) {
															system.setQuality( "entrada", true );
															system.setCharacterText("<p>Sería preocupante si se te olvidase, pues se supone que es el concierto más importante de tu vida, no obstante a cualquiera le pueden jugar una mala pasada los nervios. \
																													La guardas como si fuese oro en paño en tu bolsillo pequeño</p>");
														}

            }
        }
		),
		
	television: new undum.SimpleSituation(
		"<h1>Al dia siguiente</h1>\
		<img src='media/games/tutorial/tele.jpg' class='float_right'>\
		<p></p>\
		<p>¿¿¿¿QUEEEEE????</p>\
		<p>Te acabas de despertar de un salto, como puede ser ya de día, anoche te quedaste dormido viendo la teletienda en una postura malísima.\
		A toda prisa y prácticamente sin prepararte decides <a href='irnoir'>emprender tu viaje</a></p>"
	
	),
		
	dormir: new undum.SimpleSituation(
		"<h1>Una buena mañana</h1>\
		<img src='media/games/tutorial/soleado.jpg' class='float_right'>\
		<p>Ya has despertado y observas el cielo, parece un clima de película, imposible que hiciese mejor día para tu concierto.\
		Tras desayunar y ducharte te dispones a <a href='irnoir'>emprender tu viaje</a></p>"
	
	),
	
	irnoir :new undum.SimpleSituation(
	"<h1>Empieza tu viaje</h1>", 
		{
				enter:function( character, system, from ) {
					if( character.qualities.llaves ) {
						system.doLink( "irencoche");
					} else {
						system.doLink( "irenbus");
					}
				}
		}
	),
	
	entrarnoentrar :new undum.SimpleSituation(
	"<h1>Se acerca el momento</h1>", 
		{
				enter:function( character, system, from ) {
					if( character.qualities.entrada ) {
						system.doLink( "entrar");
					} else {
						system.doLink( "noentrar");
					}
				}
		}
	),
	
	irencoche: new undum.SimpleSituation(
		"<h1>Viaje en coche</h1>\
		<img src='media/games/tutorial/conduciendo.jpg' class='float_left'>\
			<p>Gracias a que no te has olvidado las llaves del coche, emprendes tu viaje cómoda y rápidamente .\
			En poco tiempo ya estás en el estadio donde se celebra el concierto. Te toca <a href='entrarnoentrar'>pasar por la entrada</a></p>"
	),
	
	irenbus: new undum.SimpleSituation(
			"<h1>En el bus</h1>\
			<p>Como anoche se te olvidó coger las llaves del coche, aquí te encuentras en un autobus incómodo y algo anticuado.\
			Tras un largo e incómodo viaje por fin llegas al lugar del concierto.Te toca <a href='entrarnoentrar'>pasar por la entrada</a></p>"			
		),
	
	entrar: new undum.SimpleSituation(
			"<h1>Dentro del concierto</h1>\
			<img src='media/games/tutorial/concierto.jpg' class='float_right'>\
			<p>Por fin el momento que tanto habías esperado ya ha llegado, estás aqui y te lo vas a pasar como nunca. Tras horas y horas de cantar todas las canciones finaliza el </p>",
			{
					enter:function( character, system, from ) {
					if( character.qualities.llaves ) {
						system.doLink( "vuelta");
					} else {
						system.doLink( "novuelta");
					}
				}
			}
		),
		
	noentrar: new undum.SimpleSituation(
			"<h1>Todo mal</h1>\
			<img src='media/games/tutorial/mal.png' class='float_right'>\
			<p>Como puedes haber salido de casa sin la entrada, solo a alguien como tu se le ocurriría, hasta aquí llega esta aventura, con un final amargo que es lo que mereces.</p>",
				
		),
	vuelta: new undum.SimpleSituation(
			"<h1>Final feliz</h1>\
			<p>Y así acaba esta aventura, todo ha salido como esperabas y has vuelto a casa sano y salvo y encima para la hora de cenar</p>\
			<h1>¡Fin</h1>"
		),  
	novuelta: new undum.SimpleSituation(
			"<h1>Final semi-feliz</h1>\
			<p>Como el concierto terminó a horas intempestivas y no tenías coche propio, le pediste a unos amables transeuntes qeu te llevasen a casa.</p>\
			<p>No fue tan mala idea, pues resultó que eran unos pacíficos hippies que viajaban de mochileros por toda España, viendo su modo de vida te entró envidia y decidiste unirte a ellos. No regresaste a casa pero conseguiste algo mejor.</p>\
			<h1>¡Fin</h1>"
		)   
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
	 entrada: new undum.OnOffQuality(
        "Entrada", {priority:"0001", group:'inventario', onDisplay:"&#10003;"}
    ),
	  llaves: new undum.OnOffQuality(
        "Llaves", {priority:"0002", group:'inventario', onDisplay:"&#10003;"}
    )
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    inventario: new undum.QualityGroup('Inventario', {priority:"0001"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    system.setQuality( "entrada" , false )
    system.setQuality( "llaves" , false )
    system.setCharacterText("<p>Comienzas tu fascinante aventura.</p>");
};

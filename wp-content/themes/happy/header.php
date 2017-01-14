<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and navigation menu
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package happy
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<nav class="navbar navbar--light navbar--hiding navbar--fixed navbar--fixed-top is--revealed">
	<div class="container">
		<div class="navbar__left">
			<a class="nav__link" href="<?php echo bloginfo( 'wpurl' ); ?>">
				<svg id="Layer_1" style="width:25px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 666.67 1000"><defs><style>.cls-1{fill:url(#linear-gradient);}</style><linearGradient id="linear-gradient" x1="-38.74" y1="884.35" x2="689.63" y2="155.99" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00ffd5"/><stop offset="1" stop-color="#0fa"/></linearGradient></defs><title>201701-happyglass-logotype</title><path class="cls-1" d="M429.5,579.93a33.45,33.45,0,0,1,0,46.75,32.15,32.15,0,0,1-46,0l-17.65-17.95L348.2,626.68a32.15,32.15,0,0,1-46,0,33.45,33.45,0,0,1,0-46.75L319.86,562,302.21,544a33.45,33.45,0,0,1,0-46.75,32.15,32.15,0,0,1,46,0l17.65,17.95,17.65-17.95a32.15,32.15,0,0,1,46,0,33.45,33.45,0,0,1,0,46.75L411.85,562ZM233,562,250.64,544a33.45,33.45,0,0,0,0-46.75,32.15,32.15,0,0,0-46,0L187,515.23l-17.65-17.95a32.15,32.15,0,0,0-46,0,33.45,33.45,0,0,0,0,46.75L141,562l-17.65,17.95a33.45,33.45,0,0,0,0,46.75,32.15,32.15,0,0,0,46,0L187,608.74l17.65,17.95a32.15,32.15,0,0,0,46,0,33.45,33.45,0,0,0,0-46.75Zm59.86,338.4q-8.67.77-17.29.77c-45.71,0-89.58-16.19-125.09-46.47a198.06,198.06,0,0,1-69-134.6,33.42,33.42,0,0,1,7.48-24.13A32.36,32.36,0,0,1,111,684.27l324-28.81a32.15,32.15,0,0,1,23.74,7.61,33.23,33.23,0,0,1,11.49,22.44C479.6,794.46,400,890.85,292.85,900.38ZM404.18,724.56l-251,22.32a132,132,0,0,0,57,70A93.12,93.12,0,0,1,360,803.51a133.06,133.06,0,0,0,44.17-78.95Zm262.48-186V734.17c0,55.44-44.37,100.54-98.9,100.54H552.85v33.06c0,72.91-58.36,132.23-130.08,132.23H130.08C58.35,1000,0,940.68,0,867.77V405a133.15,133.15,0,0,1,13.81-59.19h0A158.22,158.22,0,0,1,0,281c0-82.69,63.2-150.66,143.09-156.6C178.57,49.11,253.95,0,337.4,0H520.33c18,0,32.52,14.8,32.52,33.06V219A220.44,220.44,0,0,1,526,324.68h0A132.93,132.93,0,0,1,552.85,405V438h14.92C622.3,438,666.67,483.12,666.67,538.55ZM65,281c0,50.13,40.12,90.91,89.43,90.91A88.43,88.43,0,0,0,214,348.84a32.11,32.11,0,0,1,39.77-2.78A147.89,147.89,0,0,0,337.4,371.9c82.93,0,150.41-68.59,150.41-152.89V66.12H337.4c-63.8,0-120.84,41.12-141.95,102.31a32.59,32.59,0,0,1-33.42,22c-2.79-.24-5.27-.36-7.57-.36C105.16,190.08,65,230.87,65,281ZM487.81,405A66.65,66.65,0,0,0,483,380.23C444.66,416.08,393.51,438,337.4,438a211.69,211.69,0,0,1-99.63-24.79A152.1,152.1,0,0,1,65,408.9V867.77c0,36.46,29.18,66.12,65,66.12H422.76c35.86,0,65-29.66,65-66.12ZM601.63,538.55c0-19-15.19-34.42-33.86-34.42H552.85V768.6h14.92c18.67,0,33.86-15.44,33.86-34.42Z"/></svg>
			</a>
		</div>

		<div class="burger navbar__toggle">
			<input type="checkbox" checked>
				<span></span>
		</div>

		<ul class="navbar__right animate__delay">
			<li class="button button--navbar button--primary animate animate__fade--left">
				<a href="<?php echo get_permalink( 31 ); ?>">Suggest a location</a>
			</li>
		</ul>
	</div>
</nav>

<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package happy
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<nav class="navbar navbar--light navbar--hiding navbar--fixed navbar--fixed-top is--revealed">
	<div class="container">
		<div class="navbar__left">
			<a class="nav__link" href="/">
				<img src="" width="25" alt="Bricks logo">
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

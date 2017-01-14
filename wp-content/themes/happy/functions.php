<?php

// Init setup

if ( ! function_exists( 'happy_setup' ) ) :
function happy_setup() {

	add_theme_support( 'title-tag' );

	add_theme_support( 'html5', array(
		'search-form',
		'gallery',
		'caption',
	) );
}
endif;
add_action( 'after_setup_theme', 'happy_setup' );


function happy_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'happy_content_width', 640 );
}
add_action( 'after_setup_theme', 'happy_content_width', 0 );


// Enqueue scripts and styles.

function happy_scripts() {
	wp_enqueue_style( 'happy-style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'happy_scripts' );


// Redirect based on cookies

function happy_redirect_sample() {

    exit( wp_redirect( home_url( '/' ) ) );

}

// add_action( 'template_redirect', 'happy_redirect_sample' );

// Custom Post Types

// add_action( 'init', 'happy_custom_types' );
function happy_custom_types() {
	register_post_type( 'pub',
		array(
			'labels' => array(
				'name' => __( 'Pubs' ),
				'singular_name' => __( 'Pub' )
			),
			'public' => true,
			'has_archive' => true,
			'supports' => array('title'),
			'taxonomies' => array('category'),
			'menu_position' => 6
		)
	);

	register_taxonomy_for_object_type( 'category', 'pub' );

	register_post_type( 'location',
		array(
			'labels' => array(
				'name' => __( 'Locations' ),
				'singular_name' => __( 'Location' )
			),
			'public' => true,
			'has_archive' => true,
			'hierarchical' => true,
			'supports' => array('page-attributes', 'title'),
			'menu_position' => 7
		)
	);
}

// Custom taxonomies

// add_action( 'init', 'happy_custom_taxonomies' );
function happy_custom_taxonomies() {
  register_taxonomy( 'location', array('pub'),
    array(
      'labels' => array(
        'name' => __( 'Locations' ),
        'singular_name' => __( 'Location' )
      ),
      'hierarchical' => true,
	  'rewrite' => array( 'hierarchical' => true, 'with_front' => false )
    )
  );
}

// Remove slug from url of CPT location

function happy_remove_slug( $post_link, $post, $leavename ) {

    if ( 'location' != $post->post_type || 'publish' != $post->post_status ) {
        return $post_link;
    }

    $post_link = str_replace( '/location/', '/', $post_link );

	return $post_link;
}
// add_filter( 'post_type_link', 'happy_remove_slug', 10, 3 );

function happy_parse_request( $query ) {

	// Only noop the main query
	if ( ! $query->is_main_query() )
		return;

	// Only noop our very specific rewrite rule match
	if ( 2 != count( $query->query ) || ! isset( $query->query['page'] ) ) {
		return;
	}

    if ( ! empty( $query->query['name'] ) ) {
        $query->set( 'post_type', array( 'post', 'location', 'page' ) );
    }
}
// add_action( 'pre_get_posts', 'happy_parse_request' );

function happy_change_post_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Pubs';
    $submenu['edit.php'][5][0] = 'Pubs';
	// $submenu['edit.php'][10][0] = 'Add Pub';
}
function happy_change_post_object() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Pubs';
    $labels->singular_name = 'Pub';
    $labels->add_new = 'Add Pub';
    $labels->add_new_item = 'Add Pub';
    $labels->edit_item = 'Edit Pub';
    $labels->new_item = 'Pub';
    $labels->view_item = 'View Pub';
    $labels->search_items = 'Search Pubs';
    $labels->not_found = 'No Pubs found';
    $labels->not_found_in_trash = 'No Pubs found in Trash';
    $labels->all_items = 'All Pubs';
    $labels->menu_name = 'Pubs';
    $labels->name_admin_bar = 'Pubs';
}
 
add_action( 'admin_menu', 'happy_change_post_label' );
add_action( 'init', 'happy_change_post_object' );


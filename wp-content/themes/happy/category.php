<?php
get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

        <?php 
            $currentCategory = get_category(get_query_var('cat'));
            if ( $currentCategory->category_parent === 0 ) :
        ?>
            <h2>City</h2>

            <?php wp_list_categories(array('child_of' => $currentCategory->term_id)); ?>

        <?php else: ?>
            <h2>District</h2>
        <?php endif; ?>

		<?php
        $post_args = array(
            'post_type' => 'post',
            'posts_per_page' => -1,
            'category_name' => get_query_var('category_name')
            // 'orderby' => 'meta_value',
            // 'order' => 'ASC',
            // 'meta_type' => 'DATE',
            // 'meta_key' => 'date',
            // 'meta_query' => array(
            //     array(
            //         'key' => 'date',
            //         'value' => current_time( 'Y-m-d' ),
            //         'compare' => '>=',
            //         'type' => 'DATE'
            //     )
            // )
        );

        $posts = new WP_Query( $post_args );

		if ( $posts->have_posts() ) : ?>

			<header class="page-header">
				<?php
					the_archive_title( '<h1 class="page-title">', '</h1>' );
					the_archive_description( '<div class="archive-description">', '</div>' );
				?>
			</header><!-- .page-header -->

			<?php
			/* Start the Loop */
			while ( $posts->have_posts() ) : $posts->the_post();
            ?>

				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    </header><!-- .entry-header -->

                    <div class="entry-content">
                        <?php
                            the_content();
                        ?>
                    </div><!-- .entry-content -->

                </article><!-- #post-## -->
            
            <?php
			endwhile;

			the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

        <?php wp_reset_postdata(); ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php

get_footer();

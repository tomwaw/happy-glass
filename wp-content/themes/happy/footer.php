<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package happy
 */

?>
<script type="text/javascript">
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                }
            };
        } else {
            script.onload = function () {
                if (callback && typeof callback === "function") {
                    callback();
                }
            };
        }
        script.src = url;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }
    // Load scripts async
    loadScript("<?php echo get_bloginfo('template_directory') ?>/js/main.js");
</script>
<footer class="footer">
	<div class="container align__xs--center">
		<p>Made with :beer: in Vienna</p>
	</div>
</footer>

<?php wp_footer(); ?>

</body>
</html>

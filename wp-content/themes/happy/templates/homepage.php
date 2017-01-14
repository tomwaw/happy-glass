<?php
/* Template Name: Homepage */
get_header();
?>

	<section class="hero flex fullscreen animate__delay is--revealed"><anchor name="home"></anchor>
		<div class="image--background image--grayscale image--overlay" style="background-image: url('https://images.unsplash.com/photo-1471421298428-1513ab720a8e?dpr=1&auto=format&fit=crop&w=1500&h=2265&q=80&cs=tinysrgb&crop=')"></div>
		
		<div class="flex__content">
			<div class="container">
				<h1 class="h1--boom h1--700 rhythm animate animate__fade--down">Happy.glass</h1>
				<h2 class="h3 animate animate__fade--up">Find the happy hours pubs and bars around you.</h2>
				<form class="form--horizontal row" action="/city/">
					<div class="form__field col-lg-4">
						<label class="input__label">City</label>
						<select class="input input__select">
							<!--<option disabled selected value hidden>Select your city...</option>-->
							<option>Vienna</option>
						</select>
					</div>
					<div class="form__field col-lg-4">
						<label class="input__label">District</label>
						<select class="input input__select">
							<option disabled selected value hidden>Select your district...</option>
							<?php $districts = get_categories(array('child_of' => 7, 'hide_empty' => false, 'orderby' => 'meta_value_num', 'meta_key' => 'order'));?>
							<?php foreach ($districts as $d): ?>
								<option value="<?php echo $d->term_id ?>"><?php echo $d->name ?></option>
							<?php endforeach;?>
						</select>
					</div>
					<div class="form__field col-lg-4">
						<label class="input__label"></label>
						<input type="submit" class="button button--primary button--large button--full"></input>
					</div>
				</form>
			</div>
		</div>
	</section>

<?php
get_footer();

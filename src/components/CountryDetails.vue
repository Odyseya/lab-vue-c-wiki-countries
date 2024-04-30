<!--  This is the component that we will render 
    via the vue-router's Route 
    and will be receiving the country code (alpha3Code) via the URL. -->

<!-- . CountryDetails displays 
        the country details as per the link that we clicked. -->

<!-- This component should be dynamically 
            displayed/rendered with the <router-vue />. -->

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchCountryData } from "../js/api";

const countryData = ref([]);
const route = useRoute();

const fetchData = async () => {
	const countries = await fetchCountryData();
	countryData.value = countries.find(
		(country) => country.alpha3Code === route.params.alpha3Code
	);
	// countryData.value = await fetchCountryData();
};

fetchData();

const countryDetails = computed(() => {
	return countryData.value.find(
		(country) => country.alpha3Code === route.params.alpha3Code
	);
});

const getCountryName = (alpha3Code) => {
	// Find the country with the matching alpha3Code
	const country = countryData.value.find(
		(country) => country.alpha3Code === alpha3Code
	);

	if (country) {
		return country.name.common;
	} else {
		// if not found return empty string
		return "";
	}
};

const flagUrl = computed(() => {
	if (countryDetails.value) {
		return `https://flagcdn.com/${countryDetails.value.alpha2Code.toLowerCase()}.svg`;
	} else {
		return "";
	}
});
</script>

<template>
	<div v-if="countryDetails">
		<img :src="flagUrl" alt="Flag" style="max-width: 100px" />
		<h1>{{ countryDetails.name.common }}</h1>
		<p><strong>Capital:</strong> {{ countryDetails.capital.join(", ") }}</p>
		<p><strong>Area:</strong> {{ countryDetails.area }} km²</p>
		<p>
			<strong>Borders:</strong>
			<span v-if="countryDetails.borders.length > 0">
				<span
					v-for="(border, index) in countryDetails.borders"
					:key="border">
					<router-link :to="`/${border}`">{{
						getCountryName(border)
					}}</router-link>
					<span v-if="index !== countryDetails.borders.length - 1"
						>,
					</span>
				</span>
			</span>
			<span v-else> None </span>
		</p>
	</div>
</template>

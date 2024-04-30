import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CountryDetailsView from "@/views/CountryDetailsView.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeView,
		children: [
			{
				path: ":alpha3Code",
				name: "CountryDetail",
				component: CountryDetailsView,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

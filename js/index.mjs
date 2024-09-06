export const API_BASE_URL = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";

// local storage functions
export function save(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
	return JSON.parse(localStorage.getItem(key));
}


//register user function
export async function register(name, email, password) {
	const response = await fetch(API_BASE_URL + API_AUTH + API_REGISTER, {
		headers: {
		"Content-Type": "application/json"
	},
			method: "POST",
			body: JSON.stringify({ name, email, password }),
	});

	if (response.ok) {
		return await response.json();	
	}
	throw new Error("Could not register the account");
}


// login user function
export async function login(email, password) {
	const response = await fetch(API_BASE_URL + API_AUTH + API_LOGIN, {
		method: "POST",
		body: JSON.stringify({ email, password }),
	});

	console.log(response);

		if (response.ok) {
			// const data = await response.json();
			// const { accessToken, ...profile } = data.data;
			const { accessToken, ...profile } = (await response.json()).data;
			save("token", accessToken);
			save("profile", profile);
			return profile;
		}
		throw new Error("Could not login");
	}


	export async function onAuth(event) {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target.email.value;
		const password = event.target.password.value;

		try {
			await register(name,email, password);
			alert("registration successful");
		} catch (error) {
			console.error("Registration failed", error);
		alert("Registration failed");
	}
		}

	
		
		export function setAuthListener() {
			const form = document.getElementById("registration-form");
			if (form) {
				form.addEventListener("submit", onAuth);
			} else {
				console.error("Form not found");
			}
		}
	
	setAuthListener()
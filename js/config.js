// Datos que cambian: todo lo editable está aquí, no hace falta tocar el HTML.
window.SITE = {
	// Cuando Steam apruebe la página: pega aquí el enlace y todos los botones pasan a "Wishlist on Steam".
	// Lleva UTM para ver en Steamworks (Marketing → UTM Analytics) cuántas visitas y wishlists vienen de la web.
	steamUrl: "https://store.steampowered.com/app/5219540/Encore_House/?utm_source=malakitogames&utm_medium=website&utm_campaign=steam_page",
	// ID del vídeo de YouTube del tráiler (lo que va tras "watch?v="). Vacío = el botón "Watch trailer" no aparece.
	// Se reproduce dentro de la web pero cuenta como visita en YouTube.
	trailerYoutubeId: "fgouzFMM5as",
	// Invitación al Discord. Vacío = el botón no aparece.
	discordUrl: "https://discord.gg/krz5p2UNV",
	// Formulario de correo → Google Sheets: URL de la "Aplicación web" de Apps Script (termina en /exec).
	// Cómo crearla: tools/newsletter_google_sheets.gs. Vacío = "Sign up" abre un correo a contact@ con la dirección.
	newsletterSheetUrl: "https://script.google.com/macros/s/AKfycbzXNp4lymACHVx6u9bDLc9CKdZvcT5buviXkNY0v1pg05eztfduZGmCWJ-I7NlARQb1iw/exec",
	// Enlace a la carpeta del press kit (Google Drive, "cualquiera con el enlace"). Vacío = el botón no aparece.
	pressKitUrl: "",
	// Correo de contacto (se monta con JS para que no lo lean los bots de spam).
	emailUser: "contact",
	emailDomain: "malakitogames.com",
	// Redes del estudio (handle = lo que se lee bajo el icono). Las que estén vacías no se muestran.
	socials: [
		{ name: "YouTube", url: "https://www.youtube.com/@malakitogames", handle: "@malakitogames" },
		{ name: "TikTok", url: "https://www.tiktok.com/@malakitogames", handle: "@malakitogames" },
		{ name: "Instagram", url: "https://www.instagram.com/malakitogames/", handle: "@malakitogames" },
		{ name: "Reddit", url: "https://www.reddit.com/user/malakito_dev/", handle: "u/malakito_dev" },
	],
};

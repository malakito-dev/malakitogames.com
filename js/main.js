(() => {
	const S = window.SITE || {};
	const T = window.I18N || { en: {} };

	// ============ Idioma ============
	// Inglés por defecto. Se recuerda la elección; ?lang=es en la URL también funciona.
	const store = {
		get() { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
		set(v) { try { localStorage.setItem("lang", v); } catch (e) {} },
	};
	const urlLang = new URLSearchParams(location.search).get("lang");
	let lang = (urlLang && T[urlLang]) ? urlLang : (T[store.get()] ? store.get() : "en");

	const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
	const t = (k) => (T[lang] && T[lang][k]) || T.en[k] || "";

	function applyLang() {
		document.documentElement.lang = lang;
		document.title = t("meta.title");
		const md = document.querySelector('meta[name="description"]');
		if (md) md.content = t("meta.description");
		document.querySelectorAll("[data-i18n]").forEach((el) => {
			const v = t(el.dataset.i18n);
			if (v) el.innerHTML = v;
		});
		document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
			const v = t(el.dataset.i18nPh);
			if (v) el.placeholder = v;
		});
		document.querySelectorAll(".js-steam-label").forEach((el) => {
			el.innerHTML = S.steamUrl ? t("steam.wishlist") : t("steam.soon");
		});
		const btn = document.querySelector(".js-lang");
		if (btn) {
			const other = lang === "en" ? "es" : "en";
			btn.dataset.target = other;
			btn.title = btn.ariaLabel = t("lang.switch");
			btn.querySelector(".lang__code").textContent = other.toUpperCase();
		}
	}
	document.querySelector(".js-lang")?.addEventListener("click", () => {
		lang = lang === "en" ? "es" : "en";
		store.set(lang);
		applyLang();
		if (window.__onLang) window.__onLang();
	});
	applyLang();

	// ============ Steam: un solo enlace para todos los botones ============
	document.querySelectorAll(".js-steam").forEach((a) => {
		if (S.steamUrl) {
			a.href = S.steamUrl;
			a.target = "_blank";
			a.rel = "noopener";
		} else {
			a.classList.add("is-soon");
			if (a.closest(".wishlist")) a.removeAttribute("href");
		}
	});

	// ============ Redes (iconos de Simple Icons, CC0) ============
	const ICONS = {
		YouTube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
		TikTok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
		Instagram: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
		Reddit: "M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z",
	};
	const list = document.querySelector(".js-socials");
	if (list) {
		(S.socials || []).filter((s) => s.url).forEach((s) => {
			const li = document.createElement("li");
			const a = document.createElement("a");
			a.href = s.url; a.target = "_blank"; a.rel = "noopener";
			a.setAttribute("aria-label", s.name);
			const d = ICONS[s.name];
			a.innerHTML = (d && !d.startsWith("@@") ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>` : "") + `<span>${s.handle || s.name}</span>`;
			li.appendChild(a);
			list.appendChild(li);
		});
	}

	// ============ Contacto (botón "Contact us") ============
	const addr = S.emailUser ? `${S.emailUser}@${S.emailDomain}` : "";
	// Si el PC no tiene programa de correo, mailto: no hace nada: por eso además se copia la dirección y se enseña.
	document.querySelectorAll(".js-email").forEach((a) => {
		if (!addr) { a.hidden = true; return; }
		a.href = `mailto:${addr}`; a.title = addr;
		a.addEventListener("click", () => {
			navigator.clipboard?.writeText(addr).catch(() => {});
			let note = a.parentElement.querySelector(".contact__copied");
			if (!note) {
				note = document.createElement("p");
				note.className = "contact__copied";
				note.setAttribute("role", "status");
				a.parentElement.appendChild(note);
			}
			note.innerHTML = `<a href="mailto:${addr}">${addr}</a><br>${t("contact.copied")}`;
		});
	});

	// ============ Press kit ============
	document.querySelectorAll(".js-presskit").forEach((a) => {
		if (S.pressKitUrl) a.href = S.pressKitUrl; else a.hidden = true;
	});

	// ============ Discord ============
	document.querySelectorAll(".js-discord").forEach((a) => {
		if (S.discordUrl) a.href = S.discordUrl; else a.hidden = true;
	});

	// ============ Formulario de correo ============
	// Con newsletterSheetUrl, el correo se guarda en Google Sheets (Apps Script, ver tools/newsletter_google_sheets.gs).
	// Sin él se abre un correo a contact@ con la dirección, para no perder a nadie mientras tanto.
	const form = document.querySelector(".js-newsletter");
	if (form) {
		const msg = form.querySelector(".newsletter__msg");
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const email = form.email.value.trim();
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				msg.textContent = t("community.bad"); msg.hidden = false; form.email.focus(); return;
			}
			if (form.website.value) return;   // campo trampa: solo lo rellenan los bots
			if (S.newsletterSheetUrl) {
				const btn = form.querySelector("button");
				btn.disabled = true; msg.textContent = t("community.sending"); msg.hidden = false;
				const data = new URLSearchParams({ email, lang, page: location.pathname + location.search });
				// no-cors: Google no deja leer la respuesta desde otra web, pero el correo llega a la hoja
				fetch(S.newsletterSheetUrl, { method: "POST", mode: "no-cors", body: data })
					.then(() => { msg.textContent = t("community.done"); form.reset(); })
					.catch(() => { msg.textContent = t("community.fail"); })
					.finally(() => { btn.disabled = false; });
				return;
			}
			if (addr) {
				const subject = encodeURIComponent("Newsletter — Encore House");
				const body = encodeURIComponent(`Please add me to the newsletter: ${email}`);
				location.href = `mailto:${addr}?subject=${subject}&body=${body}`;
			}
			msg.textContent = t("community.ok"); msg.hidden = false;
		});
	}
	document.querySelectorAll(".js-year").forEach((e) => (e.textContent = new Date().getFullYear()));

	// ============ Clips: se cargan solo cuando se ven; versión en inglés o en español ============
	const clips = [...document.querySelectorAll("video[data-clip]")];
	const clipBase = (v) => `assets/video/clip_${v.dataset.clip}${lang === "es" ? "_es" : ""}`;
	const load = (v) => {
		const base = clipBase(v);
		if (v.dataset.loaded === base) return;
		v.dataset.loaded = base;
		v.innerHTML = `<source src="${base}.webm" type="video/webm"><source src="${base}.mp4" type="video/mp4">`;
		v.load();
	};
	window.__onLang = () => {
		clips.forEach((v) => {
			v.poster = clipBase(v) + ".jpg";
			if (v.dataset.loaded) {
				const playing = !v.paused;
				load(v);
				if (playing) v.play().catch(() => {});
			}
		});
	};
	window.__onLang();
	if ("IntersectionObserver" in window && !reduce) {
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				const v = e.target;
				if (e.isIntersecting) { load(v); v.play().catch(() => {}); }
				else v.pause();
			});
		}, { threshold: 0.35 });
		clips.forEach((v) => io.observe(v));
	}
	if (reduce) document.querySelectorAll(".hero__video").forEach((v) => v.pause());

	// ============ E espejo de "Wishlist on Steam": glitch de vuelta solo después de un hover ============
	document.querySelectorAll(".js-steam").forEach((b) => {
		const on = () => b.classList.add("is-glitched");
		b.addEventListener("mouseleave", on);
		b.addEventListener("blur", on);
	});

	// ============ Aparición suave ============
	if ("IntersectionObserver" in window && !reduce) {
		const els = document.querySelectorAll(".band__content > *, .mech, .gallery a");
		els.forEach((el) => el.classList.add("reveal"));
		const io2 = new IntersectionObserver((entries) => {
			entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io2.unobserve(e.target); } });
		}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
		els.forEach((el) => io2.observe(el));
	}

	// ============ Cintas: encima del borde roto real, cruzando las dos hojas ============
	const E = window.EDGE;
	function placeTapes() {
		if (!E) return;
		document.querySelectorAll(".sheet--edge").forEach((sheet) => {
			const tapes = sheet.querySelectorAll(".tape-j");
			const lip = sheet.querySelector(".edge-lip");
			if (!tapes.length || !lip) return;
			const Ws = sheet.clientWidth, Hs = sheet.offsetHeight;
			const Eh = lip.offsetHeight * E.h / E.ht;   // alto en pantalla de la tira (sin sombra)
			const Tw = Eh * E.w / E.h;                   // ancho en pantalla de una repetición
			const ex = parseFloat(getComputedStyle(sheet).getPropertyValue("--edge-x")) || 0;
			const off = (Ws - Tw) / 2 + ex;              // igual que mask/background-position
			const edgeY = (x) => {
				const u = (((x - off) % Tw) + Tw) % Tw / Tw;
				const i = Math.min(E.p.length - 1, Math.floor(u * E.p.length));
				return Hs - Eh + E.p[i] * Eh;
			};
			const small = Ws < 600;
			tapes.forEach((tp) => {
				const w = Math.min(+tp.dataset.w || 200, Ws * (small ? 0.34 : 0.16));
				// cerca del sitio pedido, buscar un tramo de borde tranquilo para que asiente en las dos hojas
				const want = (+tp.dataset.x || 0.5) * Ws;
				let best = want, bestScore = Infinity;
				for (let k = -12; k <= 12; k++) {
					const cx = want + k * Ws * 0.012;
					if (cx - w * 0.3 < 0 || cx + w * 0.3 > Ws) continue;
					const ys = [-0.5, -0.25, 0, 0.25, 0.5].map((f) => edgeY(cx + f * w));
					const mean = ys.reduce((a, b) => a + b) / ys.length;
					const score = ys.reduce((a, b) => a + (b - mean) ** 2, 0) + Math.abs(k) * 2;
					if (score < bestScore) { bestScore = score; best = cx; }
				}
				const yl = edgeY(best - w / 2), yr = edgeY(best + w / 2), yc = edgeY(best);
				const slope = Math.atan2(yr - yl, w) * 180 / Math.PI;
				const r = Math.max(-32, Math.min(32, slope * 0.5 + (+tp.dataset.r || 0)));
				tp.style.setProperty("--w", w + "px");
				tp.style.left = best + "px";
				tp.style.top = (yl + yr + yc * 2) / 4 + "px";
				tp.style.setProperty("--r", r + "deg");
				tp.classList.add("is-placed");
			});
		});
	}
	placeTapes();
	addEventListener("load", placeTapes);
	document.fonts?.ready.then(placeTapes);
	if ("ResizeObserver" in window) {
		let raf = 0;
		const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(placeTapes); });
		document.querySelectorAll(".sheet--edge").forEach((el) => ro.observe(el));
	} else addEventListener("resize", placeTapes);

	// ============ Modales ============
	const openBox = (box) => { box.hidden = false; document.body.classList.add("no-scroll"); };
	const closeBox = (box) => { box.hidden = true; document.body.classList.remove("no-scroll"); };

	// Galería
	const box = document.querySelector(".js-lightbox");
	const links = [...document.querySelectorAll(".js-gallery a")];
	if (box && links.length) {
		const img = box.querySelector("img");
		let i = 0;
		const show = (k) => {
			i = (k + links.length) % links.length;
			img.src = links[i].href;
			img.alt = links[i].querySelector("img").alt;
		};
		links.forEach((a, k) => a.addEventListener("click", (e) => { e.preventDefault(); show(k); openBox(box); }));
		box.querySelector(".lightbox__close").addEventListener("click", () => closeBox(box));
		box.querySelector(".lightbox__prev").addEventListener("click", () => show(i - 1));
		box.querySelector(".lightbox__next").addEventListener("click", () => show(i + 1));
		box.addEventListener("click", (e) => { if (e.target === box) closeBox(box); });
		addEventListener("keydown", (e) => {
			if (box.hidden) return;
			if (e.key === "Escape") closeBox(box);
			if (e.key === "ArrowLeft") show(i - 1);
			if (e.key === "ArrowRight") show(i + 1);
		});
	}

	// Tráiler de YouTube: el iframe solo se crea al pulsar (la web no carga nada de YouTube hasta entonces)
	const tbox = document.querySelector(".js-trailerbox");
	if (S.trailerYoutubeId && tbox) {
		const frame = tbox.querySelector(".trailer__frame");
		const close = () => { frame.innerHTML = ""; closeBox(tbox); };
		document.querySelectorAll(".js-trailer").forEach((a) => {
			a.hidden = false;
			a.href = `https://www.youtube.com/watch?v=${S.trailerYoutubeId}`;
			a.target = "_blank"; a.rel = "noopener";
			a.addEventListener("click", (e) => {
				// YouTube exige saber desde qué web se incrusta el vídeo (si no: "Error 153").
				// Abierta con doble clic (file://) no hay web de origen: entonces se abre en YouTube.
				if (location.protocol === "file:") return;
				e.preventDefault();
				const origin = encodeURIComponent(location.origin);
				frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${S.trailerYoutubeId}?autoplay=1&rel=0&playsinline=1&origin=${origin}" title="Encore House teaser" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
				openBox(tbox);
			});
		});
		tbox.querySelector(".lightbox__close").addEventListener("click", close);
		tbox.addEventListener("click", (e) => { if (e.target === tbox) close(); });
		addEventListener("keydown", (e) => { if (!tbox.hidden && e.key === "Escape") close(); });
	}
})();
